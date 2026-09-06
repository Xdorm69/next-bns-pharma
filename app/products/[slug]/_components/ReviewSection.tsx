import { getReviews, getUserReview } from "@/server/review";
import ReviewForm from "./ReviewForm";
import StarDisplay from "./StarDisplay";

type Props = {
  productId: string;
  userId?: string;
  userName?: string;
};

export default async function ReviewSection({ productId, userId }: Props) {
  const [reviews, userReview] = await Promise.all([
    getReviews(productId),
    userId ? getUserReview(productId, userId) : Promise.resolve(null),
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Reviews</h2>

      {/* Form — only if logged in */}
      {userId ? (
        <ReviewForm productId={productId} existingReview={userReview} />
      ) : (
        <p className="text-sm text-gray-500 p-4 border rounded-xl bg-gray-50">
          Please sign in to leave a review.
        </p>
      )}

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-white border rounded-2xl space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{review.userName}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <StarDisplay rating={review.rating} size="sm" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
