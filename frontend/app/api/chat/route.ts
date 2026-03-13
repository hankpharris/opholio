import { neon } from '@neondatabase/serverless';
import { ChatOpenAI } from '@langchain/openai';
import { AIMessage, HumanMessage, SystemMessage, ToolMessage } from '@langchain/core/messages';
import { tool } from '@langchain/core/tools';
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

    let navigationTarget: string | null = null;

    const navigateToPageTool = tool(
      async ({ page }: { page: 'about' | 'projects' | 'admin' }) => {
        const path = `/${page}`;
        navigationTarget = path;
        return {
          success: true,
          path,
          message: `Navigation prepared to ${path}.`,
        };
      },
      {
        name: 'navigate_to_page',
        description: 'Route the user to a top-level page. Use this only when user explicitly asks to navigate.',
        schema: z.object({
          page: z.enum(['about', 'projects', 'admin']),
        }),
      },
    );

    const navigateToProjectTool = tool(
      async ({ projectId }: { projectId: number }) => {
        const project = await getProjectByIdAnyStatus(projectId);
        if (!project) {
          return {
            success: false,
            denied: true,
            reason: `Project ${projectId} does not exist.`,
          };
        }

        if (!project.isActive) {
          return {
            success: false,
            denied: true,
            reason: `Project ${projectId} exists but is inactive and cannot be accessed right now.`,
          };
        }

        const path = `/projects/${projectId}`;
        navigationTarget = path;
        return {
          success: true,
          path,
          project,
          message: `Navigation prepared to ${path}.`,
        };
      },
      {
        name: 'navigate_to_project',
        description: 'Route the user to a specific project page by ID when explicitly asked to navigate.',
        schema: z.object({
          projectId: z.number().int().positive(),
        }),
      },
    );

    const getProjectTool = tool(
      async ({ projectId }: { projectId: number }) => {
        const project = await getProjectByIdAnyStatus(projectId);
        if (!project) {
          return {
            found: false,
            reason: `Project ${projectId} does not exist.`,
          };
        }

        if (!project.isActive) {
          return {
            found: false,
            reason: `Project ${projectId} exists but is inactive.`,
          };
        }

        return {
          found: true,
          project,
        };
      },
      {
        name: 'get_project',
        description: 'Fetch full details for one project by ID.',
        schema: z.object({
          projectId: z.number().int().positive(),
        }),
      },
    );

    const listProjectsTool = tool(
      async () => {
        const projects = await getAllActiveProjects();
        return {
          count: projects.length,
          projects,
        };
      },
      {
        name: 'list_projects',
        description: 'List all active projects with full fields.',
        schema: z.object({}),
      },
    );

    const tools = [navigateToPageTool, navigateToProjectTool, getProjectTool, listProjectsTool];
    const toolMap = Object.fromEntries(tools.map((singleTool) => [singleTool.name, singleTool]));

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4o-mini',
      temperature: 0.2,
    }).bindTools(tools);

    const conversation = [
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

    for (let step = 0; step < maxSteps; step += 1) {
      const assistant = await model.invoke(conversation);
      conversation.push(assistant);

      const toolCalls = assistant.tool_calls ?? [];
      if (!toolCalls.length) {
        finalAssistantText = toPromptText(assistant.content).trim();
        break;
      }

      for (const call of toolCalls) {
        const selectedTool = toolMap[call.name];
        if (!selectedTool) {
          conversation.push(
            new ToolMessage({
              tool_call_id: call.id ?? call.name,
              content: JSON.stringify({ error: `Unknown tool: ${call.name}` }),
            }),
          );
          continue;
        }

        try {
          const toolResult = await selectedTool.invoke(call.args ?? {});
          conversation.push(
            new ToolMessage({
              tool_call_id: call.id ?? call.name,
              content: JSON.stringify(toolResult),
            }),
          );
        } catch (toolError) {
          conversation.push(
            new ToolMessage({
              tool_call_id: call.id ?? call.name,
              content: JSON.stringify({
                error: `Tool execution failed for ${call.name}`,
                details: toolError instanceof Error ? toolError.message : 'Unknown tool error',
              }),
            }),
          );
        }
      }
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
