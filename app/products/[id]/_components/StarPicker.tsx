"use client";

import { useState } from "react";

type Props = {
  value: number;
  onChange: (rating: number) => void;
};

export default function StarPicker({ value, onChange }: Props) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-3xl transition-colors"
        >
          <span
            className={
              (hovered || value) >= star ? "text-yellow-400" : "text-gray-300"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
