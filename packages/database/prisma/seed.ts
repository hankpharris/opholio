import { config } from "dotenv";
import { resolve } from "path";
import { PrismaClient } from "../src/generated/client";

// Load environment variables from root .env file
config({ path: resolve(__dirname, "../../../.env") });

const client = new PrismaClient();

async function main() {
    await client.$connect();
    console.log("No default seed data configured. Skipping inserts.");
}

main()
    .catch(e => {
        console.error("Error:", e.message);
        process.exit(1);
    })
    .finally(async () => {
        await client.$disconnect();
    });
