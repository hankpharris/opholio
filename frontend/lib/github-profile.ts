export function getGithubProfileUrlFromAllowedUsers(allowedUsersEnv: string | undefined): string | undefined {
    const firstEntry = (allowedUsersEnv ?? "")
        .split(",")
        .map((value) => value.trim())
        .find(Boolean);

    if (!firstEntry) return undefined;

    const cleanedEntry = firstEntry
        .replace(/^['"]|['"]$/g, "")
        .replace(/^@/, "");

    // Handle accidental "KEY=value" formatting from dashboard copy/paste.
    const withoutAssignment = cleanedEntry.includes("=")
        ? cleanedEntry.slice(cleanedEntry.lastIndexOf("=") + 1).trim()
        : cleanedEntry;

    if (!withoutAssignment) return undefined;

    if (withoutAssignment.startsWith("http://") || withoutAssignment.startsWith("https://")) {
        const pathSegment = withoutAssignment
            .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
            .split("/")
            .map((value) => value.trim())
            .find(Boolean);
        return pathSegment ? `https://github.com/${pathSegment.replace(/^@/, "")}` : undefined;
    }

    return `https://github.com/${withoutAssignment}`;
}
