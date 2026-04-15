"use client";

import { useState, useEffect } from "react";
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
  const [preview, setPreview] = useState<string | null>(null);

  // cleanup memory (important)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (file: File | null) => {
    onChange(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">Product Image</Label>

      <div
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors hover:border-primary/60 hover:bg-primary/5 ${
          error ? "border-destructive" : "border-muted-foreground/30"
        }`}
        onClick={() => document.getElementById(`file-${name}`)?.click()}
      >
        {preview ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              alt="preview"
              className="w-24 h-24 object-cover rounded-md border"
            />
            <p className="text-xs text-muted-foreground">
              Click to change image
            </p>
          </div>
        ) : (
          <>
            <svg
              className="w-8 h-8 text-muted-foreground mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-muted-foreground">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, WEBP up to 10MB
            </p>
          </>
        )}

        <Input
          id={`file-${name}`}
          type="file"
          name={name}
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
      </div>

      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}
