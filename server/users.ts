"use server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/types/actions";
import { User, userRole } from "@prisma/client";

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
}: getUserProps): Promise<ActionResponse<User[]>> {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const users = await prisma.user.findMany({
      skip,
      take,
    });

    return { success: true, data: users};
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch users",
    };
  }
}

export async function updateUserRole(
  id: string,
  role: userRole,
): Promise<ActionResponse<User>> {
  const isAdminUser = await isAdmin();

  if (!isAdminUser) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return { success: true, data: user };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update user role",
    };
  }
}

export async function deleteUser(
  id: string,
): Promise<ActionResponse<User>> {
  const isAdminUser = await isAdmin();

  if (!isAdminUser) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  try {
    const user = await prisma.user.delete({
      where: { id },
    });

    return { success: true, data: user };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update user role",
    };
  }
}
