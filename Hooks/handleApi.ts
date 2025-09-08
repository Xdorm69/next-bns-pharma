import { toast } from "sonner";
import { fetchApi } from "./api";


export async function handleApi<T>(
  url: string,
  options: RequestInit = {},
  successMessage?: string
): Promise<T | T[] | null> {
  try {
    const dataJson = await fetchApi<T>(url, options);

    toast.success(dataJson.message || successMessage || "Success");
    return dataJson.data ?? null;
  } catch (error: any) {
    toast.error(error.message || "Something went wrong");
    return null;
  }
}
