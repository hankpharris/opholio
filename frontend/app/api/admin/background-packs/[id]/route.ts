import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getBackgroundPack, deleteBackgroundPack, setActiveBackgroundPack } from "@/lib/background-packs";
import { del } from "@vercel/blob";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getAdminSession();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    if (body?.action === "activate") {
        await setActiveBackgroundPack(id);
        return NextResponse.json({ success: true });
    }

    if (body?.action === "deactivate") {
        await setActiveBackgroundPack(null);
        return NextResponse.json({ success: true });
    }

    return new NextResponse("Invalid action", { status: 400 });
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getAdminSession();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    const pack = await getBackgroundPack(id);
    if (!pack) {
        return new NextResponse("Not found", { status: 404 });
    }

    const blobUrls = pack.uploadedBlobUrls ?? [];
    let blobDeleteError: string | null = null;
    try {
        if (blobUrls.length > 0) {
            await del(blobUrls);
        }
    } catch (error) {
        console.error("Failed to delete blob assets:", error);
        blobDeleteError = "Failed to delete one or more blob assets.";
    }

    await deleteBackgroundPack(id);

    return NextResponse.json({
        success: true,
        warning: blobDeleteError,
    });
}
