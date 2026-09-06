"use server";
import { prisma } from "@/lib/prisma";
import { withAdminAuth } from "@/lib/auth/withAdminAuth";
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

export const getUsers = withAdminAuth(
  async ({
    skip,
    take,
  }: getUserProps): Promise<ActionResponse<User[]>> => {
    const users = await prisma.user.findMany({
      skip,
      take,
    });

    return { success: true, data: users };
  },
);

export const updateUserRole = withAdminAuth(
  async (id: string, role: userRole): Promise<ActionResponse<User>> => {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return { success: true, data: user };
  },
);

export const deleteUser = withAdminAuth(
  async (id: string): Promise<ActionResponse<User>> => {
    const user = await prisma.user.delete({
      where: { id },
    });

    return { success: true, data: user };
  },
);
