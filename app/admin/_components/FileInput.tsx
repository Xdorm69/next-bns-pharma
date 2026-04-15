"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FileInput({
  name,
  error,
  onChange,
}: {
  name: string;
  error?: string;
  onChange: (file: File | null) => void;
}) {
  return (
    <div>
      <Label>Product Image</Label>
      <Input
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
