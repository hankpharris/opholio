'use client';

import Link from 'next/link';
import { Button } from './buttons/Button';
import { ContactForm } from './ContactForm';
import { ChatBot } from './ChatBot';

interface HeaderProps {
    siteTitle?: string;
    logoUrl?: string;
    showChatbot?: boolean;
    showContactForm?: boolean;
    showGithubButton?: boolean;
    githubProfileUrl?: string;
}

export function Header({
    siteTitle = "Portfolio",
    logoUrl = "/LogoNoBG.png",
    showChatbot = true,
    showContactForm = true,
    showGithubButton = true,
    githubProfileUrl,
}: HeaderProps) {
    const resolvedLogoUrl = logoUrl || "/LogoNoBG.png";
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md shadow-lg">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                    <Link href="/" className="flex items-center space-x-2">
                        <img
                            src={resolvedLogoUrl}
                            alt="Portfolio Logo"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="text-2xl font-bold text-gray-800">{siteTitle}</span>
                    </Link>
                    <div className="flex flex-wrap gap-2 md:space-x-4">
                        <Button href="/about" variant="nav">
                            About Me
                        </Button>
                        <Button href="/projects" variant="nav">
                            Projects
                        </Button>
                        {showGithubButton && githubProfileUrl && (
                            <Button href={githubProfileUrl} variant="nav" isExternal>
                                GitHub
                            </Button>
                        )}
                        {showContactForm && <ContactForm />}
                        {showChatbot && <ChatBot />}
                    </div>
                </div>
            </nav>
        </header>
    );
} 