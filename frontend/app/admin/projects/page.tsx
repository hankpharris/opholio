import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { getProjects } from "@/lib/db";

export default async function AdminProjectsPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin");
    }

    const projects = await getProjects({ includeInactive: true });

    return (
        <div className="space-y-6">
            <div className="bg-white/30 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                <ProjectsTable initialProjects={projects} />
            </div>
        </div>
    );
}
