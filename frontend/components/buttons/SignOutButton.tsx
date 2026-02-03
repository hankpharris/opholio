'use client';

import { signOut } from "next-auth/react";
import { Button } from "./Button";

export function SignOutButton() {
    return (
        <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            variant="nav"
            href="#"
        >
            Sign Out
        </Button>
    );
} 