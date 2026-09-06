import { prisma } from "@/lib/prisma";
import { User, userRole } from "@prisma/client";

export type UserListParams = {
  skip?: number;
  take?: number;
};

export async function listUsers({
  skip,
  take,
}: UserListParams): Promise<User[]> {
  return prisma.user.findMany({ skip, take });
}

export async function setUserRole(
  id: string,
  role: userRole,
): Promise<User> {
  return prisma.user.update({ where: { id }, data: { role } });
}

export async function removeUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}

export async function countUsers(): Promise<number> {
  return prisma.user.count();
}
