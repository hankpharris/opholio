import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { SignOutButton } from "@/components/buttons/SignOutButton";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { getProjects } from "@/lib/db";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const projects = await getProjects({ includeInactive: true });

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <SignOutButton />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Welcome to the admin panel. You are currently authenticated as: <span className="font-semibold">{session.user?.name}</span>
                </p>
                <p className="text-green-600 dark:text-green-400">
                    ✓ Authentication successful - You have full access to this area
                </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                <ProjectsTable initialProjects={projects} />
            </div>
        </div>
    );
} 