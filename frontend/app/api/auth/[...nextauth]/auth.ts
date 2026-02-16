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

const isDevAuthBypassEnabled =
    process.env.NODE_ENV === "development" &&
    process.env.ENABLE_DEV_AUTH_BYPASS === "1" &&
    !process.env.VERCEL;

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
                return isDevAuthBypassEnabled;
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
