import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

// Extend the built-in session types
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"]
    }
}

// Security: Dev auth bypass should only be enabled in development environments
// All conditions must be met to prevent accidental production bypass:
// 1. NODE_ENV must be "development"
// 2. Explicit opt-in via ENABLE_DEV_AUTH_BYPASS environment variable
// 3. Not running on Vercel (VERCEL env var is auto-set by Vercel)
// Additionally, the authorize function validates these conditions at runtime
const isDevAuthBypassEnabled =
    process.env.NODE_ENV === "development" &&
    process.env.ENABLE_DEV_AUTH_BYPASS === "1" &&
    !process.env.VERCEL;

// Helper function to validate dev bypass is safe at runtime
const isDevBypassSafe = (): boolean => {
    // Re-check all conditions at runtime to prevent module-load-time bypass
    if (process.env.NODE_ENV !== "development") return false;
    if (process.env.ENABLE_DEV_AUTH_BYPASS !== "1") return false;
    if (process.env.VERCEL) return false; // VERCEL is auto-set by Vercel platform
    return true;
};

const useSecureCookies = process.env.NODE_ENV !== "development";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        ...(isDevAuthBypassEnabled
            ? [
                CredentialsProvider({
                    id: "dev-bypass",
                    name: "Dev Bypass (local)",
                    credentials: {},
                    async authorize() {
                        // Runtime validation: Ensure dev bypass is still safe
                        // This prevents bypass if environment is misconfigured at runtime
                        if (!isDevBypassSafe()) {
                            console.error(
                                "SECURITY: Dev auth bypass attempted but runtime conditions not met. " +
                                `NODE_ENV=${process.env.NODE_ENV}, ENABLE_DEV_AUTH_BYPASS=${process.env.ENABLE_DEV_AUTH_BYPASS}, VERCEL=${process.env.VERCEL}`
                            );
                            return null;
                        }
                        return {
                            id: "dev-admin",
                            name: "Local Dev Admin",
                            email: "local-dev-admin@local.dev",
                        };
                    },
                }),
            ]
            : []),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "github") {
                const response = await fetch("https://api.github.com/user", {
                    headers: {
                        Authorization: `token ${account.access_token}`,
                    },
                });
                const githubUser = await response.json();
                // Get the list of allowed users from env and split by comma
                const allowedUsers = process.env.ALLOWED_GITHUB_USERS?.split(',') || [];
                // Trim whitespace from each username and check if current user is allowed
                return allowedUsers.map(u => u.trim()).includes(githubUser.login);
            }
            if (account?.provider === "dev-bypass") {
                // Runtime validation: Double-check environment at sign-in time
                // This provides an additional security layer against misconfiguration
                const safe = isDevBypassSafe();
                if (!safe) {
                    console.error(
                        "SECURITY: Dev auth bypass sign-in attempted but runtime conditions not met. " +
                        `NODE_ENV=${process.env.NODE_ENV}, ENABLE_DEV_AUTH_BYPASS=${process.env.ENABLE_DEV_AUTH_BYPASS}, VERCEL=${process.env.VERCEL}`
                    );
                }
                return safe;
            }
            return false;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.role = "admin";
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session?.user) {
                session.user.role = token.role as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin",
    },
    debug: process.env.NODE_ENV === 'development',
    // Add support for multiple domains
    cookies: {
        sessionToken: {
            name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: useSecureCookies,
            }
        }
    }
}; 
