import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminSystemPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin");
    }

    const envVars = [
        "DATABASE_URL",
        "NEXTAUTH_URL",
        "NEXTAUTH_URL_INTERNAL",
        "NEXTAUTH_SECRET",
        "GITHUB_ID",
        "GITHUB_SECRET",
        "GITHUB_ID_PERSONAL",
        "GITHUB_SECRET_PERSONAL",
        "ALLOWED_GITHUB_USERS",
        "BLOB_READ_WRITE_TOKEN",
    ];

    const envStatus = envVars.map((key) => ({
        key,
        present: Boolean(process.env[key]),
    }));

    let dbStatus = "unknown";
    try {
        await prisma.$queryRaw`SELECT 1`;
        dbStatus = "reachable";
    } catch (error) {
        console.error("Database check failed:", error);
        dbStatus = "unreachable";
    }

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">System status</h2>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div>
                        <span className="font-medium">Database:</span>{" "}
                        <span className={dbStatus === "reachable" ? "text-green-600" : "text-red-600"}>
                            {dbStatus}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium">Blob token:</span>{" "}
                        <span className={process.env.BLOB_READ_WRITE_TOKEN ? "text-green-600" : "text-red-600"}>
                            {process.env.BLOB_READ_WRITE_TOKEN ? "present" : "missing"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">Environment variables</h3>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                    {envStatus.map((env) => (
                        <div key={env.key} className="flex items-center justify-between">
                            <span>{env.key}</span>
                            <span className={env.present ? "text-green-600" : "text-red-600"}>
                                {env.present ? "present" : "missing"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
