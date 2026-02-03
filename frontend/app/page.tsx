import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AboutContent } from "@/components/AboutContent";

export default function Home() {
    return (
        <div className="min-h-screen w-full flex flex-col relative">
            <AnimatedBackground />
            <div className="flex-grow flex items-center justify-center py-8">
                <AboutContent />
            </div>
        </div>
    );
}