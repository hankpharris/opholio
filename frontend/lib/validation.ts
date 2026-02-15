import { z } from 'zod';

export const StatusEnum = z.enum([
    'InProgress',
    'CompleteMaintained',
    'CompleteUnmaintained',
    'Planned'
]);

export type Status = z.infer<typeof StatusEnum>;

export const projectSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1).max(100),
    status: StatusEnum,
    overviewText: z.string().max(3000).nullable(),
    description: z.string().max(5000).nullable(),
    overviewImage1: z.string().nullable(),
    overviewImage2: z.string().nullable(),
    overviewImage3: z.string().nullable(),
    link: z.string().nullable(),
    gitHubLink: z.string().nullable(),
    isActive: z.boolean().default(true),
});

export const projectIdSchema = z.string().regex(/^\d+$/).transform(Number);

export type Project = z.infer<typeof projectSchema>;

export const BackgroundQualityEnum = z.enum(['low', 'med', 'high']);

export const siteSettingsSchema = z.object({
    id: z.number().int().positive(),
    enableBackground: z.boolean(),
    enableChatbot: z.boolean(),
    enableContactForm: z.boolean(),
    enableGithubButton: z.boolean(),
    activeBackgroundPackId: z.string().nullable(),
    backgroundConfig: z.record(z.string(), z.unknown()),
    backgroundQuality: BackgroundQualityEnum,
    reducedMotionOverride: z.boolean().nullable(),
    siteTitle: z.string(),
    tagline: z.string(),
    aboutContent: z.string(),
    avatarImageUrl: z.string().nullable(),
    logoImageUrl: z.string().nullable(),
});

export const siteSettingsUpdateSchema = siteSettingsSchema
    .omit({ id: true })
    .partial();

export const backgroundPackSchema = z.object({
    id: z.string(),
    name: z.string(),
    version: z.string(),
    entryUrl: z.string(),
    manifestUrl: z.string(),
    previewUrl: z.string().nullable(),
    interactive: z.boolean(),
    allowExternal: z.boolean(),
    manifest: z.unknown(),
    uploadedBlobUrls: z.array(z.string()),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type SiteSettingsUpdate = z.infer<typeof siteSettingsUpdateSchema>;
export type BackgroundPack = z.infer<typeof backgroundPackSchema>;

export const backgroundPackManifestSchema = z.object({
    name: z.string().min(1),
    version: z.string().min(1),
    entry: z.string().min(1).default('index.html'),
    interactive: z.boolean().optional().default(false),
    allowExternal: z.boolean().optional().default(false),
    controls: z
        .array(
            z.object({
                key: z.string().min(1),
                type: z.enum(['toggle', 'number', 'select', 'text', 'color']).optional(),
                label: z.string().min(1),
                default: z.unknown().optional(),
                min: z.number().optional(),
                max: z.number().optional(),
                step: z.number().optional(),
                options: z.array(z.string()).optional(),
                help: z.string().optional(),
            })
        )
        .optional()
        .default([]),
});