"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchApi } from "@/Hooks/api";

//HOW resultant data will come from api
export type UserResponse = {
  id: string;
  name: string;
  email: string;
};

type SignupDataType = {
  name: string;
  email: string;
  password: string;
};

export function useRegisterMutation() {
  return useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (formData: SignupDataType): Promise<UserResponse> => {
      const res = await fetchApi<UserResponse>("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      return res.data as UserResponse;
    },
    onMutate: () => {
      toast.loading("Registering user...", { id: "user" });
    },
    onSuccess: (data) => {
      toast.success(`Welcome, ${data.name}!`, { id: "user" });
    },
    onError: (error: {message?: string}) => {
      toast.error(error.message || "User registration failed", { id: "user" });
    },
  });
}
