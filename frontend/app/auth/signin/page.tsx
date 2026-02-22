import { AutoDevBypass } from "./AutoDevBypass";
import { GitHubSignInButton } from "./GitHubSignInButton";

const isDevAuthBypassEnabled =
    process.env.NODE_ENV === "development" &&
    process.env.ENABLE_DEV_AUTH_BYPASS === "1" &&
    !process.env.VERCEL;

type SignInPageProps = {
    searchParams: Promise<{ error?: string }>;
};

export default async function SignIn({ searchParams }: SignInPageProps) {
    const { error } = await searchParams;
    const shouldAutoBypass = isDevAuthBypassEnabled && !error;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            {shouldAutoBypass && <AutoDevBypass />}
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to Admin Panel
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            Failed to sign in with GitHub: {error}
                        </div>
                    )}

                    <GitHubSignInButton />
                </div>
            </div>
        </div>
    );
}
