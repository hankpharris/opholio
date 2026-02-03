import { Button } from "@/components/buttons/Button";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col relative">
            <div className="flex-grow flex items-center justify-center">
                <div className="container mx-auto px-4 py-8 bg-white/30 rounded-xl shadow-lg backdrop-blur-md relative z-10 text-center">
                    <div className="text-8xl mb-6">🔍</div>
                    <h1 className="text-6xl font-bold mb-4 text-black drop-shadow-lg">404</h1>
                    <h2 className="text-3xl mb-6 text-black">Page Not Found</h2>
                    <p className="text-xl mb-8 text-black max-w-2xl mx-auto">
                        The page you're looking for might have been moved, deleted, or never existed.
                    </p>
                    <Button href="/projects" variant="nav">
                        Return to Projects
                    </Button>
                </div>
            </div>
        </div>
    );
} 