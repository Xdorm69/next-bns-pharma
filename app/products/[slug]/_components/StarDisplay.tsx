type Props = {
  rating: number;
  size?: "sm" | "md" | "lg";
};

export default function StarDisplay({ rating, size = "md" }: Props) {
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-2xl" };

  return (
    <div className={`flex gap-0.5 ${sizes[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span
            key={star}
            className={
              filled
                ? "text-yellow-400"
                : half
                  ? "text-yellow-300"
                  : "text-gray-300"
            }
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
