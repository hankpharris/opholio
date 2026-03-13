import { neon } from '@neondatabase/serverless';
import { ChatOpenAI } from '@langchain/openai';
import { AIMessage, BaseMessage, HumanMessage, SystemMessage, ToolMessage } from '@langchain/core/messages';
import { z } from 'zod';
import { getSiteSettings } from '@/lib/site-settings';

interface ProjectRecord {
  id: number;
  name: string;
  status: string | null;
  description: string | null;
  overview: string | null;
  projectLink: string | null;
  githubLink: string | null;
  isActive: boolean;
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  return neon(process.env.DATABASE_URL);
}

async function getAllActiveProjects(): Promise<ProjectRecord[]> {
  try {
    const sql = getSql();
    const projects = await sql`
      SELECT
        id,
        name,
        status,
        description,
        "overviewText" as overview,
        link as "projectLink",
        "gitHubLink" as "githubLink",
        "isActive" as "isActive"
      FROM "Project"
      WHERE "isActive" = true
      ORDER BY id
    `;

    return projects as ProjectRecord[];
  } catch (error) {
    console.error('Error fetching active projects:', error);
    return [];
  }
}

async function getProjectByIdAnyStatus(projectId: number): Promise<ProjectRecord | null> {
  try {
    const sql = getSql();
    const [project] = await sql`
      SELECT
        id,
        name,
        status,
        description,
        "overviewText" as overview,
        link as "projectLink",
        "gitHubLink" as "githubLink",
        "isActive" as "isActive"
      FROM "Project"
      WHERE id = ${projectId}
      LIMIT 1
    `;

    return (project as ProjectRecord | undefined) ?? null;
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    return null;
  }
}

function getSystemMessage(input: {
  siteTitle: string;
  tagline: string;
  aboutContent: string;
  activeProjects: ProjectRecord[];
}) {
  const projectLines = input.activeProjects
    .map(
      (project) => `
Project ${project.id}
- name: ${project.name}
- status: ${project.status ?? 'Not set'}
- description: ${project.description ?? 'Not set'}
- overview: ${project.overview ?? 'Not set'}
- projectLink: ${project.projectLink ?? 'Not set'}
- githubLink: ${project.githubLink ?? 'Not set'}`,
    )
    .join('\n');

  return `You are Ophelia, assistant for a portfolio website.

Use only this context:
- siteTitle: ${input.siteTitle || '(Not set)'}
- tagline: ${input.tagline || '(Not set)'}
- aboutContent: ${input.aboutContent || '(Not set)'}
- activeProjects: ${input.activeProjects.length}
${projectLines || '(No active projects found)'}

Routing behavior:
- If user asks to be taken/brought/navigated to a page, call a navigation tool.
- If user asks to go to a specific project page, call navigate_to_project.
- If request is informational, do not call navigation tools.

Project behavior:
- Use tools for project lookup/listing.
- Inactive projects are not available and should be clearly denied if requested.

Response behavior:
- Be concise and factual.
- Links are allowed when useful. Keep link labels short like "here" or "link".
- Never invent data not present in tool results or the provided context.`;
}

function toPromptText(content: unknown): string {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') {
          return part;
        }

        if (part && typeof part === 'object' && 'type' in part && (part as { type?: string }).type === 'text') {
          return String((part as { text?: string }).text ?? '');
        }

        return '';
      })
      .join('');
  }

  return '';
}

