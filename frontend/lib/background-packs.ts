import { prisma } from "./prisma";
import { backgroundPackSchema } from "./validation";
import type { BackgroundPack, Prisma } from "database";

export async function listBackgroundPacks() {
    const packs: BackgroundPack[] = await prisma.backgroundPack.findMany({
        orderBy: { createdAt: "desc" },
    });

    return packs.map((pack: BackgroundPack) =>
        backgroundPackSchema.parse({
            ...pack,
            uploadedBlobUrls: (pack.uploadedBlobUrls as string[]) ?? [],
        })
    );
}

export async function getBackgroundPack(id: string) {
    const pack: BackgroundPack | null = await prisma.backgroundPack.findUnique({ where: { id } });
    if (!pack) return null;
    return backgroundPackSchema.parse({
        ...pack,
        uploadedBlobUrls: (pack.uploadedBlobUrls as string[]) ?? [],
    });
}

export async function createBackgroundPack(data: {
    name: string;
    version: string;
    entryUrl: string;
    manifestUrl: string;
    previewUrl: string | null;
    interactive: boolean;
    allowExternal: boolean;
    manifest: unknown;
    uploadedBlobUrls: string[];
}) {
    const pack = await prisma.backgroundPack.create({
        data: {
            name: data.name,
            version: data.version,
            entryUrl: data.entryUrl,
            manifestUrl: data.manifestUrl,
            previewUrl: data.previewUrl ?? null,
            interactive: data.interactive,
            allowExternal: data.allowExternal,
            manifest: data.manifest as Prisma.InputJsonValue,
            uploadedBlobUrls: data.uploadedBlobUrls as Prisma.InputJsonValue,
        },
    });

    return backgroundPackSchema.parse({
        ...pack,
        uploadedBlobUrls: (pack.uploadedBlobUrls as string[]) ?? [],
    });
}

export async function deleteBackgroundPack(id: string) {
    await prisma.siteSettings.updateMany({
        where: { activeBackgroundPackId: id },
        data: { activeBackgroundPackId: null },
    });

    return prisma.backgroundPack.delete({ where: { id } });
}

export async function setActiveBackgroundPack(id: string | null) {
    return prisma.siteSettings.upsert({
        where: { id: 1 },
        create: {
            id: 1,
            enableBackground: true,
            enableChatbot: false,
            enableContactForm: false,
            enableGithubButton: true,
            backgroundConfig: {},
            backgroundQuality: "med",
            reducedMotionOverride: null,
            siteTitle: "Portfolio",
            tagline: "",
            aboutContent: "",
            avatarImageUrl: null,
            logoImageUrl: null,
            activeBackgroundPackId: id,
        },
        update: { activeBackgroundPackId: id },
    });
}
