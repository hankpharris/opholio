import { prisma } from "./prisma";
import { siteSettingsSchema, siteSettingsUpdateSchema } from "./validation";

export const DEFAULT_SITE_SETTINGS = {
    id: 1,
    enableBackground: true,
    enableChatbot: false,
    enableContactForm: false,
    activeBackgroundPackId: null,
    backgroundConfig: {},
    backgroundQuality: "med",
    reducedMotionOverride: null,
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

        return siteSettingsSchema.parse({
            ...record,
            backgroundConfig: (record.backgroundConfig as Record<string, unknown>) ?? {},
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

        return {
            settings: siteSettingsSchema.parse({
                ...record,
                backgroundConfig: (record.backgroundConfig as Record<string, unknown>) ?? {},
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
    if (data.backgroundConfig && typeof data.backgroundConfig !== "object") {
        data.backgroundConfig = {};
    }

    try {
        const record = await prisma.siteSettings.upsert({
            where: { id: 1 },
            create: { ...DEFAULT_SITE_SETTINGS, ...data },
            update: data,
        });

        return siteSettingsSchema.parse(record);
    } catch (error) {
        console.error("Failed to update SiteSettings:", error);
        throw error;
    }
}
