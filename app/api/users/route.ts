import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { success: false, error: "User is not authenticated" },
      { status: 400 }
    );

  const isAdmin = session.user.role === "ADMIN";
  if (!isAdmin)
    return NextResponse.json(
      { success: false, error: "User is forbidden" },
      { status: 403 }
    );

  try {
    const searchParams = new URL(request.url).searchParams;
    const role = searchParams.get("role");
    const subscribed = searchParams.get("subscribed");
    const provider = searchParams.get("provider");
    const search = searchParams.get("search");
    const take = Number(searchParams.get("take")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;

    const users = await prisma.user.findMany({
      where: {
        id: { not: session.user.id },
        ...(role && { role: role as "ADMIN" | "USER" }),
        ...(subscribed && { subscribed: subscribed === "true" }),
        ...(provider && { provider: provider as "email" | "google" }),
        OR: [
          { name: { contains: search as string, mode: "insensitive" } },
          { email: { contains: search as string, mode: "insensitive" } },
        ],
      },
      take,
      skip,
    });
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}
