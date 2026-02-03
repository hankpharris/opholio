import Link from 'next/link';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Button } from '@/components/buttons/Button';

export default function ProjectNotFound() {
    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-bold text-gray-800">Project Not Found</h1>
                    <p className="text-lg text-gray-600">The project you're looking for doesn't exist.</p>
                    <div className="mt-8">
                        <Button href="/projects" variant="project">
                            Back to Projects
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 