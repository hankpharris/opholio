export const DEFAULT_BASE_URL = "https://example.com";

export const DEFAULT_SITE_NAME = "Opholio";

export const DEFAULT_SITE_DESCRIPTION =
    "Opholio is an open source portfolio platform for launching customizable portfolio websites with dynamic content, project showcases, and optional AI features.";

export const DEFAULT_KEYWORDS = [
    "Opholio",
    "open source portfolio platform",
    "portfolio platform",
    "open source portfolio",
    "portfolio template",
    "projects",
    "developer portfolio",
    "customizable portfolio website",
    "case studies",
    "Next.js portfolio template",
] as const;

export function getBaseUrl() {
    return process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE_URL;
}
