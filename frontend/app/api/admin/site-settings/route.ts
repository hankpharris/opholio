import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getSiteSettings, updateSiteSettings } from "@/lib/site-settings";

export async function GET() {
    const session = await getAdminSession();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const settings = await getSiteSettings();
        return NextResponse.json(settings);
    } catch (error) {
        console.error("Failed to read SiteSettings:", error);
        return new NextResponse("Failed to load settings", { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getAdminSession();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await request.json();
        const settings = await updateSiteSettings(body);
        return NextResponse.json(settings);
    } catch (error) {
        console.error("Failed to update SiteSettings:", error);
        return new NextResponse("Failed to update settings", { status: 500 });
    }
}
