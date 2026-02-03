import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { BackgroundPacksManager } from "@/components/admin/BackgroundPacksManager";

export default async function AdminBackgroundsPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Background Packs</h2>
                <BackgroundPacksManager />
            </div>
        </div>
    );
}
