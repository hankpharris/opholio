import { DefaultSession, NextAuthOptions } from "next-auth";
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

// Helper function to ensure proper URL construction
const getCallbackUrl = (baseUrl: string, provider: string) => {
    // Remove trailing slash from base URL if it exists
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    return `${cleanBaseUrl}/api/auth/callback/${provider}`;
};

// Log the callback URLs for debugging
console.log('Vercel callback URL:', getCallbackUrl(process.env.NEXTAUTH_URL_INTERNAL!, 'github-vercel'));
console.log('Personal callback URL:', getCallbackUrl(process.env.NEXTAUTH_URL!, 'github-personal'));

export const authOptions: NextAuthOptions = {
    providers: [
        // Vercel domain provider
        GithubProvider({
            id: 'github-vercel',
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            authorization: {
                params: {
                    redirect_uri: getCallbackUrl(process.env.NEXTAUTH_URL_INTERNAL!, 'github-vercel')
                }
            }
        }),
        // Personal domain provider
        GithubProvider({
            id: 'github-personal',
            clientId: process.env.GITHUB_ID_PERSONAL!,
            clientSecret: process.env.GITHUB_SECRET_PERSONAL!,
            authorization: {
                params: {
                    redirect_uri: getCallbackUrl(process.env.NEXTAUTH_URL!, 'github-personal')
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            console.log('Sign in attempt with provider:', account?.provider);
            console.log('Callback URL:', account?.redirect_uri);
            
            if (account?.provider === "github-vercel" || account?.provider === "github-personal") {
                const response = await fetch("https://api.github.com/user", {
                    headers: {
                        Authorization: `token ${account.access_token}`,
                    },
                });
                const githubUser = await response.json();
                // Get the list of allowed users from env and split by comma
                const allowedUsers = process.env.ALLOWED_GITHUB_USERS?.split(',') || [];
                // Trim whitespace from each username and check if current user is allowed
                return allowedUsers.map(user => user.trim()).includes(githubUser.login);
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
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            }
        }
    }
}; 
