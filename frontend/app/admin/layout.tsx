'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { SignOutButton } from "@/components/buttons/SignOutButton";

const tabs = [
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/backgrounds", label: "Backgrounds" },
    { href: "/admin/content", label: "Content" },
    { href: "/admin/features", label: "Features" },
    { href: "/admin/system", label: "System" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <SessionProvider>
            <div className="min-h-screen">
                <div className="border-b border-white/30 bg-white/30 backdrop-blur-md rounded-b-xl">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Admin</h1>
                            <p className="text-sm text-gray-600">
                                Manage projects, backgrounds, and site settings
                            </p>
                        </div>
                        <SignOutButton />
                    </div>
                    <div className="container mx-auto px-4 pb-4">
                        <nav className="flex flex-wrap gap-2">
                            {tabs.map((tab) => {
                                const isActive = pathname === tab.href;
                                return (
                                    <Link
                                        key={tab.href}
                                        href={tab.href}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-blue-600 text-white"
                                                : "bg-white/35 border border-white/20 text-gray-800 hover:bg-white/45"
                                        }`}
                                    >
                                        {tab.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-6">{children}</div>
            </div>
        </SessionProvider>
    );
}
