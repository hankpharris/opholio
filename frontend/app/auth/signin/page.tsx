'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleGitHubSignIn = async () => {
        try {
            const res = await signIn("github", {
                callbackUrl: "/admin",
                redirect: false,
            });

            if (res?.error) {
                console.error('Sign in error:', res.error);
                setError(`Failed to sign in with GitHub: ${res.error}`);
            } else if (res?.url) {
                router.push(res.url);
            }
        } catch (error) {
            console.error('Sign in error:', error);
            setError("An error occurred during sign in");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to Admin Panel
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGitHubSignIn}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Sign in with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
} 