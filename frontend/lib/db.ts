import { neon } from '@neondatabase/serverless';
import { StatusEnum, projectSchema, Project } from './validation';

// Lazy database URL getter to avoid build-time errors
function getDatabaseUrl(): string {
    const url = process.env.DATABASE_URL;
    if (!url) {
        throw new Error(
            'Missing required environment variable: DATABASE_URL. ' +
            'Please check your .env file and ensure it is set.'
        );
    }
    return url;
}

interface ProjectQueryOptions {
    includeInactive?: boolean;
}

export async function getProject(id: string, options: ProjectQueryOptions = {}): Promise<Project | null> {
    try {
        console.log('Fetching project with ID:', id);
        const sql = neon(getDatabaseUrl());
        const includeInactive = options.includeInactive ?? false;
        const numericId = parseInt(id);
        if (Number.isNaN(numericId)) {
            console.warn('Invalid project id supplied to getProject:', id);
            return null;
        }

        const result = includeInactive
            ? await sql`
                SELECT 
                    id,
                    name,
                    status,
                    "overviewText",
                    description,
                    "overviewImage1",
                    "overviewImage2",
                    "overviewImage3",
                    link,
                    "gitHubLink",
                    "isActive"
                FROM "Project" 
                WHERE id = ${numericId}
            `
            : await sql`
                SELECT 
                    id,
                    name,
                    status,
                    "overviewText",
                    description,
                    "overviewImage1",
                    "overviewImage2",
                    "overviewImage3",
                    link,
                    "gitHubLink",
                    "isActive"
                FROM "Project" 
                WHERE id = ${numericId} AND "isActive" = true
            `;
        
        console.log('Query result:', result);
        
        if (!result || result.length === 0) {
            console.log('No project found with ID:', id);
            return null;
        }

        const project = result[0];
        console.log('Raw project data:', project);

        // Validate the project data
        const validatedProject = projectSchema.parse(project);
        console.log('Validated project:', validatedProject);

        return validatedProject;
    } catch (error) {
        console.error('Error in getProject:', error);
        return null;
    }
}

export async function getProjects(options: ProjectQueryOptions = {}): Promise<Project[]> {
    try {
        console.log('Fetching all projects');
        const sql = neon(getDatabaseUrl());
        const includeInactive = options.includeInactive ?? false;
        const result = includeInactive
            ? await sql`
                SELECT 
                    id,
                    name,
                    status,
                    "overviewText",
                    description,
                    "overviewImage1",
                    "overviewImage2",
                    "overviewImage3",
                    link,
                    "gitHubLink",
                    "isActive"
                FROM "Project" 
                ORDER BY id ASC
            `
            : await sql`
                SELECT 
                    id,
                    name,
                    status,
                    "overviewText",
                    description,
                    "overviewImage1",
                    "overviewImage2",
                    "overviewImage3",
                    link,
                    "gitHubLink",
                    "isActive"
                FROM "Project" 
                WHERE "isActive" = true
                ORDER BY id ASC
            `;
        
        console.log('Query result:', result);
        
        if (!result || result.length === 0) {
            console.log('No projects found');
            return [];
        }

        // Validate each project
        const validatedProjects = result
            .map(project => {
                try {
                    return projectSchema.parse(project);
                } catch (error) {
                    console.error('Error validating project:', project, error);
                    return null;
                }
            })
            .filter((project): project is Project => project !== null);

        console.log('Validated projects:', validatedProjects);
        return validatedProjects;
    } catch (error) {
        console.error('Error in getProjects:', error);
        return [];
    }
}

export async function updateProject(id: number, data: Partial<Project>) {
    const sql = neon(getDatabaseUrl());
    const projects = await sql`
        UPDATE "Project"
        SET 
            name = ${data.name},
            status = ${data.status},
            "overviewText" = ${data.overviewText},
            description = ${data.description},
            "overviewImage1" = ${data.overviewImage1},
            "overviewImage2" = ${data.overviewImage2},
            "overviewImage3" = ${data.overviewImage3},
            link = ${data.link},
            "gitHubLink" = ${data.gitHubLink},
            "isActive" = ${data.isActive}
        WHERE id = ${id}
        RETURNING id, name, status, "overviewText", description, "overviewImage1", "overviewImage2", "overviewImage3", link, "gitHubLink", "isActive"
    `;

    if (!projects || projects.length === 0) {
        throw new Error('Project not found');
    }

    const project = projects[0];
    const validationResult = projectSchema.safeParse(project);
    
    if (!validationResult.success) {
        console.warn('Project validation failed:', validationResult.error);
        throw new Error('Invalid project data');
    }

    return validationResult.data;
} 