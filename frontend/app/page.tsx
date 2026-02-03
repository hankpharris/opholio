import { AboutContent } from "@/components/AboutContent";
import { getSiteSettings } from "@/lib/site-settings";

export default async function Home() {
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