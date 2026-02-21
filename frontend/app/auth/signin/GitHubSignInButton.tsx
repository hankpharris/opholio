"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function GitHubSignInButton() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <button
            type="button"
            onClick={async () => {
                if (isSubmitting) return;
                setIsSubmitting(true);
                await signIn("github", { callbackUrl: "/admin" });
            }}
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {isSubmitting ? "Redirecting..." : "Sign in with GitHub"}
        </button>
    );
}
