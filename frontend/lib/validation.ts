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