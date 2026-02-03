import { fromBuffer } from "yauzl-promise";
import path from "node:path";
import { backgroundPackManifestSchema } from "./validation";

export interface UnzippedFile {
    path: string;
    buffer: Buffer;
    contentType: string | null;
}

const FILE_CONTENT_TYPES: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
};

export async function unzipPack(buffer: Buffer) {
    const zip = await fromBuffer(buffer);
    const entries = await zip.readEntries();
    const files: UnzippedFile[] = [];

    for (const entry of entries) {
        if (entry.filename.endsWith("/")) {
            continue;
        }

        const stream = await zip.openReadStream(entry);
        const chunks: Buffer[] = [];
        for await (const chunk of stream) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }

        const filePath = normalizeZipPath(entry.filename);
        files.push({
            path: filePath,
            buffer: Buffer.concat(chunks),
            contentType: contentTypeForPath(filePath),
        });
    }

    await zip.close();
    return files;
}

export function normalizeZipPath(filePath: string) {
    const normalized = path.posix.normalize(filePath.replace(/\\/g, "/"));
    return normalized.replace(/^\.?\//, "");
}

export function isSafeZipPath(filePath: string) {
    if (!filePath) return false;
    if (filePath.startsWith("/") || filePath.startsWith("\\") || filePath.includes(":")) {
        return false;
    }
    const normalized = normalizeZipPath(filePath);
    return !normalized.split("/").some((segment) => segment === "..");
}

export function validateManifest(manifest: unknown) {
    const parsed = backgroundPackManifestSchema.safeParse(manifest);
    if (!parsed.success) {
        return {
            ok: false as const,
            errors: parsed.error.errors.map((issue) => issue.message),
            manifest: null,
        };
    }

    const data = parsed.data;
    const errors: string[] = [];
    const keys = new Set<string>();
    const keyRegex = /^[a-zA-Z0-9_-]+$/;

    for (const control of data.controls ?? []) {
        if (!keyRegex.test(control.key)) {
            errors.push(`Control key "${control.key}" is not URL-safe.`);
        }
        if (keys.has(control.key)) {
            errors.push(`Control key "${control.key}" is duplicated.`);
        }
        keys.add(control.key);
    }

    if (errors.length > 0) {
        return { ok: false as const, errors, manifest: null };
    }

    return { ok: true as const, errors: [], manifest: data };
}

export function rewriteEntryHtml(html: string, pathMap: Record<string, string>, entryPath: string) {
    const missingRefs = new Set<string>();
    const entryDir = path.posix.dirname(entryPath);

    const rewriteRef = (rawRef: string) => {
        const { basePath, suffix } = splitRef(rawRef);
        if (!isLocalRef(basePath)) {
            return rawRef;
        }

        const resolved = normalizeZipPath(path.posix.join(entryDir, basePath));
        const mapped = pathMap[resolved];
        if (!mapped) {
            missingRefs.add(basePath);
            return rawRef;
        }

        return `${mapped}${suffix}`;
    };

    let rewritten = html.replace(/\s(?:src|href)=["']([^"']+)["']/gi, (match, ref) => {
        const updated = rewriteRef(ref);
        return match.replace(ref, updated);
    });

    rewritten = rewritten.replace(/url\(([^)]+)\)/gi, (match, raw) => {
        const cleaned = raw.trim().replace(/^['"]|['"]$/g, "");
        const updated = rewriteRef(cleaned);
        const wrapped = raw.includes("'") ? `'${updated}'` : raw.includes('"') ? `"${updated}"` : updated;
        return `url(${wrapped})`;
    });

    return { html: rewritten, missingRefs: Array.from(missingRefs) };
}

export function splitRef(ref: string) {
    const [baseWithQuery, hash = ""] = ref.split("#");
    const [basePath, query = ""] = baseWithQuery.split("?");
    const suffix = `${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
    return { basePath, suffix };
}

export function isLocalRef(ref: string) {
    if (!ref) return false;
    const lowered = ref.toLowerCase();
    if (lowered.startsWith("http://") || lowered.startsWith("https://")) return false;
    if (lowered.startsWith("//")) return false;
    if (lowered.startsWith("data:")) return false;
    if (lowered.startsWith("mailto:")) return false;
    if (lowered.startsWith("#")) return false;
    if (ref.startsWith("/")) return false;
    return true;
}

export function contentTypeForPath(filePath: string) {
    const ext = path.extname(filePath).toLowerCase();
    return FILE_CONTENT_TYPES[ext] ?? null;
}
