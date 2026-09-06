import { isAdmin } from "@/lib/auth";
import { ActionResponse } from "@/types/actions";

/**
 * Wraps a server action so that:
 *  1. It only runs if the current session belongs to an ADMIN.
 *  2. Any thrown error is caught and turned into a normal ActionResponse
 *     instead of an unhandled rejection reaching the client.
 *
 * The wrapped action must already return ActionResponse<T> — this keeps
 * every admin action returning the exact same shape, so callers never
 * need to special-case "what does this one return on failure".
 *
 * Usage:
 *   export const deleteProduct = withAdminAuth(async (id: string) => {
 *     const product = await prisma.product.delete({ where: { id } });
 *     return { success: true, data: product };
 *   });
 */
export function withAdminAuth<Args extends unknown[], T>(
  action: (...args: Args) => Promise<ActionResponse<T>>,
): (...args: Args) => Promise<ActionResponse<T>> {
  return async (...args: Args): Promise<ActionResponse<T>> => {
    const isAdminUser = await isAdmin();

    if (!isAdminUser) {
      return { success: false, error: "Unauthorized" };
    }

    try {
      return await action(...args);
    } catch (error) {
      console.error("withAdminAuth: action threw", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  };
}
