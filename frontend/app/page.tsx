import { AboutContent } from "@/components/AboutContent";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function Home() {
    const settings = await getSiteSettings();
    return (
        <div className="h-[calc(100vh-88px)] w-full flex flex-col relative overflow-hidden">
            <div className="flex-grow flex items-start justify-center pt-6 md:pt-10">
                <AboutContent
                    title={settings.siteTitle}
                    tagline={settings.tagline}
                    aboutContent={settings.aboutContent}
                    avatarImageUrl={settings.avatarImageUrl}
                    avatarShape={settings.avatarShape}
                />
            </div>
        </div>
    );
}
