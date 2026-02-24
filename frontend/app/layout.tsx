import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { getSiteSettingsWithActivePack } from "@/lib/site-settings";
import { getGithubProfileUrlFromAllowedUsers } from "@/lib/github-profile";
import { DEFAULT_KEYWORDS, DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_NAME, getBaseUrl } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });
const baseUrl = getBaseUrl();

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: DEFAULT_SITE_NAME,
        template: `%s | ${DEFAULT_SITE_NAME}`,
    },
    description: DEFAULT_SITE_DESCRIPTION,
    keywords: [...DEFAULT_KEYWORDS],
    creator: "Opholio",
    publisher: "Opholio",
    icons: {
        icon: [
            { url: "/Logo(Resized).png", sizes: "500x500", type: "image/png" },
        ],
        shortcut: "/Logo(Resized).png",
        apple: "/Logo(Resized).png",
    },
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: baseUrl,
        title: DEFAULT_SITE_NAME,
        description: DEFAULT_SITE_DESCRIPTION,
        siteName: DEFAULT_SITE_NAME,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { settings, activePack } = await getSiteSettingsWithActivePack();
    const allowedGithubUsersEnv = process.env["ALLOWED_GITHUB_USERS"];
    const githubProfileUrl = getGithubProfileUrlFromAllowedUsers(allowedGithubUsersEnv);
    const shouldShowGithubButton = settings.enableGithubButton !== false;
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": settings.siteTitle || DEFAULT_SITE_NAME,
        "description": settings.tagline || DEFAULT_SITE_DESCRIPTION,
        "url": baseUrl,
    };

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            </head>
            <body className={inter.className}>
                <BackgroundLayer
                    enabled={settings.enableBackground}
                    packId={activePack?.id ?? null}
                    entryUrl={activePack?.entryUrl ?? null}
                    interactive={activePack?.interactive ?? false}
                    config={settings.backgroundConfig as Record<string, unknown>}
                    quality={settings.backgroundQuality}
                    reducedMotionOverride={settings.reducedMotionOverride}
                />
                <div className="relative z-10">
                    <Header
                        siteTitle={settings.siteTitle}
                        logoUrl={settings.logoImageUrl ?? undefined}
                        showChatbot={settings.enableChatbot}
                        showContactForm={settings.enableContactForm}
                        showGithubButton={shouldShowGithubButton}
                        githubProfileUrl={githubProfileUrl}
                    />
                    <main className="pt-[88px]">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
} 
