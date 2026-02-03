import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function getAdminSession() {
    return getServerSession(authOptions);
}