function asConversationMessages(messages: Array<{ role: string; content: string }>) {
  return messages
    .filter((message) => (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string')
    .map((message) => (message.role === 'user' ? new HumanMessage(message.content) : new AIMessage(message.content)));
}

const pageSchema = z.object({
  page: z.enum(['about', 'projects', 'admin']),
});

const projectSchema = z.object({
  projectId: z.number().int().positive(),
});

const toolDefinitions = [
  {
    name: 'navigate_to_page',
    description: 'Route the user to a top-level page. Use this only when user explicitly asks to navigate.',
    schema: pageSchema,
  },
  {
    name: 'navigate_to_project',
    description: 'Route the user to a specific project page by ID when explicitly asked to navigate.',
    schema: projectSchema,
  },
  {
    name: 'get_project',
    description: 'Fetch full details for one project by ID.',
    schema: projectSchema,
  },
  {
    name: 'list_projects',
    description: 'List all active projects with full fields.',
    schema: z.object({}),
  },
] as const;

export async function POST(req: Request) {
  try {
    const settings = await getSiteSettings();
    if (!settings.enableChatbot) {
      return new Response('Chatbot disabled', { status: 403 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new Response('OPENAI_API_KEY is not configured', { status: 503 });
    }

    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const activeProjects = await getAllActiveProjects();

    const modelTools = toolDefinitions.map((definition) => ({
      name: definition.name,
      description: definition.description,
      schema: definition.schema,
    }));

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4o-mini',
      temperature: 0.2,
    }).bindTools(modelTools);

    const conversation: BaseMessage[] = [
      new SystemMessage(
        getSystemMessage({
          siteTitle: settings.siteTitle?.trim() || '',
          tagline: settings.tagline?.trim() || '',
          aboutContent: settings.aboutContent?.trim() || '',
          activeProjects,
        }),
      ),
      ...asConversationMessages(messages),
    ];

    const maxSteps = 6;
    let finalAssistantText = '';
    let lastToolTurnNavigationTarget: string | null = null;
    let navigationTarget: string | null = null;

    for (let step = 0; step < maxSteps; step += 1) {
      const assistant = await model.invoke(conversation);
      conversation.push(assistant);

      const toolCalls = assistant.tool_calls ?? [];
      if (!toolCalls.length) {
        finalAssistantText = toPromptText(assistant.content).trim();
        navigationTarget = lastToolTurnNavigationTarget;
        break;
      }

      let navigationThisTurn: string | null = null;

      for (const call of toolCalls) {
        const callId = call.id ?? call.name;

        if (call.name === 'navigate_to_page') {
          const parsed = pageSchema.safeParse(call.args ?? {});
          if (!parsed.success) {
            conversation.push(
              new ToolMessage({
                tool_call_id: callId,
                content: JSON.stringify({
                  success: false,
                  denied: true,
                  reason: 'Invalid page navigation arguments.',
                }),
              }),
            );
            continue;
          }

          const path = `/${parsed.data.page}`;
          navigationThisTurn = path;
          conversation.push(
            new ToolMessage({
              tool_call_id: callId,
              content: JSON.stringify({
                success: true,
                path,
                message: `Navigation prepared to ${path}.`,
              }),
            }),
          );
          continue;
        }

        if (call.name === 'navigate_to_project') {
          const parsed = projectSchema.safeParse(call.args ?? {});
          if (!parsed.success) {
            conversation.push(
              new ToolMessage({
                tool_call_id: callId,
                content: JSON.stringify({
                  success: false,
                  denied: true,
                  reason: 'Invalid project navigation arguments.',
                }),
              }),
            );
            continue;
          }

          const project = await getProjectByIdAnyStatus(parsed.data.projectId);
          if (!project) {
            conversation.push(
              new ToolMessage({
                tool_call_id: callId,
                content: JSON.stringify({
                  success: false,
                  denied: true,
                  reason: `Project ${parsed.data.projectId} does not exist.`,
                }),
              }),
            );
            continue;
          }

          if (!project.isActive) {
            conversation.push(
              new ToolMessage({
                tool_call_id: callId,
                content: JSON.stringify({
                  success: false,
                  denied: true,
                  reason: `Project ${parsed.data.projectId} exists but is inactive and cannot be accessed right now.`,
                }),
              }),
            );
            continue;
          }

          const path = `/projects/${parsed.data.projectId}`;
          navigationThisTurn = path;
          conversation.push(
            new ToolMessage({
              tool_call_id: callId,
              content: JSON.stringify({
                success: true,
                path,
                project,
                message: `Navigation prepared to ${path}.`,
              }),
            }),
          );
          continue;
        }

        if (call.name === 'get_project') {
          const parsed = projectSchema.safeParse(call.args ?? {});
          if (!parsed.success) {
            conversation.push(
              new ToolMessage({
                tool_call_id: callId,
                content: JSON.stringify({
                  found: false,
                  reason: 'Invalid project lookup arguments.',
                }),
              }),
            );
            continue;
          }

          const project = await getProjectByIdAnyStatus(parsed.data.projectId);
          if (!project) {
            conversation.push(
              new ToolMessage({
                tool_call_id: callId,
                content: JSON.stringify({
                  found: false,
                  reason: `Project ${parsed.data.projectId} does not exist.`,
                }),
              }),
            );
            continue;
          }

          if (!project.isActive) {
            conversation.push(
              new ToolMessage({
                tool_call_id: callId,
                content: JSON.stringify({
                  found: false,
                  reason: `Project ${parsed.data.projectId} exists but is inactive.`,
                }),
              }),
            );
            continue;
          }

          conversation.push(
            new ToolMessage({
              tool_call_id: callId,
              content: JSON.stringify({
                found: true,
                project,
              }),
            }),
          );
          continue;
        }

        if (call.name === 'list_projects') {
          const projects = await getAllActiveProjects();
          conversation.push(
            new ToolMessage({
              tool_call_id: callId,
              content: JSON.stringify({
                count: projects.length,
                projects,
              }),
            }),
          );
          continue;
        }

        conversation.push(
          new ToolMessage({
            tool_call_id: callId,
            content: JSON.stringify({ error: `Unknown tool: ${call.name}` }),
          }),
        );
      }

      lastToolTurnNavigationTarget = navigationThisTurn;
    }

    if (!finalAssistantText) {
      finalAssistantText = 'I can help with that. Please share a bit more detail.';
    }

    const headers = new Headers({
      'Content-Type': 'text/plain',
    });

    if (navigationTarget) {
      headers.set('x-ophelia-navigation', navigationTarget);
    }

    return new Response(finalAssistantText, { headers });
  } catch (error) {
    console.error('Chat Error:', error);
    return new Response('Error processing chat', { status: 500 });
  }
}
