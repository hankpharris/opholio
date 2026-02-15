export function getGithubProfileUrlFromAllowedUsers(allowedUsersEnv: string | undefined): string | undefined {
    const firstEntry = (allowedUsersEnv ?? "")
        .split(",")
        .map((value) => value.trim())
        .find(Boolean);

    if (!firstEntry) return undefined;

    const cleanedEntry = firstEntry
        .replace(/^['"]|['"]$/g, "")
        .replace(/^@/, "");

    if (cleanedEntry.startsWith("http://") || cleanedEntry.startsWith("https://")) {
        const pathSegment = cleanedEntry
            .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
            .split("/")
            .map((value) => value.trim())
            .find(Boolean);
        return pathSegment ? `https://github.com/${pathSegment.replace(/^@/, "")}` : undefined;
    }

    return `https://github.com/${cleanedEntry}`;
}
