import { AutoDevBypass } from "./AutoDevBypass";

const isDevAuthBypassEnabled =
    process.env.NODE_ENV === "development" &&
    process.env.ENABLE_DEV_AUTH_BYPASS === "1" &&
    !process.env.VERCEL;

type SignInPageProps = {
    searchParams?: {
        error?: string;
    };
};

export default function SignIn({ searchParams }: SignInPageProps) {
    const error = searchParams?.error;
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

                    <a
                        href="/api/auth/signin/github?callbackUrl=%2Fadmin"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Sign in with GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}
