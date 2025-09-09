import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function loginMutation() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await signIn("credentials", {
        redirect: false, // we'll control navigation manually
        email,
        password,
      });

      if (res?.error) {
        throw new Error(res.error);
      }
      return res;
    },
    onMutate: () => {
      toast.loading("Logging in...", { id: "login" });
    },
    onSuccess: () => {
      toast.success("Login successful", { id: "login" });
      redirect("/dashboard");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Login failed", { id: "login" });
    },
  });
}
