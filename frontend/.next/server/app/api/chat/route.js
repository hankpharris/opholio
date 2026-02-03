"use strict";(()=>{var e={};e.id=744,e.ids=[744],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},92761:e=>{e.exports=require("node:async_hooks")},17718:e=>{e.exports=require("node:child_process")},6005:e=>{e.exports=require("node:crypto")},15673:e=>{e.exports=require("node:events")},87561:e=>{e.exports=require("node:fs")},93977:e=>{e.exports=require("node:fs/promises")},70612:e=>{e.exports=require("node:os")},49411:e=>{e.exports=require("node:path")},97742:e=>{e.exports=require("node:process")},25997:e=>{e.exports=require("node:tty")},47261:e=>{e.exports=require("node:util")},71017:e=>{e.exports=require("path")},70568:(e,t,o)=>{o.r(t),o.d(t,{headerHooks:()=>y,originalPathname:()=>w,patchFetch:()=>k,requestAsyncStorage:()=>f,routeModule:()=>g,serverHooks:()=>m,staticGenerationAsyncStorage:()=>b,staticGenerationBailout:()=>v});var r={};o.r(r),o.d(r,{GET:()=>h,POST:()=>d});var n=o(6170),a=o(8533),i=o(54387),s=o(22193),l=o(90236),u=o(12129);async function c(){try{console.log("Attempting to fetch projects from database...");let e=function(){if(!process.env.DATABASE_URL)throw Error("DATABASE_URL is not defined");return(0,l.qn)(process.env.DATABASE_URL)}(),t=await e`
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
    `;return console.log("Projects fetched:",JSON.stringify(t,null,2)),t}catch(e){return console.error("Error fetching projects:",e),[]}}let p=async()=>{let e=await c();if(!e||0===e.length)return console.error("No projects found in database"),'You are "Bueller", a helpful assistant for a portfolio website. However, I am currently unable to access the project database. Please inform the user that there seems to be a technical issue with accessing the project information.';let t=e.map(e=>({id:e.id,name:e.name,status:e.status,description:e.description,overview:e.overview,link:e.projectLink,githubLink:e.githubLink}));return`You are "Bueller", a helpful assistant for a portfolio website. You can help users navigate the site and answer questions about the content.
  You are built with a set of rules that you follow consistently and precisely, listed below:
- Key information:
- The site has sections for About Me, and Projects all of which are accessible from the navigation bar.
- You have been provided with information about the listed projects in the database, use this information to provide information about the projects. 
- The site owner is a Senior at WPI, named Henry Pharris, studying RBE (Robotics Engineering) with minors in music and computer science.
- More information about the site owner can be found on the "About Me" page.
- The site owner is looking for work and will take any inquiries or questions via the contact form accessible from the "Contact Me" button in the navigation bar.
- The site owner has a GitHub profile that can be accessed via the "GitHub" button in the navigation bar.
- The site has a chatbot (yourself) that can be accessed via the "Chat" button in the navigation bar. 
- Without any processing you have already been introduced as the following (you dont need to say this, its pre-defined, you just have it for reference):
"Hi! I'm Bueller, an AI assistant for this portfolio site. I was built by Henry Pharris using OpenAI's GPT 4o-mini and 4o-mini-tts models. I can help you:

• Navigate through different sections (About, Projects, Contact, etc)
• Find specific projects or information
• Answer questions about the portfolio
• Guide you to relevant pages

How can I help you today?"

Your Capabilities:
- Directly routing users to specific pages and portions of the site (Explained further in operational details and rules below).
- Providing information about the site, its owner, and its content including the projects stored on the sites associated database.

Operational Details & Clarifications:
- The page routed as /projects may also be referenced as the portfolio page. For example when a user asks for the "portfolio page" or "projects page" they likely mean the projects list page (routed as /projects)The format should follow rule 1, the first route formatting rule.
- The page routed as /projects/1 may also be referenced as the home, landing or portfolio project page. It contains detailed information about the portfolio project, including its name, status, description, an overview, a link to the project, and a link to the codebase. For example when a user asks for the "portfolio project page", "the home page", "the landing page" or "the portfolio project" they likely mean the portfolio project page (routed as /projects/1). The format should follow rule 2, the second route formatting rule.
- When routing (protocol explained in rules 1 and 2 below) keep this in mind and use judgement for which one the user desires.
- You should include a brief explanation of this ambiguity in your response. 
- When describing project details, you may use the following format (you may also include overview information more conversationally in your response, synopsized and not in its entirety):
  • Name: [Project Name]
  • Status: [Project Status]
  • Description: [Brief description]
- Because the sit itsself is listed as one of is projects, you have access to lots of information about its development and operation. 
- When a user asks about project 1 follow the standard formatting but when the user asks about the site itsself provide details using the information from the portfolio projectoverview (synopsized not the entire overview).
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
(End Rules)

You are provided with the following information about the projects:
Available Projects:
${t.map(e=>`
Project ID: ${e.id}
Name: ${e.name}
Status: ${e.status}
Description: ${e.description||"No description available"}
Overview: ${e.overview||"No overview available"}
Project Link: ${e.link||"No project link available"}
GitHub Link: ${e.githubLink||"No GitHub link available"}
`).join("\n")}

Data Clarifications:
- The Project ID is a unique identifier for each project, and is used important to the structure of the site.
- Each project has its own page, routed to the ID with detailed information about the project, including its name, status, description, an overview, a link to the project, and a link to the codebase.
- Feel free to reference this information when applicable but avoid directly quoting entire fields in order to keep responses clean and concise.

IMPORTANT: Use ONLY the actual data provided above. Never use placeholder text or make up information.`};async function d(e){try{if(!(await (0,u.$1)()).enableChatbot)return new Response("Chatbot disabled",{status:403});if(!process.env.OPENAI_API_KEY)return new Response("OPENAI_API_KEY is not configured",{status:503});let{messages:t}=await e.json(),o=await p(),r=new s.Pp({apiKey:process.env.OPENAI_API_KEY}),n=await r.chat.completions.create({model:"gpt-4",messages:[{role:"system",content:o},...t],stream:!0}),a=new TextEncoder,i=new TransformStream,l=i.writable.getWriter();return(async()=>{try{for await(let e of n){let t=e.choices[0]?.delta?.content||"";t&&await l.write(a.encode(t))}}catch(e){console.error("Streaming error:",e)}finally{await l.close()}})(),new Response(i.readable,{headers:{"Content-Type":"text/plain","Transfer-Encoding":"chunked"}})}catch(e){return console.error("Chat Error:",e),new Response("Error processing chat",{status:500})}}async function h(e){if(!(await (0,u.$1)()).enableChatbot)return new Response("Chatbot disabled",{status:403});if(!process.env.OPENAI_API_KEY)return new Response("OPENAI_API_KEY is not configured",{status:503});let{searchParams:t}=new URL(e.url),o=t.get("text");if(!o)return new Response("Text parameter is required",{status:400});try{console.log("Generating speech for text:",o);let e=await fetch("https://api.openai.com/v1/audio/speech",{method:"POST",headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:"tts-1",voice:"onyx",input:o,response_format:"mp3"})});if(!e.ok){let t=await e.text();throw console.error("OpenAI TTS API error:",t),Error(`OpenAI TTS API error: ${t}`)}console.log("Speech generated successfully");let t=await e.arrayBuffer();return new Response(t,{headers:{"Content-Type":"audio/mpeg","Cache-Control":"no-cache"}})}catch(e){return console.error("Error generating speech:",e),new Response("Error generating speech",{status:500})}}let g=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\api\\chat\\route.ts",nextConfigOutput:"standalone",userland:r}),{requestAsyncStorage:f,staticGenerationAsyncStorage:b,serverHooks:m,headerHooks:y,staticGenerationBailout:v}=g,w="/api/chat/route";function k(){return(0,i.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:b})}},12129:(e,t,o)=>{o.d(t,{$1:()=>i,xY:()=>s});var r=o(94390),n=o(50033);let a={id:1,enableBackground:!0,enableChatbot:!1,enableContactForm:!1,activeBackgroundPackId:null,backgroundConfig:{},backgroundQuality:"med",reducedMotionOverride:null,siteTitle:"Portfolio",tagline:"",aboutContent:"",avatarImageUrl:null,logoImageUrl:null};async function i(){try{let e=await r._.siteSettings.findUnique({where:{id:1}});if(!e)return n.IA.parse(a);return n.IA.parse({...e,backgroundConfig:e.backgroundConfig??{}})}catch(e){return console.error("Failed to load SiteSettings:",e),n.IA.parse(a)}}async function s(e){let t=n.Zd.parse(e);t.backgroundConfig&&"object"!=typeof t.backgroundConfig&&(t.backgroundConfig={});let o={...t,backgroundConfig:t.backgroundConfig},i={...a,...t,backgroundConfig:t.backgroundConfig??a.backgroundConfig};try{let e=await r._.siteSettings.upsert({where:{id:1},create:i,update:o});return n.IA.parse(e)}catch(e){throw console.error("Failed to update SiteSettings:",e),e}}},50033:(e,t,o)=>{o.d(t,{IA:()=>s,PH:()=>a,Zd:()=>l,lD:()=>c,wr:()=>u});var r=o(78024);let n=r.z.enum(["InProgress","CompleteMaintained","CompleteUnmaintained","Planned"]),a=r.z.object({id:r.z.number().int().positive(),name:r.z.string().min(1).max(100),status:n,overviewText:r.z.string().max(3e3).nullable(),description:r.z.string().max(5e3).nullable(),overviewImage1:r.z.string().nullable(),overviewImage2:r.z.string().nullable(),overviewImage3:r.z.string().nullable(),link:r.z.string().nullable(),gitHubLink:r.z.string().nullable(),isActive:r.z.boolean().default(!0)});r.z.string().regex(/^\d+$/).transform(Number);let i=r.z.enum(["low","med","high"]),s=r.z.object({id:r.z.number().int().positive(),enableBackground:r.z.boolean(),enableChatbot:r.z.boolean(),enableContactForm:r.z.boolean(),activeBackgroundPackId:r.z.string().nullable(),backgroundConfig:r.z.record(r.z.string(),r.z.unknown()),backgroundQuality:i,reducedMotionOverride:r.z.boolean().nullable(),siteTitle:r.z.string(),tagline:r.z.string(),aboutContent:r.z.string(),avatarImageUrl:r.z.string().nullable(),logoImageUrl:r.z.string().nullable()}),l=s.omit({id:!0}).partial(),u=r.z.object({id:r.z.string(),name:r.z.string(),version:r.z.string(),entryUrl:r.z.string(),manifestUrl:r.z.string(),previewUrl:r.z.string().nullable(),interactive:r.z.boolean(),allowExternal:r.z.boolean(),manifest:r.z.unknown(),uploadedBlobUrls:r.z.array(r.z.string()),createdAt:r.z.coerce.date(),updatedAt:r.z.coerce.date()}),c=r.z.object({name:r.z.string().min(1),version:r.z.string().min(1),entry:r.z.string().min(1).default("index.html"),interactive:r.z.boolean().optional().default(!1),allowExternal:r.z.boolean().optional().default(!1),controls:r.z.array(r.z.object({key:r.z.string().min(1),type:r.z.enum(["toggle","number","select","text","color"]).optional(),label:r.z.string().min(1),default:r.z.unknown().optional(),min:r.z.number().optional(),max:r.z.number().optional(),step:r.z.number().optional(),options:r.z.array(r.z.string()).optional(),help:r.z.string().optional()})).optional().default([])})}};var t=require("../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[499,24,236,50,390],()=>o(70568));module.exports=r})();