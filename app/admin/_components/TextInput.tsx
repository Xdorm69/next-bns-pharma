"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TextInput({
  label,
  name,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        name={name}
        placeholder={placeholder || ""}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
