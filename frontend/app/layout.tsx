import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://henry-pharris.it.com';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: "Henry Pharris - Robotics, Software, and AI Engineer",
        template: "%s | Henry Pharris - Robotics, Software, and AI Engineer",
    },
    description: "Henry Pharris is a robotics engineering student at Worcester Polytechnic Institute, based in Midcoast Maine. Specializing in robotics, computer science, and software development. View my projects and get in touch.",
    keywords: ["Henry Pharris", "portfolio", "robotics engineering", "computer science", "music", "projects", "developer", "WPI", "Worcester Polytechnic Institute", "software engineer", "robotics engineer", "software engineer midcoast maine", "software engineer maine", "developer midcoast", "robotics engineer maine", "WPI graduate maine"],
    authors: [{ name: "Henry Pharris" }],
    creator: "Henry Pharris",
    publisher: "Henry Pharris",
    icons: {
        icon: [
            { url: '/Logo(Resized).png', sizes: '500x500', type: 'image/png' },
        ],
        shortcut: '/Logo(Resized).png',
        apple: '/Logo(Resized).png',
    },
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: baseUrl,
        title: "Henry Pharris - Robotics, Software, and AI Engineer",
        description: "Henry Pharris is a software engineer and robotics engineering student at Worcester Polytechnic Institute, based in Midcoast Maine. Specializing in robotics, computer science, and software development. View my projects and get in touch.",
        siteName: "Henry Pharris - Robotics, Software, and AI Engineer",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Henry Pharris",
        "jobTitle": "Robotics, Software, and AI Engineer",
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Worcester Polytechnic Institute"
        },
        "knowsAbout": ["Robotics Engineering", "Computer Science", "Software Development"],
        "address": {
            "@type": "PostalAddress",
            "addressRegion": "Maine",
            "addressCountry": "US"
        },
        "url": baseUrl,
        "sameAs": [
            // Add your LinkedIn, GitHub, etc. here
        ]
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
                <AnimatedBackground />
                <Header />
                <main className="pt-[88px]">
                    {children}
                </main>
            </body>
        </html>
    );
} 