import Image from 'next/image';
import { Button } from './buttons/Button';
import { StatusBadge } from './StatusBadge';
import { Status } from '@/lib/validation';

interface ProjectOverviewProps {
    title: string;
    status: Status;
    overview: string;
    description: string;
    overviewImage1: string;
    overviewImage2: string;
    overviewImage3: string;
    link?: string | null;
    gitHubLink?: string | null;
}

export function ProjectOverview({
    title,
    status,
    overview,
    description,
    overviewImage1,
    overviewImage2,
    overviewImage3,
    link,
    gitHubLink,
}: ProjectOverviewProps) {
    // Split overview text into paragraphs
    const paragraphs = overview.split('\n\n').filter(p => p.trim());

    // Helper function to get image src
    const getImageSrc = (src: string) => {
        // If it's a full URL (starts with http), use it as is
        if (src.startsWith('http')) {
            return src;
        }
        // Otherwise, treat it as a local path
        return `/${src}`;
    };

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
                {/* Header section with title and status */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                        <StatusBadge status={status} />
                    </div>
                    <div className="flex gap-4 justify-start">
                        {link && (
                            <Button href={link} variant="project" isExternal>
                                View Project
                            </Button>
                        )}
                        {gitHubLink && (
                            <Button href={gitHubLink} variant="github" isExternal>
                                GitHub
                            </Button>
                        )}
                    </div>
                </div>

                {/* Main content area */}
                <div className="space-y-8">
                    {/* First image and first paragraph */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        {overviewImage1 && (
                            <div className="relative h-[400px] overflow-hidden">
                                <Image
                                    src={getImageSrc(overviewImage1)}
                                    alt={`${title} overview`}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                        )}
                        {paragraphs[0] && (
                            <div className="prose max-w-none w-full">
                                <p className="text-lg text-gray-900">{paragraphs[0]}</p>
                            </div>
                        )}
                    </div>

                    {/* Second image and second paragraph */}
                    {overviewImage2 && paragraphs[1] && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                            <div className="relative h-[400px] overflow-hidden">
                                <Image
                                    src={getImageSrc(overviewImage2)}
                                    alt={`${title} overview 2`}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="prose max-w-none">
                                <p className="text-lg text-gray-900">{paragraphs[1]}</p>
                            </div>
                        </div>
                    )}

                    {/* Third image and third paragraph */}
                    {overviewImage3 && paragraphs[2] && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                            <div className="relative h-[400px] overflow-hidden">
                                <Image
                                    src={getImageSrc(overviewImage3)}
                                    alt={`${title} overview 3`}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="prose max-w-none">
                                <p className="text-lg text-gray-900">{paragraphs[2]}</p>
                            </div>
                        </div>
                    )}

                    {/* Any remaining paragraphs */}
                    {paragraphs.slice(3).map((paragraph, index) => (
                        <div key={index} className="prose max-w-none">
                            <p className="text-lg text-gray-900">{paragraph}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 