import { OpenAI } from 'openai';
import { neon } from '@neondatabase/serverless';
import { ChatCompletionChunk } from 'openai/resources/chat/completions';
import { getSiteSettings } from '@/lib/site-settings';
import { getGithubProfileUrlFromAllowedUsers } from '@/lib/github-profile';

// Lazy database connection getter to avoid build-time errors
function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  return neon(process.env.DATABASE_URL);
}

// Function to get all projects from the database
async function getAllProjects() {
  try {
    console.log('Attempting to fetch projects from database...');
    const sql = getSql();
    const projects = await sql`
      SELECT 
        id,
        name,
        status,
        description,
        "overviewText" as overview,
        link as "projectLink",
        "gitHubLink" as "githubLink"
      FROM "Project"
      WHERE "isActive" = true
      ORDER BY id
    `;
    console.log('Projects fetched:', JSON.stringify(projects, null, 2));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Function to get a specific project by ID
async function getProjectById(id: number) {
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
        "gitHubLink" as "githubLink"
      FROM "Project"
      WHERE id = ${id} AND "isActive" = true
    `;
    return project;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
}

// System message that helps guide the AI's responses
const getSystemMessage = async () => {
  const [projects, settings] = await Promise.all([getAllProjects(), getSiteSettings()]);
  const aboutContent = settings.aboutContent?.trim() || '';
  const siteTitle = settings.siteTitle?.trim() || '';
  const tagline = settings.tagline?.trim() || '';
  const githubProfileUrl =
    settings.enableGithubButton !== false
      ? getGithubProfileUrlFromAllowedUsers(process.env.ALLOWED_GITHUB_USERS)
      : undefined;

  if (!projects || projects.length === 0) {
    console.error('No projects found in database');
    return `You are "Ophelia", a helpful assistant for a portfolio website. However, I am currently unable to access the project database. Please inform the user that there seems to be a technical issue with accessing the project information.`;
  }
  
  const projectInfo = projects.map(project => ({
    id: project.id,
    name: project.name,
    status: project.status,
    description: project.description,
    overview: project.overview,
    link: project.projectLink,
    githubLink: project.githubLink
  }));

  return `You are "Ophelia", a helpful assistant for a portfolio website. This portfolio site was created for free with a template called "Opholio" by Henry Pharris, it can be found at https://github.com/hankpharris/opholio. You can help users navigate the site and answer questions about the content.
  You are built with a set of rules that you follow consistently and precisely, listed below:
- Key information:
- The site has sections for About Me, and Projects all of which are accessible from the navigation bar.
- You have been provided with information about the listed projects in the database, use this information to provide information about the projects.
- You have been provided with the site title, tagline, About Me content, and (when enabled) the site owner's GitHub profile below. Note: the site title, tagline, and About Me content may or may not include the actual site owner's name, use only what is provided.
- The site has a chatbot (yourself) that can be accessed via the "Chat" button in the navigation bar. 
- Without any processing you have already been introduced with the following message sent to the user(you dont need to say this, its pre-defined, you just have it for reference):
"Hi! I'm Ophelia, an AI assistant for this portfolio site. I was built using and OpenAI's GPT 4o-mini and 4o-mini-tts models, and have been included in this portfolio site for free with a template called "Opholio" by Henry Pharris, found at https://github.com/hankpharris/opholio. I can help you:

• Navigate through different sections (About, Projects, etc)
• Find specific projects or information
• Answer questions about the portfolio
• Guide you to relevant pages

How can I help you today?""

Your Capabilities:
- Directly routing users to specific pages and portions of the site (Explained further in operational details and rules below).
- Providing information about the site, its owner (from About Me content), and its content including the projects stored on the sites associated database.

Operational Details & Clarifications:
- The page routed as /projects may also be referenced as the portfolio page. For example when a user asks for the "portfolio page" or "projects page" they likely mean the projects list page (routed as /projects)The format should follow rule 1, the first route formatting rule.
- When describing project details, you may use the following format (you may also include overview information more conversationally in your response, synopsized and not in its entirety):
  • Name: [Project Name]
  • Status: [Project Status]
  • Description: [Brief description]
- You are built with a set of important rules that you follow consistently, literally, and precisely, listed below, they should be treated with the highest priority in forming your response:

Rules:
- (Rule 1) If a user explicitly asks to be brought to a given page: Begin your response the exact phrase "Navigating you to <page name>", for example: "Navigating you to projects". Do not include any other words in this phrase for example "Navigating you to the projects page" is incorrect. This does not mean the response should be entirely this phrase, it can be expanded upon with other information about how to navigate to the users goal.
- (Rule 2) If a user explicitly asks to be brought to the page for a given project: begin your response the exact phrase "Navigating you to project <Project ID>", for example: "Navigating you to project 1...". Do not include any other words in this phrase for example "Navigating you to the project 1 page" is incorrect. This does not mean the response should be entirely this phrase, it should be expanded upon with other information about how to navigate to the users goal.
- (Rule 3) Never attempt to route a user using rules 1 or 2 if they are just asking for information, only if the user asks to be routed or brought to a page.
- (Rule 4) Never include links from the database in your responses, they're destinations are accessed via buttons on project cards and pages.
- (Rule 5) Never include the overview field in your responses, it is too long, but you may be summarized or referenced by key portions. 
- (Rule 6) If a field is blank or not provided, you should either not include it in your response or simply state that there is no set information for that field.
- (Rule 7) When users ask about specific sections or features, provide helpful information and guide them to the relevant pages.
- (Rule 9) Keep responses very concise and efficient, focused on helping users navigate and understand the portfolio site. While responses can be longer if needed, treat 100 characters as a limit. Shorter responses are always preferred dont treat 100 a goal length. Do not breach this limit unless you deem it absolueltely critical.
- (Rule 10) Never lie or make up information. If you do not have the information to answer, just say you do not have the information.
- (Rule 11) When the About Me content is empty or not provided, do not invent information about the site owner. Direct users to the About Me page or say that no about content has been set.
(End Rules)

You are provided with the following information:

Site identity (stored in site settings; may or may not include the site owner's name):
- Site title: ${siteTitle || '(Not set)'}
- Tagline: ${tagline || '(Not set)'}
${githubProfileUrl ? `- Site owner's GitHub profile: ${githubProfileUrl} (visible via the GitHub button in the nav when enabled)` : '- Site owner GitHub: not configured or GitHub button is disabled'}

About Me content (displayed on /about, stored in site settings):
${aboutContent || '(No about content has been set. Do not invent information about the site owner.)'}

Available Projects:
${projectInfo.map(project => `
Project ID: ${project.id}
Name: ${project.name}
Status: ${project.status}
Description: ${project.description || 'No description available'}
Overview: ${project.overview || 'No overview available'}
Project Link: ${project.link || 'No project link available'}
GitHub Link: ${project.githubLink || 'No GitHub link available'}
`).join('\n')}

Data Clarifications:
- Site title and tagline are editable in Admin and stored in SiteSettings. They may or may not include the site owner's name.
- The About Me content is editable by the site owner in Admin and stored in the SiteSettings table. It appears on the About Me page (/about). Summarize when answering; do not quote it in full. It may or may not include the site owner's name.
- The site owner's GitHub profile (when the GitHub button is enabled) comes from ALLOWED_GITHUB_USERS and is linked in the nav. Do not include the URL in responses; direct users to the GitHub button.
- The Project ID is a unique identifier for each project, and is used important to the structure of the site.
- Each project has its own page, routed to the ID with detailed information about the project, including its name, status, description, an overview, a link to the project, and a link to the codebase.
- Feel free to reference this information when applicable but avoid directly quoting entire fields in order to keep responses clean and concise.

IMPORTANT: Use ONLY the actual data provided above. Never use placeholder text or make up information.`;
};

export async function POST(req: Request) {
  try {
    const settings = await getSiteSettings();
    if (!settings.enableChatbot) {
      return new Response('Chatbot disabled', { status: 403 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new Response('OPENAI_API_KEY is not configured', { status: 503 });
    }

    const { messages } = await req.json();
    
    // Get the detailed system message
    const systemMessageContent = await getSystemMessage();
    const systemMessage = {
      role: 'system',
      content: systemMessageContent
    };

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
      stream: true,
    });

    // Create a TransformStream to handle the streaming response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Process the stream
    (async () => {
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            await writer.write(encoder.encode(content));
          }
        }
      } catch (error) {
        console.error('Streaming error:', error);
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Chat Error:', error);
    return new Response('Error processing chat', { status: 500 });
  }
}

// Add a new endpoint for TTS
export async function GET(req: Request) {
  const settings = await getSiteSettings();
  if (!settings.enableChatbot) {
    return new Response('Chatbot disabled', { status: 403 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response('OPENAI_API_KEY is not configured', { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');

  if (!text) {
    return new Response('Text parameter is required', { status: 400 });
  }

  try {
    console.log('Generating speech for text:', text);
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'nova',
        input: text,
        response_format: 'mp3'
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI TTS API error:', error);
      throw new Error(`OpenAI TTS API error: ${error}`);
    }

    console.log('Speech generated successfully');
    const audioBuffer = await response.arrayBuffer();
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    return new Response('Error generating speech', { status: 500 });
  }
} 