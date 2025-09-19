"use client"

import { fetchApi } from "@/Hooks/api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

type ContactData = {
    name: string;
    email: string;
    message: string;
}

export function ContactMutation() {
  return useMutation({
    mutationKey: ["contact"],
    mutationFn: async (data: ContactData) =>
      await fetchApi<ContactData>("/api/testimonials", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onMutate: () => {
      toast.loading("Sending testimonial", { id: "test" });
    },
    onSuccess: () => {
      toast.success("Testimonial sent successfully", { id: "test" });
    },
    onError: (error: { error: string }) => {
      toast.error(error.error || "Failed to send testimonial", { id: "test" });
    },
  });
}
