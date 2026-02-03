import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProjectOverview } from '@/components/ProjectOverview';
import { getProject } from '@/lib/db';
import { Status } from '@/lib/validation';
import type { Metadata } from 'next';

interface PageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const project = await getProject(params.id);
    
    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.',
        };
    }

    return {
        title: project.name,
        description: project.overviewText || project.description || `View details about ${project.name} project.`,
        alternates: {
            canonical: `/projects/${params.id}`,
        },
        openGraph: {
            title: project.name,
            description: project.overviewText || project.description || `View details about ${project.name} project.`,
        },
    };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProjectPage({ params }: PageProps) {
    try {
        const project = await getProject(params.id);

        if (!project) {
            console.log('Project not found:', params.id);
            notFound();
        }

        // Format the data to match ProjectOverview props
        const formattedData = {
            title: project.name,
            status: project.status as Status,
            overview: project.overviewText || '',
            description: project.description || '',
            overviewImage1: project.overviewImage1 || '',
            overviewImage2: project.overviewImage2 || '',
            overviewImage3: project.overviewImage3 || '',
            link: project.link,
            gitHubLink: project.gitHubLink
        };

        return (
            <div className="min-h-screen relative">
                <div className="relative z-10 container mx-auto px-4 md:px-16 py-8 md:py-8 pt-[120px] md:pt-8">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProjectOverview {...formattedData} />
                    </Suspense>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading project:', error);
        notFound();
    }
} 