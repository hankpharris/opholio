import { NextResponse } from "next/server";
import { getBackgroundPack } from "@/lib/background-packs";

export const runtime = "nodejs";

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const pack = await getBackgroundPack(id);
    if (!pack) {
        return new NextResponse("Background pack not found", { status: 404 });
    }

    let entryResponse: Response;
    try {
        entryResponse = await fetch(pack.entryUrl, {
            cache: "no-store",
        });
    } catch (error) {
        console.error("Failed to fetch pack entry HTML:", error);
        return new NextResponse("Failed to load pack entry", { status: 502 });
    }

    if (!entryResponse.ok) {
        return new NextResponse("Failed to load pack entry", { status: 502 });
    }

    const html = await entryResponse.text();
    return new NextResponse(html, {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
            "X-Robots-Tag": "noindex",
        },
    });
}
