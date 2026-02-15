import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getGithubProfileUrlFromAllowedUsers } from "./github-profile";

describe("getGithubProfileUrlFromAllowedUsers", () => {
    it("parses a plain username env value", () => {
        assert.equal(getGithubProfileUrlFromAllowedUsers("hankpharris"), "https://github.com/hankpharris");
    });

    it("parses quoted usernames", () => {
        assert.equal(getGithubProfileUrlFromAllowedUsers('"hankpharris"'), "https://github.com/hankpharris");
        assert.equal(getGithubProfileUrlFromAllowedUsers("'hankpharris'"), "https://github.com/hankpharris");
    });

    it("parses assignment-form values", () => {
        assert.equal(
            getGithubProfileUrlFromAllowedUsers("ALLOWED_GITHUB_USERS=hankpharris"),
            "https://github.com/hankpharris"
        );
    });

    it("parses at-prefixed usernames", () => {
        assert.equal(getGithubProfileUrlFromAllowedUsers("@hankpharris"), "https://github.com/hankpharris");
    });

    it("parses full github profile urls", () => {
        assert.equal(
            getGithubProfileUrlFromAllowedUsers("https://github.com/hankpharris"),
            "https://github.com/hankpharris"
        );
    });

    it("uses first username in a comma-separated list", () => {
        assert.equal(
            getGithubProfileUrlFromAllowedUsers("hankpharris, anotheruser"),
            "https://github.com/hankpharris"
        );
    });

    it("returns undefined for empty input", () => {
        assert.equal(getGithubProfileUrlFromAllowedUsers(undefined), undefined);
        assert.equal(getGithubProfileUrlFromAllowedUsers(""), undefined);
        assert.equal(getGithubProfileUrlFromAllowedUsers(" , "), undefined);
    });

    it("resolves the repo env value to hankpharris profile url", () => {
        const thisDir = dirname(fileURLToPath(import.meta.url));
        const envFile = readFileSync(resolve(thisDir, "../../.env.local"), "utf8");
        const match = envFile.match(/^ALLOWED_GITHUB_USERS=(.+)$/m);
        const rawEnvValue = match?.[1];

        assert.ok(rawEnvValue, "ALLOWED_GITHUB_USERS must be set in .env.local");
        assert.equal(getGithubProfileUrlFromAllowedUsers(rawEnvValue), "https://github.com/hankpharris");
    });
});
