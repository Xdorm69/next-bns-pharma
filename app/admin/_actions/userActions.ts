"use server";

import { updateUserRole, deleteUser } from "@/server/users";
import { revalidatePath } from "next/cache";

export async function changeUserRoleAction(id: string, role: "ADMIN" | "USER") {
  await updateUserRole(id, role);
  revalidatePath("/admin/users");
}

export async function deleteUserAction(id: string) {
  await deleteUser(id);
  revalidatePath("/admin/users");
}
