(()=>{var e={};e.id=895,e.ids=[895],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},57147:e=>{"use strict";e.exports=require("fs")},92761:e=>{"use strict";e.exports=require("node:async_hooks")},17718:e=>{"use strict";e.exports=require("node:child_process")},6005:e=>{"use strict";e.exports=require("node:crypto")},15673:e=>{"use strict";e.exports=require("node:events")},87561:e=>{"use strict";e.exports=require("node:fs")},93977:e=>{"use strict";e.exports=require("node:fs/promises")},70612:e=>{"use strict";e.exports=require("node:os")},49411:e=>{"use strict";e.exports=require("node:path")},97742:e=>{"use strict";e.exports=require("node:process")},25997:e=>{"use strict";e.exports=require("node:tty")},47261:e=>{"use strict";e.exports=require("node:util")},71017:e=>{"use strict";e.exports=require("path")},36814:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>v,tree:()=>l});var s=t(7),i=t(8533),o=t(29377),n=t.n(o),a=t(29799),c={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>a[e]);t.d(r,c);let l=["",{children:["projects",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,67570)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\page.tsx"]}]},{loading:[()=>Promise.resolve().then(t.bind(t,47671)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\loading.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,23253)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\not-found.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,99507)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,97832)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\not-found.tsx"]}],d=["C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\page.tsx"],u="/projects/page",p={require:t,loadChunk:()=>Promise.resolve()},v=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/projects/page",pathname:"/projects",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},74254:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,63654,23)),Promise.resolve().then(t.t.bind(t,10921,23))},74868:()=>{},47671:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i});var s=t(40657);function i(){return s.jsx("div",{className:"container mx-auto px-4 py-8",children:s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3].map(e=>(0,s.jsxs)("div",{className:"bg-white/30 rounded-xl shadow-lg backdrop-blur-md p-6 animate-pulse",children:[s.jsx("div",{className:"h-8 bg-gray-200 rounded w-3/4 mb-4"}),s.jsx("div",{className:"h-4 bg-gray-200 rounded w-full mb-2"}),s.jsx("div",{className:"h-4 bg-gray-200 rounded w-5/6 mb-4"}),(0,s.jsxs)("div",{className:"flex gap-2",children:[s.jsx("div",{className:"h-10 bg-gray-200 rounded w-24"}),s.jsx("div",{className:"h-10 bg-gray-200 rounded w-24"})]})]},e))})})}},23253:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});var s=t(40657),i=t(25984);function o(){return s.jsx("div",{className:"min-h-screen relative",children:s.jsx("div",{className:"relative z-10 flex items-center justify-center min-h-screen",children:(0,s.jsxs)("div",{className:"text-center space-y-6",children:[s.jsx("h1",{className:"text-4xl font-bold text-gray-800",children:"Project Not Found"}),s.jsx("p",{className:"text-lg text-gray-600",children:"The project you're looking for doesn't exist."}),s.jsx("div",{className:"mt-8",children:s.jsx(i.z,{href:"/projects",variant:"project",children:"Back to Projects"})})]})})})}},67570:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>v,dynamic:()=>p,metadata:()=>u});var s=t(40657),i=t(5346),o=t(18935),n=t(25984),a=t(78049);function c({src:e,alt:r}){return s.jsx("div",{className:"relative w-full h-64 overflow-hidden",children:s.jsx(a.default,{src:e,alt:r,fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",className:"object-contain",priority:!0})})}var l=t(29681);function d({id:e,title:r,status:t,overview:i,description:a,overviewImage1:d,overviewImage2:u,overviewImage3:p,link:v,gitHubLink:m}){return(0,s.jsxs)("div",{className:"bg-white/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[550px]",children:[(0,s.jsxs)(o.default,{href:`/projects/${e}`,className:"block flex-grow",children:[s.jsx(c,{src:d,alt:`${r} overview`}),(0,s.jsxs)("div",{className:"p-6 pb-2",children:[s.jsx("h3",{className:"text-xl font-bold text-gray-800",children:r}),s.jsx("div",{className:"mt-2",children:s.jsx(l.O,{status:t})})]}),s.jsx("div",{className:"px-6 flex-grow",children:s.jsx("p",{className:"text-base text-gray-900 whitespace-pre-wrap line-clamp-4 min-h-[80px]",children:a})})]}),s.jsx("div",{className:"px-6 pb-6 mt-auto",children:(0,s.jsxs)("div",{className:"flex gap-4 justify-start",children:[v&&s.jsx(n.z,{href:v,variant:"project",isExternal:!0,children:"View Project"}),m&&s.jsx(n.z,{href:m,variant:"github",isExternal:!0,children:"GitHub"})]})})]})}let u={title:"Projects",description:"Explore my portfolio of projects in robotics engineering, computer science, and software development.",alternates:{canonical:"/projects"},openGraph:{title:"Projects",description:"Explore my portfolio of projects in robotics engineering, computer science, and software development."}},p="force-dynamic";async function v(){try{let e=await (0,i.mW)();if(console.log("Fetched projects:",e),!e||0===e.length)return s.jsx("main",{className:"min-h-screen",children:s.jsx("div",{className:"container mx-auto px-4 py-8",children:(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("h1",{className:"text-2xl font-semibold text-gray-900",children:"No Projects Found"}),s.jsx("p",{className:"mt-2 text-gray-600",children:"There are no projects to display at the moment."})]})})});return s.jsx("main",{className:"min-h-screen",children:(0,s.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[s.jsx("h1",{className:"text-3xl font-bold mb-4",children:"Projects"}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:e.map(e=>s.jsx(d,{id:e.id.toString(),title:e.name,status:e.status,overview:e.overviewText||"",description:e.description||"",overviewImage1:e.overviewImage1||"",overviewImage2:e.overviewImage2||"",overviewImage3:e.overviewImage3||"",link:e.link||"",gitHubLink:e.gitHubLink||""},e.id))})]})})}catch(e){return console.error("Error rendering ProjectsPage:",e),s.jsx("main",{className:"min-h-screen",children:s.jsx("div",{className:"container mx-auto px-4 py-8",children:s.jsx("div",{className:"text-red-500",children:"Error loading projects. Please try again later."})})})}}},29681:(e,r,t)=>{"use strict";t.d(r,{O:()=>i});var s=t(40657);function i({status:e}){return s.jsx("span",{className:"px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800",children:e.replace(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase()).trim()})}},5346:(e,r,t)=>{"use strict";t.d(r,{e5:()=>n,mW:()=>a,ty:()=>c});var s=t(90236),i=t(50033);function o(){let e=process.env.DATABASE_URL;if(!e)throw Error("Missing required environment variable: DATABASE_URL. Please check your .env file and ensure it is set.");return e}async function n(e,r={}){try{console.log("Fetching project with ID:",e);let t=(0,s.qn)(o()),n=r.includeInactive??!1,a=parseInt(e);if(Number.isNaN(a))return console.warn("Invalid project id supplied to getProject:",e),null;let c=n?await t`
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
            `;if(console.log("Query result:",c),!c||0===c.length)return console.log("No project found with ID:",e),null;let l=c[0];console.log("Raw project data:",l);let d=i.PH.parse(l);return console.log("Validated project:",d),d}catch(e){return console.error("Error in getProject:",e),null}}async function a(e={}){try{console.log("Fetching all projects");let r=(0,s.qn)(o()),t=e.includeInactive?await r`
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
            `;if(console.log("Query result:",t),!t||0===t.length)return console.log("No projects found"),[];let n=t.map(e=>{try{return i.PH.parse(e)}catch(r){return console.error("Error validating project:",e,r),null}}).filter(e=>null!==e);return console.log("Validated projects:",n),n}catch(e){return console.error("Error in getProjects:",e),[]}}async function c(e,r){let t=(0,s.qn)(o()),n=await t`
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
    `;if(!n||0===n.length)throw Error("Project not found");let a=n[0],c=i.PH.safeParse(a);if(!c.success)throw console.warn("Project validation failed:",c.error),Error("Invalid project data");return c.data}},5890:(e,r,t)=>{"use strict";function s(e){return e&&e.__esModule?e:{default:e}}t.r(r),t.d(r,{_:()=>s,_interop_require_default:()=>s})}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[499,24,143,236,935,923,29],()=>t(36814));module.exports=s})();