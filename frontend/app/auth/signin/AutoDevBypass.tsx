'use client';

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export function AutoDevBypass() {
    useEffect(() => {
        void signIn("dev-bypass", { callbackUrl: "/admin" });
    }, []);

    return null;
}
