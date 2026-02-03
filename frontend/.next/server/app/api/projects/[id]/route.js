"use strict";(()=>{var e={};e.id=361,e.ids=[361],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},61492:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>h,originalPathname:()=>f,patchFetch:()=>R,requestAsyncStorage:()=>z,routeModule:()=>E,serverHooks:()=>I,staticGenerationAsyncStorage:()=>j,staticGenerationBailout:()=>x});var n={};r.r(n),r.d(n,{DELETE:()=>b,GET:()=>m,PUT:()=>w,runtime:()=>g});var o=r(6170),i=r(8533),s=r(54387),a=r(37504),l=r(90236),c=r(50033),u=r(40999),p=r(50268),d=r(5346);function v(){if(!process.env.DATABASE_URL)throw Error("DATABASE_URL is not defined");return(0,l.qn)(process.env.DATABASE_URL)}let g="nodejs";async function m(e,{params:t}){try{let e=v(),r=parseInt(t.id);if(isNaN(r))return a.NextResponse.json({error:"Invalid project ID"},{status:400});let n=await e`
            SELECT 
                id,
                name,
                status,
                "overviewText",
                description,
                "overviewImage1",
                "overviewImage2",
                "overviewImage3",
                link,
                "gitHubLink",
                "isActive"
            FROM "Project" 
            WHERE id = ${r}
        `;if(!n||0===n.length)return a.NextResponse.json({error:"Project not found"},{status:404});let o=n[0],i=c.PH.safeParse(o);if(!i.success)return console.warn("Project validation failed:",i.error),a.NextResponse.json({error:"Invalid project data"},{status:500});return a.NextResponse.json(i.data)}catch(e){return console.error("Error fetching project:",e),a.NextResponse.json({error:"Failed to fetch project"},{status:500})}}async function w(e,{params:t}){if(!await (0,u.getServerSession)(p.L))return new a.NextResponse("Unauthorized",{status:401});try{let r=await e.json(),n=await (0,d.ty)(parseInt(t.id),r);return a.NextResponse.json(n)}catch(e){return console.error("Error updating project:",e),new a.NextResponse("Internal Server Error",{status:500})}}async function b(e,{params:t}){if(!await (0,u.getServerSession)(p.L))return new a.NextResponse("Unauthorized",{status:401});try{let e=v(),r=parseInt(t.id);if(isNaN(r))return a.NextResponse.json({error:"Invalid project ID"},{status:400});let n=await e`
            DELETE FROM "Project"
            WHERE id = ${r}
            RETURNING id
        `;if(!n||0===n.length)return a.NextResponse.json({error:"Project not found"},{status:404});return a.NextResponse.json({success:!0})}catch(e){return console.error("Error deleting project:",e),a.NextResponse.json({error:"Failed to delete project"},{status:500})}}let E=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/projects/[id]/route",pathname:"/api/projects/[id]",filename:"route",bundlePath:"app/api/projects/[id]/route"},resolvedPagePath:"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\api\\projects\\[id]\\route.ts",nextConfigOutput:"standalone",userland:n}),{requestAsyncStorage:z,staticGenerationAsyncStorage:j,serverHooks:I,headerHooks:h,staticGenerationBailout:x}=E,f="/api/projects/[id]/route";function R(){return(0,s.patchFetch)({serverHooks:I,staticGenerationAsyncStorage:j})}},50268:(e,t,r)=>{r.d(t,{L:()=>i});var n=r(68152);let o=(e,t)=>{if(!e)return;let r=e.replace(/\/$/,"");return`${r}/api/auth/callback/${t}`};process.env.NEXTAUTH_URL&&(console.log("Vercel callback URL:",o(process.env.NEXTAUTH_URL_INTERNAL,"github-vercel")),console.log("Personal callback URL:",o(process.env.NEXTAUTH_URL,"github-personal")));let i={providers:[(0,n.Z)({id:"github-vercel",clientId:process.env.GITHUB_ID||"",clientSecret:process.env.GITHUB_SECRET||"",authorization:{params:{redirect_uri:o(process.env.NEXTAUTH_URL_INTERNAL,"github-vercel")}}}),(0,n.Z)({id:"github-personal",clientId:process.env.GITHUB_ID_PERSONAL||"",clientSecret:process.env.GITHUB_SECRET_PERSONAL||"",authorization:{params:{redirect_uri:o(process.env.NEXTAUTH_URL,"github-personal")}}})],callbacks:{async signIn({user:e,account:t}){if(console.log("Sign in attempt with provider:",t?.provider),console.log("Callback URL:",t?.redirect_uri),t?.provider==="github-vercel"||t?.provider==="github-personal"){let e=await fetch("https://api.github.com/user",{headers:{Authorization:`token ${t.access_token}`}}),r=await e.json();return(process.env.ALLOWED_GITHUB_USERS?.split(",")||[]).map(e=>e.trim()).includes(r.login)}return!1},jwt:async({token:e,user:t,account:r})=>(t&&(e.role="admin"),e),session:async({session:e,token:t})=>(e?.user&&(e.user.role=t.role),e)},pages:{signIn:"/auth/signin"},debug:!1,cookies:{sessionToken:{name:"__Secure-next-auth.session-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0}}}}},5346:(e,t,r)=>{r.d(t,{e5:()=>s,mW:()=>a,ty:()=>l});var n=r(90236),o=r(50033);function i(){let e=process.env.DATABASE_URL;if(!e)throw Error("Missing required environment variable: DATABASE_URL. Please check your .env file and ensure it is set.");return e}async function s(e,t={}){try{console.log("Fetching project with ID:",e);let r=(0,n.qn)(i()),s=t.includeInactive??!1,a=parseInt(e);if(Number.isNaN(a))return console.warn("Invalid project id supplied to getProject:",e),null;let l=s?await r`
                SELECT 
                    id,
                    name,
                    status,
                    "overviewText",
                    description,
                    "overviewImage1",
                    "overviewImage2",
                    "overviewImage3",
                    link,
                    "gitHubLink",
                    "isActive"
                FROM "Project" 
                WHERE id = ${a}
            `:await r`
                SELECT 
                    id,
                    name,
                    status,
                    "overviewText",
                    description,
                    "overviewImage1",
                    "overviewImage2",
                    "overviewImage3",
                    link,
                    "gitHubLink",
                    "isActive"
                FROM "Project" 
                WHERE id = ${a} AND "isActive" = true
            `;if(console.log("Query result:",l),!l||0===l.length)return console.log("No project found with ID:",e),null;let c=l[0];console.log("Raw project data:",c);let u=o.PH.parse(c);return console.log("Validated project:",u),u}catch(e){return console.error("Error in getProject:",e),null}}async function a(e={}){try{console.log("Fetching all projects");let t=(0,n.qn)(i()),r=e.includeInactive?await t`
                SELECT 
                    id,
                    name,
                    status,
                    "overviewText",
                    description,
                    "overviewImage1",
                    "overviewImage2",
                    "overviewImage3",
                    link,
                    "gitHubLink",
                    "isActive"
                FROM "Project" 
                ORDER BY id ASC
            `:await t`
                SELECT 
                    id,
                    name,
                    status,
                    "overviewText",
                    description,
                    "overviewImage1",
                    "overviewImage2",
                    "overviewImage3",
                    link,
                    "gitHubLink",
                    "isActive"
                FROM "Project" 
                WHERE "isActive" = true
                ORDER BY id ASC
            `;if(console.log("Query result:",r),!r||0===r.length)return console.log("No projects found"),[];let s=r.map(e=>{try{return o.PH.parse(e)}catch(t){return console.error("Error validating project:",e,t),null}}).filter(e=>null!==e);return console.log("Validated projects:",s),s}catch(e){return console.error("Error in getProjects:",e),[]}}async function l(e,t){let r=(0,n.qn)(i()),s=await r`
        UPDATE "Project"
        SET 
            name = ${t.name},
            status = ${t.status},
            "overviewText" = ${t.overviewText},
            description = ${t.description},
            "overviewImage1" = ${t.overviewImage1},
            "overviewImage2" = ${t.overviewImage2},
            "overviewImage3" = ${t.overviewImage3},
            link = ${t.link},
            "gitHubLink" = ${t.gitHubLink},
            "isActive" = ${t.isActive}
        WHERE id = ${e}
        RETURNING id, name, status, "overviewText", description, "overviewImage1", "overviewImage2", "overviewImage3", link, "gitHubLink", "isActive"
    `;if(!s||0===s.length)throw Error("Project not found");let a=s[0],l=o.PH.safeParse(a);if(!l.success)throw console.warn("Project validation failed:",l.error),Error("Invalid project data");return l.data}},50033:(e,t,r)=>{r.d(t,{IA:()=>a,PH:()=>i,Zd:()=>l,lD:()=>u,wr:()=>c});var n=r(78024);let o=n.z.enum(["InProgress","CompleteMaintained","CompleteUnmaintained","Planned"]),i=n.z.object({id:n.z.number().int().positive(),name:n.z.string().min(1).max(100),status:o,overviewText:n.z.string().max(3e3).nullable(),description:n.z.string().max(5e3).nullable(),overviewImage1:n.z.string().nullable(),overviewImage2:n.z.string().nullable(),overviewImage3:n.z.string().nullable(),link:n.z.string().nullable(),gitHubLink:n.z.string().nullable(),isActive:n.z.boolean().default(!0)});n.z.string().regex(/^\d+$/).transform(Number);let s=n.z.enum(["low","med","high"]),a=n.z.object({id:n.z.number().int().positive(),enableBackground:n.z.boolean(),enableChatbot:n.z.boolean(),enableContactForm:n.z.boolean(),activeBackgroundPackId:n.z.string().nullable(),backgroundConfig:n.z.record(n.z.string(),n.z.unknown()),backgroundQuality:s,reducedMotionOverride:n.z.boolean().nullable(),siteTitle:n.z.string(),tagline:n.z.string(),aboutContent:n.z.string(),avatarImageUrl:n.z.string().nullable(),logoImageUrl:n.z.string().nullable()}),l=a.omit({id:!0}).partial(),c=n.z.object({id:n.z.string(),name:n.z.string(),version:n.z.string(),entryUrl:n.z.string(),manifestUrl:n.z.string(),previewUrl:n.z.string().nullable(),interactive:n.z.boolean(),allowExternal:n.z.boolean(),manifest:n.z.unknown(),uploadedBlobUrls:n.z.array(n.z.string()),createdAt:n.z.coerce.date(),updatedAt:n.z.coerce.date()}),u=n.z.object({name:n.z.string().min(1),version:n.z.string().min(1),entry:n.z.string().min(1).default("index.html"),interactive:n.z.boolean().optional().default(!1),allowExternal:n.z.boolean().optional().default(!1),controls:n.z.array(n.z.object({key:n.z.string().min(1),type:n.z.enum(["toggle","number","select","text","color"]).optional(),label:n.z.string().min(1),default:n.z.unknown().optional(),min:n.z.number().optional(),max:n.z.number().optional(),step:n.z.number().optional(),options:n.z.array(n.z.string()).optional(),help:n.z.string().optional()})).optional().default([])})}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[499,24,823,299,236],()=>r(61492));module.exports=n})();