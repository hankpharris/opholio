(()=>{var e={};e.id=895,e.ids=[895],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},36814:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>s.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>d,routeModule:()=>g,tree:()=>c});var n=t(7),i=t(8533),o=t(29377),s=t.n(o),a=t(29799),l={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);t.d(r,l);let c=["",{children:["projects",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,67570)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\page.tsx"]}]},{loading:[()=>Promise.resolve().then(t.bind(t,47671)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\loading.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,23253)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\not-found.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,57022)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,97832)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\not-found.tsx"]}],d=["C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\page.tsx"],u="/projects/page",m={require:t,loadChunk:()=>Promise.resolve()},g=new n.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/projects/page",pathname:"/projects",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},74254:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,63654,23)),Promise.resolve().then(t.t.bind(t,10921,23))},74868:()=>{},47671:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i});var n=t(40657);function i(){return n.jsx("div",{className:"container mx-auto px-4 py-8",children:n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3].map(e=>(0,n.jsxs)("div",{className:"bg-white/30 rounded-xl shadow-lg backdrop-blur-md p-6 animate-pulse",children:[n.jsx("div",{className:"h-8 bg-gray-200 rounded w-3/4 mb-4"}),n.jsx("div",{className:"h-4 bg-gray-200 rounded w-full mb-2"}),n.jsx("div",{className:"h-4 bg-gray-200 rounded w-5/6 mb-4"}),(0,n.jsxs)("div",{className:"flex gap-2",children:[n.jsx("div",{className:"h-10 bg-gray-200 rounded w-24"}),n.jsx("div",{className:"h-10 bg-gray-200 rounded w-24"})]})]},e))})})}},23253:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});var n=t(40657),i=t(53965),o=t(25984);function s(){return(0,n.jsxs)("div",{className:"min-h-screen relative",children:[n.jsx(i.v,{}),n.jsx("div",{className:"relative z-10 flex items-center justify-center min-h-screen",children:(0,n.jsxs)("div",{className:"text-center space-y-6",children:[n.jsx("h1",{className:"text-4xl font-bold text-gray-800",children:"Project Not Found"}),n.jsx("p",{className:"text-lg text-gray-600",children:"The project you're looking for doesn't exist."}),n.jsx("div",{className:"mt-8",children:n.jsx(o.z,{href:"/projects",variant:"project",children:"Back to Projects"})})]})})]})}},67570:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>g,dynamic:()=>m,metadata:()=>u});var n=t(40657),i=t(5346),o=t(18935),s=t(25984),a=t(78049);function l({src:e,alt:r}){return n.jsx("div",{className:"relative w-full h-64 overflow-hidden",children:n.jsx(a.default,{src:e,alt:r,fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",className:"object-contain",priority:!0})})}var c=t(29681);function d({id:e,title:r,status:t,overview:i,description:a,overviewImage1:d,overviewImage2:u,overviewImage3:m,link:g,gitHubLink:p}){return(0,n.jsxs)("div",{className:"bg-white/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[550px]",children:[(0,n.jsxs)(o.default,{href:`/projects/${e}`,className:"block flex-grow",children:[n.jsx(l,{src:d,alt:`${r} overview`}),(0,n.jsxs)("div",{className:"p-6 pb-2",children:[n.jsx("h3",{className:"text-xl font-bold text-gray-800",children:r}),n.jsx("div",{className:"mt-2",children:n.jsx(c.O,{status:t})})]}),n.jsx("div",{className:"px-6 flex-grow",children:n.jsx("p",{className:"text-base text-gray-900 whitespace-pre-wrap line-clamp-4 min-h-[80px]",children:a})})]}),n.jsx("div",{className:"px-6 pb-6 mt-auto",children:(0,n.jsxs)("div",{className:"flex gap-4 justify-start",children:[g&&n.jsx(s.z,{href:g,variant:"project",isExternal:!0,children:"View Project"}),p&&n.jsx(s.z,{href:p,variant:"github",isExternal:!0,children:"GitHub"})]})})]})}let u={title:"Projects",description:"Explore my portfolio of projects in robotics engineering, computer science, and software development.",alternates:{canonical:"/projects"},openGraph:{title:"Projects",description:"Explore my portfolio of projects in robotics engineering, computer science, and software development."}},m="force-dynamic";async function g(){try{let e=await (0,i.mW)();if(console.log("Fetched projects:",e),!e||0===e.length)return n.jsx("main",{className:"min-h-screen",children:n.jsx("div",{className:"container mx-auto px-4 py-8",children:(0,n.jsxs)("div",{className:"text-center",children:[n.jsx("h1",{className:"text-2xl font-semibold text-gray-900",children:"No Projects Found"}),n.jsx("p",{className:"mt-2 text-gray-600",children:"There are no projects to display at the moment."})]})})});return n.jsx("main",{className:"min-h-screen",children:(0,n.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[n.jsx("h1",{className:"text-3xl font-bold mb-4",children:"Projects"}),n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:e.map(e=>n.jsx(d,{id:e.id.toString(),title:e.name,status:e.status,overview:e.overviewText||"",description:e.description||"",overviewImage1:e.overviewImage1||"",overviewImage2:e.overviewImage2||"",overviewImage3:e.overviewImage3||"",link:e.link||"",gitHubLink:e.gitHubLink||""},e.id))})]})})}catch(e){return console.error("Error rendering ProjectsPage:",e),n.jsx("main",{className:"min-h-screen",children:n.jsx("div",{className:"container mx-auto px-4 py-8",children:n.jsx("div",{className:"text-red-500",children:"Error loading projects. Please try again later."})})})}}},29681:(e,r,t)=>{"use strict";t.d(r,{O:()=>i});var n=t(40657);function i({status:e}){return n.jsx("span",{className:"px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800",children:e.replace(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase()).trim()})}},5346:(e,r,t)=>{"use strict";t.d(r,{e5:()=>s,mW:()=>a,ty:()=>l});var n=t(90236),i=t(50033);function o(){let e=process.env.DATABASE_URL;if(!e)throw Error("Missing required environment variable: DATABASE_URL. Please check your .env file and ensure it is set.");return e}async function s(e,r={}){try{console.log("Fetching project with ID:",e);let t=(0,n.qn)(o()),s=r.includeInactive??!1,a=parseInt(e);if(Number.isNaN(a))return console.warn("Invalid project id supplied to getProject:",e),null;let l=s?await t`
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
                WHERE id = ${a} AND "isActive" = true
            `;if(console.log("Query result:",l),!l||0===l.length)return console.log("No project found with ID:",e),null;let c=l[0];console.log("Raw project data:",c);let d=i.PH.parse(c);return console.log("Validated project:",d),d}catch(e){return console.error("Error in getProject:",e),null}}async function a(e={}){try{console.log("Fetching all projects");let r=(0,n.qn)(o()),t=e.includeInactive?await r`
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
            `;if(console.log("Query result:",t),!t||0===t.length)return console.log("No projects found"),[];let s=t.map(e=>{try{return i.PH.parse(e)}catch(r){return console.error("Error validating project:",e,r),null}}).filter(e=>null!==e);return console.log("Validated projects:",s),s}catch(e){return console.error("Error in getProjects:",e),[]}}async function l(e,r){let t=(0,n.qn)(o()),s=await t`
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
    `;if(!s||0===s.length)throw Error("Project not found");let a=s[0],l=i.PH.safeParse(a);if(!l.success)throw console.warn("Project validation failed:",l.error),Error("Invalid project data");return l.data}},50033:(e,r,t)=>{"use strict";t.d(r,{IA:()=>a,PH:()=>o,Zd:()=>l,lD:()=>d,wr:()=>c});var n=t(78024);let i=n.z.enum(["InProgress","CompleteMaintained","CompleteUnmaintained","Planned"]),o=n.z.object({id:n.z.number().int().positive(),name:n.z.string().min(1).max(100),status:i,overviewText:n.z.string().max(3e3).nullable(),description:n.z.string().max(5e3).nullable(),overviewImage1:n.z.string().nullable(),overviewImage2:n.z.string().nullable(),overviewImage3:n.z.string().nullable(),link:n.z.string().nullable(),gitHubLink:n.z.string().nullable(),isActive:n.z.boolean().default(!0)});n.z.string().regex(/^\d+$/).transform(Number);let s=n.z.enum(["low","med","high"]),a=n.z.object({id:n.z.number().int().positive(),enableBackground:n.z.boolean(),enableChatbot:n.z.boolean(),enableContactForm:n.z.boolean(),activeBackgroundPackId:n.z.string().nullable(),backgroundConfig:n.z.record(n.z.string(),n.z.unknown()),backgroundQuality:s,reducedMotionOverride:n.z.boolean().nullable(),siteTitle:n.z.string(),tagline:n.z.string(),aboutContent:n.z.string(),avatarImageUrl:n.z.string().nullable(),logoImageUrl:n.z.string().nullable()}),l=a.omit({id:!0}).partial(),c=n.z.object({id:n.z.string(),name:n.z.string(),version:n.z.string(),entryUrl:n.z.string(),manifestUrl:n.z.string(),previewUrl:n.z.string().nullable(),interactive:n.z.boolean(),allowExternal:n.z.boolean(),manifest:n.z.unknown(),uploadedBlobUrls:n.z.array(n.z.string()),createdAt:n.z.coerce.date(),updatedAt:n.z.coerce.date()}),d=n.z.object({name:n.z.string().min(1),version:n.z.string().min(1),entry:n.z.string().min(1).default("index.html"),interactive:n.z.boolean().optional().default(!1),allowExternal:n.z.boolean().optional().default(!1),controls:n.z.array(n.z.object({key:n.z.string().min(1),type:n.z.enum(["toggle","number","select","text","color"]).optional(),label:n.z.string().min(1),default:n.z.unknown().optional(),min:n.z.number().optional(),max:n.z.number().optional(),step:n.z.number().optional(),options:n.z.array(n.z.string()).optional(),help:n.z.string().optional()})).optional().default([])})},5890:(e,r,t)=>{"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.r(r),t.d(r,{_:()=>n,_interop_require_default:()=>n})}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),n=r.X(0,[499,558,24,236,867,453],()=>t(36814));module.exports=n})();