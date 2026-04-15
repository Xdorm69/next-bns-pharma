import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

interface getUserProps {
  search?: string;
  role?: string;
  subscribed?: string;
  provider?: string;
  page?: number;
  take?: number;
  skip?: number;
}

export async function getUsers({
  search,
  role,
  subscribed,
  provider,
  page,
  take,
  skip,
}: getUserProps): Promise<{
  success: boolean;
  users?: User[];
  error?: string;
}> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role) {
      throw new Error("Unauthorized");
    }
    if (session.user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    
    const users = await prisma.user.findMany({
      skip,
      take,
    });

    return { success: true, users };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch users",
    };
  }
}
