import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from "../src/generated/client";

// Load environment variables from root .env file
config({ path: resolve(__dirname, '../../../.env') });

const client = new PrismaClient();

async function main() {
    console.log("Starting seed...");
    console.log("Database URL:", process.env.DATABASE_URL);
    
    try {
        // First, let's check if we can connect to the database
        await client.$connect();
        console.log("Successfully connected to database");

        // Check if there are any existing projects
        const existingProjects = await client.project.findMany();
        console.log("Existing projects:", existingProjects);

        // Create first project
        console.log("Creating first project...");
        const project1 = await client.project.create({
            data: {
                name: "Portfolio",
                status: "InProgress",
                description:
                    "This project represents this website itsself, it is a portfolio website for all of my projects",
                overviewText: `
                    This is the overview for the Portfolio Project. Generally speaking overview pages serve to give a basic explanation of their associated project but seeing as this is the overview for this project, it also serves as a home/landing page for the website. It's built around a table displaying a database of all my projects as well as an overview page for each
                    
                    At the top of the page is a header/navigation bar which allows the user to view this table as well as well as an about/contact me page and a link to my gitbhub which I'm working on getting up to date and professionalizing.

                    This page itsself was built using "PERN stack" (PostgreSQL, Express, React, Node) with NextJS and Typescript. It is styled using TailwindCSS. A majority of the boiler-plate and setup is based on what I learned and developped with my team in WPI's software engineering course. The website for this course is the second item listed in the projects table. Documentation of many of our coding tools as well as my teammates themselves can be found there. Of course a huge thanks goes out to both them and professor Wong for there role in my learning of these skills. Aside from existing boiler-plate this website was built to a minimum viable product by myself using cursour IDE in 12-16 work hours.
                `,
                overviewImage1: "LogoNoBG.png",
                overviewImage2: "Projects2.png",
                overviewImage3: null,
                link: null,
                gitHubLink: "https://github.com/hankpharris/PortfolioSite",
            },
        });
        console.log("Created first project:", project1);

        // Create second project
        console.log("Creating second project...");
        const project2 = await client.project.create({
            data: {
                name: "SoftwareEng Course Website",
                status: "CompleteUnmaintained",
                description:
                    "This is the website for WPI's Software Engineering course it was built by a 10 person team in a single quarter.",
                overviewText: `
                    This is the overview for the Software Engineering Course Website mentioned in this websites overview. It is a website for WPI's Software Engineering course. It was completed by a 10 person team in a single quarter as a term long projecct and served as our primary grading metric. It operates as a multifunctional web app for Brigham and Womens's hospital employees and patients.

                    It was built using the same PERN stack (PostgreSQL, Express, React, Node) as this website itself though its uses vite + react architecture (as opposed to NextJS). Documentation of all of our coding tools as well as basic information about my teammates can be found on the site itself (credits and about us repectively).

                    This site is currently unmaintained and the repo can not be made public because it is an assigned group project, however I've left the github link attatched for my own organizational purposes.
                `,
                overviewImage1: "Project2Image1.png",
                overviewImage2: "Project2Image2.png",
                overviewImage3: null,
                link: "https://brighams.rom.dog/landing",
                gitHubLink: "https://github.com/cs3733-d25/team-m",
            },
        });
        console.log("Created second project:", project2);

        // Verify the data was inserted
        const allProjects = await client.project.findMany();
        console.log("All projects after seed:", allProjects);
    } catch (error) {
        console.error("Error during seeding:", error);
        throw error;
    }
}

main()
    .catch(e => {
        console.error("Error:", e.message);
        process.exit(1);
    })
    .finally(async () => {
        await client.$disconnect();
    }); 