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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
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
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
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