import { imagekit } from "@/lib/imagekit";

export type UploadedImage = {
  url: string;
  fileId: string;
};

/**
 * Uploads a base64-encoded image to ImageKit under /products.
 * Throws on failure — callers should let this bubble up rather than
 * swallow it, since a product with no image is a bigger problem than
 * a failed create.
 */
export async function uploadProductImage(
  base64Image: string,
  productName: string,
): Promise<UploadedImage> {
  try {
    const response = await imagekit.upload({
      file: base64Image,
      fileName: `${productName}-${Date.now()}.jpg`,
      folder: "/products",
    });

    return { url: response.url, fileId: response.fileId };
  } catch (err) {
    console.error("Image upload error:", err);
    throw new Error("Image upload failed");
  }
}

/**
 * Best-effort cleanup for an image that was uploaded but whose associated
 * DB write failed. Never throws — a cleanup failure shouldn't mask the
 * original error that triggered it, it just means a stray file needs
 * manual cleanup in the ImageKit dashboard.
 */
export async function deleteProductImage(fileId: string): Promise<void> {
  try {
    await imagekit.deleteFile(fileId);
  } catch (err) {
    console.error(
      `Failed to clean up orphaned image (fileId: ${fileId}):`,
      err,
    );
  }
}
