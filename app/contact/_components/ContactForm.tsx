"use client";

import { toast } from "sonner";
import { submitContactForm } from "../_actions/submitContactForm";
import { useState, useTransition, useRef } from "react";
import { cn } from "@/lib/utils";

type FormErrors = Partial<
  Record<
    "firstName" | "lastName" | "email" | "number" | "topic" | "message",
    string[]
  >
> & {
  _form?: string[];
};

export const ContactForm = () => {
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const getError = (field: keyof FormErrors) => errors?.[field]?.[0];

  return (
    <div>
      <p className="uppercase tracking-widest text-xs text-primary font-semibold mb-2">
        Send a Message
      </p>
      <h2 className="font-primary text-3xl font-bold mb-2">Get In Touch</h2>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Have a question or want to book an appointment? Fill out the form and
        our team will get back to you within 24 hours.
      </p>

      <form
        ref={formRef}
        action={(formData) => {
          startTransition(async () => {
            const res = await submitContactForm(formData);

            if (res.success) {
              toast.success("Message sent!");
              setErrors({});
              formRef.current?.reset(); // ✅ reset form
            } else {
              setErrors(res.errors || {});
              toast.error(errors._form?.[0] || "Validation failed");
            }
          });
        }}
        className="flex flex-col gap-4"
      >
        {/* Name */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            placeholder="Rajesh"
            error={getError("firstName")}
            setErrors={setErrors}
          />
          <InputField
            label="Last Name"
            name="lastName"
            placeholder="Kumar"
            error={getError("lastName")}
            setErrors={setErrors}
          />
        </div>

        {/* Email */}
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          error={getError("email")}
          setErrors={setErrors}
        />

        {/* Phone */}
        <InputField
          label="Phone Number"
          name="number"
          type="tel"
          placeholder="+91 00000 00000"
          error={getError("number")}
          setErrors={setErrors}
        />

        {/* Topic */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Subject</label>
          <select
            name="topic"
            defaultValue=""
            onChange={() =>
              setErrors((prev) => ({ ...prev, topic: undefined }))
            }
            className={cn(
              "w-full px-4 py-3 border rounded-xl text-sm bg-background",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
              getError("topic") && "border-red-500",
            )}
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option>Appointment Booking</option>
            <option>Prescription Enquiry</option>
            <option>Product / Medicine Info</option>
            <option>Billing & Insurance</option>
            <option>General Query</option>
          </select>
          {getError("topic") && (
            <p className="text-xs text-red-500">{getError("topic")}</p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Message</label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us how we can help you..."
            onChange={() =>
              setErrors((prev) => ({ ...prev, message: undefined }))
            }
            className={cn(
              "w-full px-4 py-3 border rounded-xl text-sm bg-background resize-none",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
              getError("message") && "border-red-500",
            )}
          />
          {getError("message") && (
            <p className="text-xs text-red-500">{getError("message")}</p>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={pending}
          type="submit"
          className="self-start inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-xl text-sm hover:opacity-90 transition disabled:opacity-50"
        >
          {pending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

/* 🔹 Reusable Input Field */
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  setErrors,
}: any) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={() =>
          setErrors((prev: any) => ({ ...prev, [name]: undefined }))
        }
        className={cn(
          "w-full px-4 py-3 border rounded-xl text-sm bg-background",
          "focus:outline-none focus:ring-2 focus:ring-primary/30",
          error && "border-red-500",
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
