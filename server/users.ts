"use server";
import { withAdminAuth } from "@/lib/auth/withAdminAuth";
import * as userService from "@/lib/services/users";
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
    const users = await userService.listUsers({ skip, take });
    return { success: true, data: users };
  },
);

export const updateUserRole = withAdminAuth(
  async (id: string, role: userRole): Promise<ActionResponse<User>> => {
    const user = await userService.setUserRole(id, role);
    return { success: true, data: user };
  },
);

export const deleteUser = withAdminAuth(
  async (id: string): Promise<ActionResponse<User>> => {
    const user = await userService.removeUser(id);
    return { success: true, data: user };
  },
);
