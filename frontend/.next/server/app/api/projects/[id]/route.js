"use strict";(()=>{var e={};e.id=361,e.ids=[361],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},87567:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>x,originalPathname:()=>I,patchFetch:()=>R,requestAsyncStorage:()=>h,routeModule:()=>E,serverHooks:()=>b,staticGenerationAsyncStorage:()=>w,staticGenerationBailout:()=>y});var o={};t.r(o),t.d(o,{DELETE:()=>j,GET:()=>f,PUT:()=>m,runtime:()=>g});var n=t(6170),i=t(8533),s=t(54387),a=t(37504),l=t(90236),c=t(50033),u=t(40999),d=t(50268),p=t(5346);if(!process.env.DATABASE_URL)throw Error("DATABASE_URL is not defined");let v=(0,l.qn)(process.env.DATABASE_URL),g="nodejs";async function f(e,{params:r}){try{let e=parseInt(r.id);if(isNaN(e))return a.NextResponse.json({error:"Invalid project ID"},{status:400});let t=await v`
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
                "gitHubLink"
            FROM "Project" 
            WHERE id = ${e}
        `;if(!t||0===t.length)return a.NextResponse.json({error:"Project not found"},{status:404});let o=t[0],n=c.PH.safeParse(o);if(!n.success)return console.warn("Project validation failed:",n.error),a.NextResponse.json({error:"Invalid project data"},{status:500});return a.NextResponse.json(n.data)}catch(e){return console.error("Error fetching project:",e),a.NextResponse.json({error:"Failed to fetch project"},{status:500})}}async function m(e,{params:r}){if(!await (0,u.getServerSession)(d.L))return new a.NextResponse("Unauthorized",{status:401});try{let t=await e.json(),o=await (0,p.ty)(parseInt(r.id),t);return a.NextResponse.json(o)}catch(e){return console.error("Error updating project:",e),new a.NextResponse("Internal Server Error",{status:500})}}async function j(e,{params:r}){try{let e=parseInt(r.id);if(isNaN(e))return a.NextResponse.json({error:"Invalid project ID"},{status:400});let t=await v`
            DELETE FROM "Project"
            WHERE id = ${e}
            RETURNING id
        `;if(!t||0===t.length)return a.NextResponse.json({error:"Project not found"},{status:404});return a.NextResponse.json({success:!0})}catch(e){return console.error("Error deleting project:",e),a.NextResponse.json({error:"Failed to delete project"},{status:500})}}let E=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/projects/[id]/route",pathname:"/api/projects/[id]",filename:"route",bundlePath:"app/api/projects/[id]/route"},resolvedPagePath:"C:\\Users\\henry\\WebstormProjects\\portfolio3\\frontend\\app\\api\\projects\\[id]\\route.ts",nextConfigOutput:"standalone",userland:o}),{requestAsyncStorage:h,staticGenerationAsyncStorage:w,serverHooks:b,headerHooks:x,staticGenerationBailout:y}=E,I="/api/projects/[id]/route";function R(){return(0,s.patchFetch)({serverHooks:b,staticGenerationAsyncStorage:w})}},50268:(e,r,t)=>{t.d(r,{L:()=>i});var o=t(68152);let n=(e,r)=>{let t=e.replace(/\/$/,"");return`${t}/api/auth/callback/${r}`};console.log("Vercel callback URL:",n(process.env.NEXTAUTH_URL_INTERNAL,"github-vercel")),console.log("Personal callback URL:",n(process.env.NEXTAUTH_URL,"github-personal"));let i={providers:[(0,o.Z)({id:"github-vercel",clientId:process.env.GITHUB_ID,clientSecret:process.env.GITHUB_SECRET,authorization:{params:{redirect_uri:n(process.env.NEXTAUTH_URL_INTERNAL,"github-vercel")}}}),(0,o.Z)({id:"github-personal",clientId:process.env.GITHUB_ID_PERSONAL,clientSecret:process.env.GITHUB_SECRET_PERSONAL,authorization:{params:{redirect_uri:n(process.env.NEXTAUTH_URL,"github-personal")}}})],callbacks:{async signIn({user:e,account:r}){if(console.log("Sign in attempt with provider:",r?.provider),console.log("Callback URL:",r?.redirect_uri),r?.provider==="github-vercel"||r?.provider==="github-personal"){let e=await fetch("https://api.github.com/user",{headers:{Authorization:`token ${r.access_token}`}}),t=await e.json();return(process.env.ALLOWED_GITHUB_USERS?.split(",")||[]).map(e=>e.trim()).includes(t.login)}return!1},jwt:async({token:e,user:r,account:t})=>(r&&(e.role="admin"),e),session:async({session:e,token:r})=>(e?.user&&(e.user.role=r.role),e)},pages:{signIn:"/auth/signin"},debug:!0,cookies:{sessionToken:{name:"__Secure-next-auth.session-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0}}}}},5346:(e,r,t)=>{t.d(r,{e5:()=>l,mW:()=>c,ty:()=>u});var o=t(90236),n=t(50033);let i={DATABASE_URL:process.env.DATABASE_URL},s=Object.entries(i).filter(([e,r])=>!r).map(([e])=>e);if(s.length>0)throw Error(`Missing required environment variables: ${s.join(", ")}. Please check your .env file and ensure all required variables are set.`);let a=i.DATABASE_URL;async function l(e){try{console.log("Fetching project with ID:",e);let r=(0,o.qn)(a),t=await r`
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
                "gitHubLink"
            FROM "Project" 
            WHERE id = ${parseInt(e)}
        `;if(console.log("Query result:",t),!t||0===t.length)return console.log("No project found with ID:",e),null;let i=t[0];console.log("Raw project data:",i);let s=n.PH.parse(i);return console.log("Validated project:",s),s}catch(e){return console.error("Error in getProject:",e),null}}async function c(){try{console.log("Fetching all projects");let e=(0,o.qn)(a),r=await e`
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
                "gitHubLink"
            FROM "Project" 
            ORDER BY id ASC
        `;if(console.log("Query result:",r),!r||0===r.length)return console.log("No projects found"),[];let t=r.map(e=>{try{return n.PH.parse(e)}catch(r){return console.error("Error validating project:",e,r),null}}).filter(e=>null!==e);return console.log("Validated projects:",t),t}catch(e){return console.error("Error in getProjects:",e),[]}}async function u(e,r){let t=(0,o.qn)(a),i=await t`
        UPDATE "Project"
        SET 
            name = ${r.name},
            status = ${r.status},
            "overviewText" = ${r.overviewText},
            description = ${r.description},
            "overviewImage1" = ${r.overviewImage1},
            "overviewImage2" = ${r.overviewImage2},
            "overviewImage3" = ${r.overviewImage3},
            link = ${r.link},
            "gitHubLink" = ${r.gitHubLink}
        WHERE id = ${e}
        RETURNING id, name, status, "overviewText", description, "overviewImage1", "overviewImage2", "overviewImage3", link, "gitHubLink"
    `;if(!i||0===i.length)throw Error("Project not found");let s=i[0],l=n.PH.safeParse(s);if(!l.success)throw console.warn("Project validation failed:",l.error),Error("Invalid project data");return l.data}},50033:(e,r,t)=>{t.d(r,{PH:()=>i});var o=t(78024);let n=o.z.enum(["InProgress","CompleteMaintained","CompleteUnmaintained","Planned"]),i=o.z.object({id:o.z.number().int().positive(),name:o.z.string().min(1).max(100),status:n,overviewText:o.z.string().max(2e3).nullable(),description:o.z.string().max(5e3).nullable(),overviewImage1:o.z.string().nullable(),overviewImage2:o.z.string().nullable(),overviewImage3:o.z.string().nullable(),link:o.z.string().nullable(),gitHubLink:o.z.string().nullable()});o.z.string().regex(/^\d+$/).transform(Number)},50374:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{DynamicServerError:function(){return o},isDynamicServerError:function(){return n}});let t="DYNAMIC_SERVER_USAGE";class o extends Error{constructor(e){super("Dynamic server usage: "+e),this.description=e,this.digest=t}}function n(e){return"object"==typeof e&&null!==e&&"digest"in e&&"string"==typeof e.digest&&e.digest===t}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},85461:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{isStaticGenBailoutError:function(){return a},staticGenerationBailout:function(){return c}});let o=t(50374),n=t(45869),i="NEXT_STATIC_GEN_BAILOUT";class s extends Error{constructor(...e){super(...e),this.code=i}}function a(e){return"object"==typeof e&&null!==e&&"code"in e&&e.code===i}function l(e,r){let{dynamic:t,link:o}=r||{};return"Page"+(t?' with `dynamic = "'+t+'"`':"")+" couldn't be rendered statically because it used `"+e+"`."+(o?" See more info here: "+o:"")}let c=(e,r)=>{let{dynamic:t,link:i}=void 0===r?{}:r,a=n.staticGenerationAsyncStorage.getStore();if(!a)return!1;if(a.forceStatic)return!0;if(a.dynamicShouldError)throw new s(l(e,{link:i,dynamic:null!=t?t:"error"}));let c=l(e,{dynamic:t,link:"https://nextjs.org/docs/messages/dynamic-server-error"});if(null==a.postpone||a.postpone.call(a,e),a.revalidate=0,a.isStaticGeneration){let r=new o.DynamicServerError(c);throw a.dynamicUsageDescription=e,a.dynamicUsageStack=r.stack,r}return!1};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[499,236,24,823,299],()=>t(87567));module.exports=o})();