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
            <div className="bg-white/30 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Background Packs</h2>
                <BackgroundPacksManager />
            </div>
        </div>
    );
}
