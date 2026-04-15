"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── TextInput ────────────────────────────────────────────────────────────────

export function TextInput({
  label,
  name,
  error,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  error?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
      />
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}

// ── TextAreaInput ────────────────────────────────────────────────────────────

export function TextAreaInput({
  label,
  name,
  error,
  placeholder,
  defaultValue,
  rows = 3,
}: {
  label: string;
  name: string;
  error?: string;
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <Textarea
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={rows}
        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
      />
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}

// ── SelectInput ──────────────────────────────────────────────────────────────

export function SelectInput({
  name,
  label,
  options,
  placeholder,
  error,
  onChange,
  defaultValue,
}: {
  name: string;
  label?: string;
  options: string[];
  placeholder: string;
  error?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5 flex-1">
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <Select onValueChange={onChange} defaultValue={defaultValue}>
        <SelectTrigger className={error ? "border-destructive" : ""}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt.replace(/_/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}

// ── FileInput ────────────────────────────────────────────────────────────────

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
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">Product Image</Label>
      <div
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors hover:border-primary/60 hover:bg-primary/5 ${
          error ? "border-destructive" : "border-muted-foreground/30"
        }`}
        onClick={() => document.getElementById(`file-${name}`)?.click()}
      >
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
        <Input
          id={`file-${name}`}
          type="file"
          name={name}
          accept="image/*"
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </div>
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}
