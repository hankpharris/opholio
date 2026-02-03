import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AboutContent } from "@/components/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Me",
    description: "Learn more about Henry Pharris, as well as the services and skills he offers; a senior at Worcester Polytechnic Institute studying Robotics Engineering with minors in Computer Science and Music.",
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: "About Me",
        description: "Learn more about Henry Pharris, as well as the services and skills he offers; a senior at Worcester Polytechnic Institute studying Robotics Engineering with minors in Computer Science and Music.",
    },
};

export default function AboutMe() {
    return (
        <div className="min-h-screen w-full flex flex-col relative">
            <AnimatedBackground />
            <div className="flex-grow flex items-center justify-center py-8">
                <AboutContent />
            </div>
        </div>
    );
} 