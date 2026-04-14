"use server";

import { contactSchema } from "@/lib/validations/contact";
import { Resend } from "resend";
import { contactEmailTemplate } from "../_components/ContactEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const parsed = contactSchema.safeParse(rawData);

    // ✅ HANDLE VALIDATION CLEANLY
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      return {
        success: false,
        errors: fieldErrors, // 👈 structured errors
      };
    }

    const data = parsed.data;

    const receiverMail =
      process.env.PRODUCTION === "false"
        ? process.env.DEV_EMAIL!
        : process.env.CONTACT_EMAIL!;


    await resend.emails.send({
      from: "BNS Pharma <onboarding@resend.dev>",
      to: receiverMail,
      subject: `New Contact: ${data.topic}`,
      html: contactEmailTemplate(data),
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Contact form error:", error);

    return {
      success: false,
      errors: {
        _form: ["Something went wrong. Please try again."],
      },
    };
  }
}
