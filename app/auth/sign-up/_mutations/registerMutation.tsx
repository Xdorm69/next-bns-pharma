"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFetch } from "@/Hooks/api";
import { User } from "@prisma/client";

type SignupDataType = {
  name: string;
  email: string;
  password: string;
};

export function useRegisterMutation() {
  return useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (formData: SignupDataType): Promise<User> => {
      const res = await useFetch<User>("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      return res.data as User;
    },
    onMutate: () => {
      toast.loading("Registering user...", { id: "user" });
    },
    onSuccess: (data) => {
      toast.success(`Welcome, ${data.name}!`, { id: "user" });
    },
    onError: (error: any) => {
      toast.error(error.message || "User registration failed", { id: "user" });
    },
  });
}
