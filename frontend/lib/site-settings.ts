import { prisma } from "./prisma";
import { siteSettingsSchema, siteSettingsUpdateSchema } from "./validation";
import type { Prisma } from "database";

type AvatarShape = "circle" | "square";

function normalizeAvatarShape(value: string | null | undefined): AvatarShape {
    return value === "square" ? "square" : "circle";
}

async function getAvatarShapeFromDb(id: number): Promise<AvatarShape> {
    try {
        const rows = await prisma.$queryRaw<Array<{ avatarShape: string | null }>>`
            SELECT "avatarShape"
            FROM "SiteSettings"
            WHERE id = ${id}
            LIMIT 1
        `;
        return normalizeAvatarShape(rows[0]?.avatarShape);
    } catch (error) {
        console.warn("Failed to read avatarShape. Falling back to circle.", error);
        return "circle";
    }
}

export const DEFAULT_SITE_SETTINGS = {
    id: 1,
    enableBackground: true,
    enableChatbot: false,
    enableContactForm: false,
    enableGithubButton: true,
    activeBackgroundPackId: null,
    backgroundConfig: {},
    backgroundQuality: "med",
    reducedMotionOverride: null,
    avatarShape: "circle",
    siteTitle: "Portfolio",
    tagline: "",
    aboutContent: "",
    avatarImageUrl: null,
    logoImageUrl: null,
} as const;

export async function getSiteSettings() {
    try {
        const record = await prisma.siteSettings.findUnique({
            where: { id: 1 },
        });

        if (!record) {
            return siteSettingsSchema.parse(DEFAULT_SITE_SETTINGS);
        }

        const avatarShape = await getAvatarShapeFromDb(record.id);

        return siteSettingsSchema.parse({
            ...record,
            backgroundConfig: (record.backgroundConfig as Record<string, unknown>) ?? {},
            avatarShape,
        });
    } catch (error) {
        console.error("Failed to load SiteSettings:", error);
        return siteSettingsSchema.parse(DEFAULT_SITE_SETTINGS);
    }
}

export async function getSiteSettingsWithActivePack() {
    try {
        const record = await prisma.siteSettings.findUnique({
            where: { id: 1 },
            include: { activeBackgroundPack: true },
        });

        if (!record) {
            return {
                settings: siteSettingsSchema.parse(DEFAULT_SITE_SETTINGS),
                activePack: null,
            };
        }

        const avatarShape = await getAvatarShapeFromDb(record.id);

        return {
            settings: siteSettingsSchema.parse({
                ...record,
                backgroundConfig: (record.backgroundConfig as Record<string, unknown>) ?? {},
                avatarShape,
            }),
            activePack: record.activeBackgroundPack ?? null,
        };
    } catch (error) {
        console.error("Failed to load SiteSettings with pack:", error);
        return {
            settings: siteSettingsSchema.parse(DEFAULT_SITE_SETTINGS),
            activePack: null,
        };
    }
}

export async function updateSiteSettings(update: unknown) {
    const data = siteSettingsUpdateSchema.parse(update);
    const { avatarShape, ...prismaSafeData } = data;

    if (prismaSafeData.backgroundConfig && typeof prismaSafeData.backgroundConfig !== "object") {
        prismaSafeData.backgroundConfig = {};
    }

    // Convert to Prisma-compatible update input
    const prismaUpdateData: Prisma.SiteSettingsUpdateInput = {
        ...prismaSafeData,
        backgroundConfig: prismaSafeData.backgroundConfig as Prisma.InputJsonValue | undefined,
    };

    const { avatarShape: _ignoredDefaultAvatarShape, ...defaultWithoutAvatarShape } = DEFAULT_SITE_SETTINGS;
    const prismaCreateData: Prisma.SiteSettingsCreateInput = {
        ...defaultWithoutAvatarShape,
        ...prismaSafeData,
        backgroundConfig: (prismaSafeData.backgroundConfig ?? DEFAULT_SITE_SETTINGS.backgroundConfig) as Prisma.InputJsonValue,
    };

    try {
        const record = await prisma.siteSettings.upsert({
            where: { id: 1 },
            create: prismaCreateData,
            update: prismaUpdateData,
        });

        if (avatarShape !== undefined) {
            try {
                await prisma.$executeRaw`
                    UPDATE "SiteSettings"
                    SET "avatarShape" = ${avatarShape}
                    WHERE id = ${record.id}
                `;
            } catch (error) {
                console.warn("Failed to persist avatarShape. Falling back to circle.", error);
            }
        }

        const persistedAvatarShape = await getAvatarShapeFromDb(record.id);
        return siteSettingsSchema.parse({
            ...record,
            backgroundConfig: (record.backgroundConfig as Record<string, unknown>) ?? {},
            avatarShape: persistedAvatarShape,
        });
    } catch (error) {
        console.error("Failed to update SiteSettings:", error);
        throw error;
    }
}
