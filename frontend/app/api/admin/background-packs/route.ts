import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { listBackgroundPacks } from "@/lib/background-packs";

export async function GET() {
    const session = await getAdminSession();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const packs = await listBackgroundPacks();
    return NextResponse.json(packs);
}
