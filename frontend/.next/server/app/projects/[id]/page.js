(()=>{var e={};e.id=626,e.ids=[626],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},57147:e=>{"use strict";e.exports=require("fs")},92761:e=>{"use strict";e.exports=require("node:async_hooks")},17718:e=>{"use strict";e.exports=require("node:child_process")},6005:e=>{"use strict";e.exports=require("node:crypto")},15673:e=>{"use strict";e.exports=require("node:events")},87561:e=>{"use strict";e.exports=require("node:fs")},93977:e=>{"use strict";e.exports=require("node:fs/promises")},70612:e=>{"use strict";e.exports=require("node:os")},49411:e=>{"use strict";e.exports=require("node:path")},97742:e=>{"use strict";e.exports=require("node:process")},25997:e=>{"use strict";e.exports=require("node:tty")},47261:e=>{"use strict";e.exports=require("node:util")},71017:e=>{"use strict";e.exports=require("path")},25245:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>a.a,__next_app__:()=>v,originalPathname:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>l});var s=t(7),i=t(8533),o=t(29377),a=t.n(o),n=t(29799),c={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>n[e]);t.d(r,c);let l=["",{children:["projects",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,65971)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\[id]\\page.tsx"]}]},{loading:[()=>Promise.resolve().then(t.bind(t,50857)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\[id]\\loading.tsx"]}]},{loading:[()=>Promise.resolve().then(t.bind(t,47671)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\loading.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,23253)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\not-found.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,99507)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,97832)),"C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\not-found.tsx"]}],d=["C:\\Users\\henry\\cursourProjects\\ofolio\\frontend\\app\\projects\\[id]\\page.tsx"],u="/projects/[id]/page",v={require:t,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/projects/[id]/page",pathname:"/projects/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},74254:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,63654,23)),Promise.resolve().then(t.t.bind(t,10921,23))},74868:()=>{},50857:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i});var s=t(40657);function i(){return s.jsx("div",{className:"flex-grow flex items-center justify-center py-8",children:(0,s.jsxs)("div",{className:"container mx-auto px-4 py-8 bg-white/30 rounded-xl shadow-lg backdrop-blur-md relative z-10 animate-pulse",children:[s.jsx("div",{className:"h-12 bg-gray-200 rounded w-3/4 mb-8"}),(0,s.jsxs)("div",{className:"space-y-4",children:[s.jsx("div",{className:"h-4 bg-gray-200 rounded w-full"}),s.jsx("div",{className:"h-4 bg-gray-200 rounded w-5/6"}),s.jsx("div",{className:"h-4 bg-gray-200 rounded w-4/6"})]}),(0,s.jsxs)("div",{className:"mt-8 flex gap-4",children:[s.jsx("div",{className:"h-10 bg-gray-200 rounded w-32"}),s.jsx("div",{className:"h-10 bg-gray-200 rounded w-32"})]})]})})}},65971:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>x,dynamic:()=>v,generateMetadata:()=>u,revalidate:()=>p});var s=t(40657),i=t(95099),o=t(78931),a=t(78049),n=t(25984),c=t(29681);function l({title:e,status:r,overview:t,description:i,overviewImage1:o,overviewImage2:l,overviewImage3:d,link:u,gitHubLink:v}){let p=t.split("\n\n").filter(e=>e.trim()),x=e=>e.startsWith("http")?e:`/${e}`;return s.jsx("div",{className:"bg-white/30 backdrop-blur-md rounded-xl shadow-lg overflow-hidden",children:(0,s.jsxs)("div",{className:"p-6",children:[(0,s.jsxs)("div",{className:"flex flex-col md:flex-row md:justify-between md:items-center mb-6",children:[(0,s.jsxs)("div",{className:"flex items-center gap-4 mb-4 md:mb-0",children:[s.jsx("h1",{className:"text-4xl font-bold text-gray-800",children:e}),s.jsx(c.O,{status:r})]}),(0,s.jsxs)("div",{className:"flex gap-4 justify-start",children:[u&&s.jsx(n.z,{href:u,variant:"project",isExternal:!0,children:"View Project"}),v&&s.jsx(n.z,{href:v,variant:"github",isExternal:!0,children:"GitHub"})]})]}),(0,s.jsxs)("div",{className:"space-y-8",children:[(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 items-center",children:[o&&s.jsx("div",{className:"relative h-[400px] overflow-hidden",children:s.jsx(a.default,{src:x(o),alt:`${e} overview`,fill:!0,className:"object-contain",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",priority:!0})}),p[0]&&s.jsx("div",{className:"prose max-w-none w-full",children:s.jsx("p",{className:"text-lg text-gray-900",children:p[0]})})]}),l&&p[1]&&(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 items-center",children:[s.jsx("div",{className:"relative h-[400px] overflow-hidden",children:s.jsx(a.default,{src:x(l),alt:`${e} overview 2`,fill:!0,className:"object-contain",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"})}),s.jsx("div",{className:"prose max-w-none",children:s.jsx("p",{className:"text-lg text-gray-900",children:p[1]})})]}),d&&p[2]&&(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 items-center",children:[s.jsx("div",{className:"relative h-[400px] overflow-hidden",children:s.jsx(a.default,{src:x(d),alt:`${e} overview 3`,fill:!0,className:"object-contain",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"})}),s.jsx("div",{className:"prose max-w-none",children:s.jsx("p",{className:"text-lg text-gray-900",children:p[2]})})]}),p.slice(3).map((e,r)=>s.jsx("div",{className:"prose max-w-none",children:s.jsx("p",{className:"text-lg text-gray-900",children:e})},r))]})]})})}var d=t(5346);async function u({params:e}){let r=await (0,d.e5)(e.id);return r?{title:r.name,description:r.overviewText||r.description||`View details about ${r.name} project.`,alternates:{canonical:`/projects/${e.id}`},openGraph:{title:r.name,description:r.overviewText||r.description||`View details about ${r.name} project.`}}:{title:"Project Not Found",description:"The requested project could not be found."}}let v="force-dynamic",p=0;async function x({params:e}){try{let r=await (0,d.e5)(e.id);r||(console.log("Project not found:",e.id),(0,o.notFound)());let t={title:r.name,status:r.status,overview:r.overviewText||"",description:r.description||"",overviewImage1:r.overviewImage1||"",overviewImage2:r.overviewImage2||"",overviewImage3:r.overviewImage3||"",link:r.link,gitHubLink:r.gitHubLink};return s.jsx("div",{className:"min-h-screen relative",children:s.jsx("div",{className:"relative z-10 container mx-auto px-4 md:px-16 py-8 md:py-8 pt-[120px] md:pt-8",children:s.jsx(i.Suspense,{fallback:s.jsx("div",{children:"Loading..."}),children:s.jsx(l,{...t})})})})}catch(e){console.error("Error loading project:",e),(0,o.notFound)()}}},47671:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i});var s=t(40657);function i(){return s.jsx("div",{className:"container mx-auto px-4 py-8",children:s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3].map(e=>(0,s.jsxs)("div",{className:"bg-white/30 rounded-xl shadow-lg backdrop-blur-md p-6 animate-pulse",children:[s.jsx("div",{className:"h-8 bg-gray-200 rounded w-3/4 mb-4"}),s.jsx("div",{className:"h-4 bg-gray-200 rounded w-full mb-2"}),s.jsx("div",{className:"h-4 bg-gray-200 rounded w-5/6 mb-4"}),(0,s.jsxs)("div",{className:"flex gap-2",children:[s.jsx("div",{className:"h-10 bg-gray-200 rounded w-24"}),s.jsx("div",{className:"h-10 bg-gray-200 rounded w-24"})]})]},e))})})}},23253:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});var s=t(40657),i=t(25984);function o(){return s.jsx("div",{className:"min-h-screen relative",children:s.jsx("div",{className:"relative z-10 flex items-center justify-center min-h-screen",children:(0,s.jsxs)("div",{className:"text-center space-y-6",children:[s.jsx("h1",{className:"text-4xl font-bold text-gray-800",children:"Project Not Found"}),s.jsx("p",{className:"text-lg text-gray-600",children:"The project you're looking for doesn't exist."}),s.jsx("div",{className:"mt-8",children:s.jsx(i.z,{href:"/projects",variant:"project",children:"Back to Projects"})})]})})})}},29681:(e,r,t)=>{"use strict";t.d(r,{O:()=>i});var s=t(40657);function i({status:e}){return s.jsx("span",{className:"px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800",children:e.replace(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase()).trim()})}},5346:(e,r,t)=>{"use strict";t.d(r,{e5:()=>a,mW:()=>n,ty:()=>c});var s=t(90236),i=t(50033);function o(){let e=process.env.DATABASE_URL;if(!e)throw Error("Missing required environment variable: DATABASE_URL. Please check your .env file and ensure it is set.");return e}async function a(e,r={}){try{console.log("Fetching project with ID:",e);let t=(0,s.qn)(o()),a=r.includeInactive??!1,n=parseInt(e);if(Number.isNaN(n))return console.warn("Invalid project id supplied to getProject:",e),null;let c=a?await t`
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
                WHERE id = ${n}
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
                WHERE id = ${n} AND "isActive" = true
            `;if(console.log("Query result:",c),!c||0===c.length)return console.log("No project found with ID:",e),null;let l=c[0];console.log("Raw project data:",l);let d=i.PH.parse(l);return console.log("Validated project:",d),d}catch(e){return console.error("Error in getProject:",e),null}}async function n(e={}){try{console.log("Fetching all projects");let r=(0,s.qn)(o()),t=e.includeInactive?await r`
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
            `;if(console.log("Query result:",t),!t||0===t.length)return console.log("No projects found"),[];let a=t.map(e=>{try{return i.PH.parse(e)}catch(r){return console.error("Error validating project:",e,r),null}}).filter(e=>null!==e);return console.log("Validated projects:",a),a}catch(e){return console.error("Error in getProjects:",e),[]}}async function c(e,r){let t=(0,s.qn)(o()),a=await t`
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
    `;if(!a||0===a.length)throw Error("Project not found");let n=a[0],c=i.PH.safeParse(n);if(!c.success)throw console.warn("Project validation failed:",c.error),Error("Invalid project data");return c.data}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[499,24,143,718,236,935,923,317],()=>t(25245));module.exports=s})();