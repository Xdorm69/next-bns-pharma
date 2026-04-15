"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextAreaInput({
  label,
  name,
  error,
  placeholder,
  rows,
}: {
  label: string;
  name: string;
  error?: string;
  placeholder: string;
  rows: number;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea name={name} placeholder={placeholder || ""} rows={rows as number || 1} className={error ? "border-red-500" : ""} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
