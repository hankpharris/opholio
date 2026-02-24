import { getProjects } from '@/lib/db';
import type { Project } from '@/lib/validation';
import { ProjectCard } from '@/components/ProjectCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects",
    description: "Browse portfolio projects and case studies managed through Opholio, an open source platform for showcasing technical work.",
    alternates: {
        canonical: '/projects',
    },
    openGraph: {
        title: "Projects",
        description: "Browse portfolio projects and case studies managed through Opholio, an open source platform for showcasing technical work.",
    },
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    try {
        const projects = await getProjects();
        console.log('Fetched projects:', projects);

        if (!projects || projects.length === 0) {
            return (
                <main className="min-h-screen">
                    <div className="container mx-auto px-4 py-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold text-gray-900">No Projects Found</h1>
                            <p className="mt-2 text-gray-600">There are no projects to display at the moment.</p>
                        </div>
                    </div>
                </main>
            );
        }

        return (
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Projects</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                id={project.id.toString()}
                                title={project.name}
                                status={project.status}
                                overview={project.overviewText || ''}
                                description={project.description || ''}
                                overviewImage1={project.overviewImage1 || ''}
                                overviewImage2={project.overviewImage2 || ''}
                                overviewImage3={project.overviewImage3 || ''}
                                link={project.link || ''}
                                gitHubLink={project.gitHubLink || ''}
                            />
                        ))}
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error rendering ProjectsPage:', error);
        return (
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-red-500">
                        Error loading projects. Please try again later.
                    </div>
                </div>
            </main>
        );
    }
} 
