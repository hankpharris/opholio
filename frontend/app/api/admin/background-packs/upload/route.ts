import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { put, del } from "@vercel/blob";
import { getAdminSession } from "@/lib/admin";
import {
    unzipPack,
    isSafeZipPath,
    normalizeZipPath,
    validateManifest,
    rewriteEntryHtml,
} from "@/lib/background-pack-utils";
import { createBackgroundPack } from "@/lib/background-packs";

export const runtime = "nodejs";

export async function POST(request: Request) {
    const session = await getAdminSession();
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
        return new NextResponse("No file provided", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const files = await unzipPack(buffer);
    if (files.length === 0) {
        return new NextResponse("Zip is empty", { status: 400 });
    }

    const unsafePaths = files.filter((entry) => !isSafeZipPath(entry.path));
    if (unsafePaths.length > 0) {
        return NextResponse.json(
            { error: "Zip contains unsafe paths.", paths: unsafePaths.map((f) => f.path) },
            { status: 400 }
        );
    }

    const manifestFile = files.find((entry) => entry.path === "manifest.json");
    if (!manifestFile) {
        return new NextResponse("Missing manifest.json", { status: 400 });
    }

    let manifestJson: unknown;
    try {
        manifestJson = JSON.parse(manifestFile.buffer.toString("utf-8"));
    } catch (error) {
        console.error("Invalid manifest JSON:", error);
        return new NextResponse("Invalid manifest.json", { status: 400 });
    }

    const manifestResult = validateManifest(manifestJson);
    if (!manifestResult.ok) {
        return NextResponse.json(
            { error: "Manifest validation failed.", issues: manifestResult.errors },
            { status: 400 }
        );
    }

    const manifest = manifestResult.manifest;
    const entryPath = normalizeZipPath(manifest.entry ?? "index.html");
    if (!isSafeZipPath(entryPath)) {
        return NextResponse.json(
            { error: "Entry path is unsafe.", entry: entryPath },
            { status: 400 }
        );
    }
    const entryFile = files.find((entry) => entry.path === entryPath);
    if (!entryFile) {
        return NextResponse.json(
            { error: "Entry file missing.", entry: entryPath },
            { status: 400 }
        );
    }

    const packId = randomUUID();
    const packVersion = manifest.version.replace(/[^a-zA-Z0-9._-]/g, "_");
    const baseKey = `bg/${packId}/${packVersion}`;
    const pathMap: Record<string, string> = {};
    const uploadedBlobUrls: string[] = [];

    for (const entry of files) {
        if (entry.path === entryPath || entry.path === "manifest.json") {
            continue;
        }

        const blob = await put(`${baseKey}/${entry.path}`, entry.buffer, {
            access: "public",
            addRandomSuffix: false,
            contentType: entry.contentType ?? undefined,
        });

        pathMap[entry.path] = blob.url;
        uploadedBlobUrls.push(blob.url);
    }

    const entryHtml = entryFile.buffer.toString("utf-8");
    const { html, missingRefs } = rewriteEntryHtml(entryHtml, pathMap, entryPath);
    if (missingRefs.length > 0) {
        return NextResponse.json(
            { error: "Entry references missing assets.", missingRefs },
            { status: 400 }
        );
    }

    const entryBlob = await put(`${baseKey}/${entryPath}`, html, {
        access: "public",
        addRandomSuffix: false,
        contentType: entryFile.contentType ?? "text/html; charset=utf-8",
    });
    pathMap[entryPath] = entryBlob.url;
    uploadedBlobUrls.push(entryBlob.url);

    const manifestBlob = await put(
        `${baseKey}/manifest.json`,
        JSON.stringify(manifest, null, 2),
        {
            access: "public",
            addRandomSuffix: false,
            contentType: "application/json; charset=utf-8",
        }
    );
    uploadedBlobUrls.push(manifestBlob.url);

    const previewEntry = files.find((entry) => entry.path === "preview.png");
    const previewUrl = previewEntry ? pathMap[previewEntry.path] ?? null : null;

    try {
        const record = await createBackgroundPack({
            name: manifest.name,
            version: manifest.version,
            entryUrl: entryBlob.url,
            manifestUrl: manifestBlob.url,
            previewUrl,
            interactive: manifest.interactive ?? false,
            allowExternal: manifest.allowExternal ?? false,
            manifest,
            uploadedBlobUrls,
        });

        return NextResponse.json(record);
    } catch (error) {
        console.error("Failed to persist background pack:", error);
        try {
            if (uploadedBlobUrls.length > 0) {
                await del(uploadedBlobUrls);
            }
        } catch (cleanupError) {
            console.error("Failed to cleanup blobs after DB failure:", cleanupError);
        }
        return NextResponse.json(
            { error: "Upload succeeded but database write failed." },
            { status: 500 }
        );
    }
}
