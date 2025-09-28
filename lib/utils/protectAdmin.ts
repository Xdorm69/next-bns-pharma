import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

export async function ProtectAdmin() {
    const session = await getServerSession(authOptions);

    if (!session) {

      notFound();
    }

    if (session.user.role !== "ADMIN") {

      notFound();
    }
    return session;
}