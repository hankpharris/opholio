import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { ContentSettingsForm } from "@/components/admin/ContentSettingsForm";

export default async function AdminContentPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div className="bg-white/30 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Content</h2>
            <ContentSettingsForm />
        </div>
    );
}
