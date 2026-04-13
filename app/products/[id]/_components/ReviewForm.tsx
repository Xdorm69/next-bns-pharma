"use client";

import { useState, useTransition } from "react";
import StarPicker from "./StarPicker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { deleteReview, submitReview } from "@/server/actions/review";

type Props = {
  productId: string;
  existingReview?: { rating: number; comment: string } | null;
};

export default function ReviewForm({ productId, existingReview }: Props) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!rating) return toast.error("Please select a rating");
    if (!comment.trim()) return toast.error("Please write a review");

    startTransition(async () => {
      try {
        await submitReview({ productId, rating, comment });
        toast.success(existingReview ? "Review updated!" : "Review submitted!");
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteReview(productId);
        setRating(0);
        setComment("");
        toast.success("Review deleted");
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className="space-y-4 p-5 border rounded-2xl bg-gray-50">
      <p className="font-semibold text-gray-700">
        {existingReview ? "Edit your review" : "Write a review"}
      </p>

      <StarPicker value={rating} onChange={setRating} />

      <Textarea
        placeholder="Share your experience with this product..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="resize-none bg-white"
      />

      <div className="flex gap-3">
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Saving..." : existingReview ? "Update" : "Submit"}
        </Button>
        {existingReview && (
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
