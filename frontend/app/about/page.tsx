import { AboutContent } from "@/components/AboutContent";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

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

export default async function AboutMe() {
    const settings = await getSiteSettings();
    return (
        <div className="min-h-screen w-full flex flex-col relative">
            <div className="flex-grow flex items-center justify-center py-8">
                <AboutContent
                    title={settings.siteTitle}
                    tagline={settings.tagline}
                    aboutContent={settings.aboutContent}
                    avatarImageUrl={settings.avatarImageUrl}
                />
            </div>
        </div>
    );
} 
