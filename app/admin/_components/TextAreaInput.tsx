"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextAreaInput({
  label,
  name,
  error,
}: {
  label: string;
  name: string;
  error?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea name={name} className={error ? "border-red-500" : ""} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
