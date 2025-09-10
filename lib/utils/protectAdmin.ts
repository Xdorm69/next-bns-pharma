import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function ProtectAdmin() {
    const session = await getServerSession(authOptions);

    if (!session) {

      return redirect("/auth/login");
    }

    if (session.user.role !== "ADMIN") {

      return redirect("/");
    }
    return session;
}