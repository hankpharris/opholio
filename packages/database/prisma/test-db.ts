import { config } from "dotenv";
import { resolve } from "path";
import { PrismaClient } from "../src/generated/client";

// Load environment variables from root .env file
config({ path: resolve(__dirname, "../../../.env") });

async function testDatabase() {
    const prisma = new PrismaClient();

    try {
        console.log("Testing database connection...");
        console.log("Database URL:", process.env.DATABASE_URL);

        // Test connection
        await prisma.$connect();
        console.log("Successfully connected to database");

        // Read all existing projects
        const projects = await prisma.project.findMany();
        console.log("Number of projects found:", projects.length);
        console.log("All projects in database:", JSON.stringify(projects, null, 2));
    } catch (error) {
        console.error("Database test failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testDatabase();
