import { AboutContent } from "@/components/AboutContent";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about this portfolio site built with Opholio, an open source platform for customizable profile, project, and content pages.",
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: "About",
        description: "Learn about this portfolio site built with Opholio, an open source platform for customizable profile, project, and content pages.",
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
