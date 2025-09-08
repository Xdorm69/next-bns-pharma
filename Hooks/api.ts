import { toast } from "sonner";

export type ApiResponse<T> = {
  success: boolean;
  data?: T | T[];
  error?: string;
  message?: string;
};

export async function useFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const res = await fetch(url, options);
  const data = (await res.json()) as ApiResponse<T>;

  if (!res.ok || !data.success) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}
