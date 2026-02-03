(()=>{var e={};e.id=626,e.ids=[626],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25245:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>a.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>d,routeModule:()=>v,tree:()=>c});var i=t(7),s=t(8533),n=t(29377),a=t.n(n),o=t(29799),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);t.d(r,l);let c=["",{children:["projects",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,65971)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\[id]\\page.tsx"]}]},{loading:[()=>Promise.resolve().then(t.bind(t,50857)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\[id]\\loading.tsx"]}]},{loading:[()=>Promise.resolve().then(t.bind(t,47671)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\loading.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,23253)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\not-found.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,57022)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,97832)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\not-found.tsx"]}],d=["C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\[id]\\page.tsx"],u="/projects/[id]/page",m={require:t,loadChunk:()=>Promise.resolve()},v=new i.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/projects/[id]/page",pathname:"/projects/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},111:(e,r,t)=>{Promise.resolve().then(t.bind(t,92709)),Promise.resolve().then(t.t.bind(t,63654,23)),Promise.resolve().then(t.t.bind(t,10921,23))},74868:()=>{},50857:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});var i=t(40657);function s(){return i.jsx("div",{className:"flex-grow flex items-center justify-center py-8",children:(0,i.jsxs)("div",{className:"container mx-auto px-4 py-8 bg-white/30 rounded-xl shadow-lg backdrop-blur-md relative z-10 animate-pulse",children:[i.jsx("div",{className:"h-12 bg-gray-200 rounded w-3/4 mb-8"}),(0,i.jsxs)("div",{className:"space-y-4",children:[i.jsx("div",{className:"h-4 bg-gray-200 rounded w-full"}),i.jsx("div",{className:"h-4 bg-gray-200 rounded w-5/6"}),i.jsx("div",{className:"h-4 bg-gray-200 rounded w-4/6"})]}),(0,i.jsxs)("div",{className:"mt-8 flex gap-4",children:[i.jsx("div",{className:"h-10 bg-gray-200 rounded w-32"}),i.jsx("div",{className:"h-10 bg-gray-200 rounded w-32"})]})]})})}},65971:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>p,dynamic:()=>v,generateMetadata:()=>m,revalidate:()=>g});var i=t(40657),s=t(95099),n=t(78931),a=t(53965),o=t(78049),l=t(25984),c=t(29681);function d({title:e,status:r,overview:t,description:s,overviewImage1:n,overviewImage2:a,overviewImage3:d,link:u,gitHubLink:m}){let v=t.split("\n\n").filter(e=>e.trim()),g=e=>e.startsWith("http")?e:`/${e}`;return i.jsx("div",{className:"bg-white/30 backdrop-blur-md rounded-xl shadow-lg overflow-hidden",children:(0,i.jsxs)("div",{className:"p-6",children:[(0,i.jsxs)("div",{className:"flex flex-col md:flex-row md:justify-between md:items-center mb-6",children:[(0,i.jsxs)("div",{className:"flex items-center gap-4 mb-4 md:mb-0",children:[i.jsx("h1",{className:"text-4xl font-bold text-gray-800",children:e}),i.jsx(c.O,{status:r})]}),(0,i.jsxs)("div",{className:"flex gap-4 justify-start",children:[u&&i.jsx(l.z,{href:u,variant:"project",isExternal:!0,children:"View Project"}),m&&i.jsx(l.z,{href:m,variant:"github",isExternal:!0,children:"GitHub"})]})]}),(0,i.jsxs)("div",{className:"space-y-8",children:[(0,i.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 items-center",children:[n&&i.jsx("div",{className:"relative h-[400px] overflow-hidden",children:i.jsx(o.default,{src:g(n),alt:`${e} overview`,fill:!0,className:"object-contain",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",priority:!0})}),v[0]&&i.jsx("div",{className:"prose max-w-none w-full",children:i.jsx("p",{className:"text-lg text-gray-900",children:v[0]})})]}),a&&v[1]&&(0,i.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 items-center",children:[i.jsx("div",{className:"relative h-[400px] overflow-hidden",children:i.jsx(o.default,{src:g(a),alt:`${e} overview 2`,fill:!0,className:"object-contain",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"})}),i.jsx("div",{className:"prose max-w-none",children:i.jsx("p",{className:"text-lg text-gray-900",children:v[1]})})]}),d&&v[2]&&(0,i.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 items-center",children:[i.jsx("div",{className:"relative h-[400px] overflow-hidden",children:i.jsx(o.default,{src:g(d),alt:`${e} overview 3`,fill:!0,className:"object-contain",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"})}),i.jsx("div",{className:"prose max-w-none",children:i.jsx("p",{className:"text-lg text-gray-900",children:v[2]})})]}),v.slice(3).map((e,r)=>i.jsx("div",{className:"prose max-w-none",children:i.jsx("p",{className:"text-lg text-gray-900",children:e})},r))]})]})})}var u=t(5346);async function m({params:e}){let r=await (0,u.e5)(e.id);return r?{title:r.name,description:r.overviewText||r.description||`View details about ${r.name} project.`,alternates:{canonical:`/projects/${e.id}`},openGraph:{title:r.name,description:r.overviewText||r.description||`View details about ${r.name} project.`}}:{title:"Project Not Found",description:"The requested project could not be found."}}let v="force-dynamic",g=0;async function p({params:e}){try{let r=await (0,u.e5)(e.id);r||(console.log("Project not found:",e.id),(0,n.notFound)());let t={title:r.name,status:r.status,overview:r.overviewText||"",description:r.description||"",overviewImage1:r.overviewImage1||"",overviewImage2:r.overviewImage2||"",overviewImage3:r.overviewImage3||"",link:r.link,gitHubLink:r.gitHubLink};return(0,i.jsxs)("div",{className:"min-h-screen relative",children:[i.jsx(a.v,{}),i.jsx("div",{className:"relative z-10 container mx-auto px-4 md:px-16 py-8 md:py-8 pt-[120px] md:pt-8",children:i.jsx(s.Suspense,{fallback:i.jsx("div",{children:"Loading..."}),children:i.jsx(d,{...t})})})]})}catch(e){console.error("Error loading project:",e),(0,n.notFound)()}}},47671:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});var i=t(40657);function s(){return i.jsx("div",{className:"container mx-auto px-4 py-8",children:i.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3].map(e=>(0,i.jsxs)("div",{className:"bg-white/30 rounded-xl shadow-lg backdrop-blur-md p-6 animate-pulse",children:[i.jsx("div",{className:"h-8 bg-gray-200 rounded w-3/4 mb-4"}),i.jsx("div",{className:"h-4 bg-gray-200 rounded w-full mb-2"}),i.jsx("div",{className:"h-4 bg-gray-200 rounded w-5/6 mb-4"}),(0,i.jsxs)("div",{className:"flex gap-2",children:[i.jsx("div",{className:"h-10 bg-gray-200 rounded w-24"}),i.jsx("div",{className:"h-10 bg-gray-200 rounded w-24"})]})]},e))})})}},23253:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var i=t(40657),s=t(53965),n=t(25984);function a(){return(0,i.jsxs)("div",{className:"min-h-screen relative",children:[i.jsx(s.v,{}),i.jsx("div",{className:"relative z-10 flex items-center justify-center min-h-screen",children:(0,i.jsxs)("div",{className:"text-center space-y-6",children:[i.jsx("h1",{className:"text-4xl font-bold text-gray-800",children:"Project Not Found"}),i.jsx("p",{className:"text-lg text-gray-600",children:"The project you're looking for doesn't exist."}),i.jsx("div",{className:"mt-8",children:i.jsx(n.z,{href:"/projects",variant:"project",children:"Back to Projects"})})]})})]})}},29681:(e,r,t)=>{"use strict";t.d(r,{O:()=>s});var i=t(40657);function s({status:e}){return i.jsx("span",{className:"px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800",children:e.replace(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase()).trim()})}},5346:(e,r,t)=>{"use strict";t.d(r,{e5:()=>a,mW:()=>o,ty:()=>l});var i=t(90236),s=t(50033);function n(){let e=process.env.DATABASE_URL;if(!e)throw Error("Missing required environment variable: DATABASE_URL. Please check your .env file and ensure it is set.");return e}async function a(e,r={}){try{console.log("Fetching project with ID:",e);let t=(0,i.qn)(n()),a=r.includeInactive??!1,o=parseInt(e);if(Number.isNaN(o))return console.warn("Invalid project id supplied to getProject:",e),null;let l=a?await t`
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
                WHERE id = ${o}
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
                WHERE id = ${o} AND "isActive" = true
            `;if(console.log("Query result:",l),!l||0===l.length)return console.log("No project found with ID:",e),null;let c=l[0];console.log("Raw project data:",c);let d=s.PH.parse(c);return console.log("Validated project:",d),d}catch(e){return console.error("Error in getProject:",e),null}}async function o(e={}){try{console.log("Fetching all projects");let r=(0,i.qn)(n()),t=e.includeInactive?await r`
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
                WHERE "isActive" = true
                ORDER BY id ASC
            `;if(console.log("Query result:",t),!t||0===t.length)return console.log("No projects found"),[];let a=t.map(e=>{try{return s.PH.parse(e)}catch(r){return console.error("Error validating project:",e,r),null}}).filter(e=>null!==e);return console.log("Validated projects:",a),a}catch(e){return console.error("Error in getProjects:",e),[]}}async function l(e,r){let t=(0,i.qn)(n()),a=await t`
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
            "gitHubLink" = ${r.gitHubLink},
            "isActive" = ${r.isActive}
        WHERE id = ${e}
        RETURNING id, name, status, "overviewText", description, "overviewImage1", "overviewImage2", "overviewImage3", link, "gitHubLink", "isActive"
    `;if(!a||0===a.length)throw Error("Project not found");let o=a[0],l=s.PH.safeParse(o);if(!l.success)throw console.warn("Project validation failed:",l.error),Error("Invalid project data");return l.data}},50033:(e,r,t)=>{"use strict";t.d(r,{IA:()=>o,PH:()=>n,Zd:()=>l,lD:()=>d,wr:()=>c});var i=t(78024);let s=i.z.enum(["InProgress","CompleteMaintained","CompleteUnmaintained","Planned"]),n=i.z.object({id:i.z.number().int().positive(),name:i.z.string().min(1).max(100),status:s,overviewText:i.z.string().max(3e3).nullable(),description:i.z.string().max(5e3).nullable(),overviewImage1:i.z.string().nullable(),overviewImage2:i.z.string().nullable(),overviewImage3:i.z.string().nullable(),link:i.z.string().nullable(),gitHubLink:i.z.string().nullable(),isActive:i.z.boolean().default(!0)});i.z.string().regex(/^\d+$/).transform(Number);let a=i.z.enum(["low","med","high"]),o=i.z.object({id:i.z.number().int().positive(),enableBackground:i.z.boolean(),enableChatbot:i.z.boolean(),enableContactForm:i.z.boolean(),activeBackgroundPackId:i.z.string().nullable(),backgroundConfig:i.z.record(i.z.string(),i.z.unknown()),backgroundQuality:a,reducedMotionOverride:i.z.boolean().nullable(),siteTitle:i.z.string(),tagline:i.z.string(),aboutContent:i.z.string(),avatarImageUrl:i.z.string().nullable(),logoImageUrl:i.z.string().nullable()}),l=o.omit({id:!0}).partial(),c=i.z.object({id:i.z.string(),name:i.z.string(),version:i.z.string(),entryUrl:i.z.string(),manifestUrl:i.z.string(),previewUrl:i.z.string().nullable(),interactive:i.z.boolean(),allowExternal:i.z.boolean(),manifest:i.z.unknown(),uploadedBlobUrls:i.z.array(i.z.string()),createdAt:i.z.coerce.date(),updatedAt:i.z.coerce.date()}),d=i.z.object({name:i.z.string().min(1),version:i.z.string().min(1),entry:i.z.string().min(1).default("index.html"),interactive:i.z.boolean().optional().default(!1),allowExternal:i.z.boolean().optional().default(!1),controls:i.z.array(i.z.object({key:i.z.string().min(1),type:i.z.enum(["toggle","number","select","text","color"]).optional(),label:i.z.string().min(1),default:i.z.unknown().optional(),min:i.z.number().optional(),max:i.z.number().optional(),step:i.z.number().optional(),options:i.z.array(i.z.string()).optional(),help:i.z.string().optional()})).optional().default([])})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),i=r.X(0,[499,558,24,236,718,867,453],()=>t(25245));module.exports=i})();