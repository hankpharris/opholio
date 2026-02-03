import { Project } from './validation';

function getBaseUrl() {
    if (typeof window !== 'undefined') {
        // Browser should use relative path
        return '';
    }
    
    // Server should use absolute URL
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
}

export async function getProject(id: string): Promise<Project | null> {
    try {
        const baseUrl = getBaseUrl();
        const url = `${baseUrl}/api/projects/${id}`;
        console.log('Fetching project with ID:', id, 'from:', url);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!res.ok) {
            if (res.status === 404) {
                return null;
            }
            const errorText = await res.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to fetch project: ${res.status} - ${errorText}`);
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
}

export async function getProjects(): Promise<Project[]> {
    try {
        const baseUrl = getBaseUrl();
        const url = `${baseUrl}/api/projects`;
        console.log('Fetching from:', url);
        
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to fetch projects: ${res.status} - ${errorText}`);
        }
        
        const data = await res.json();
        const projects = Array.isArray(data)
            ? data
            : Array.isArray(data?.projects)
                ? data.projects
                : [];

        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
} 