// /lib/email/contactTemplate.ts

import { ContactSchemaType } from "@/lib/validations/contact";

export function contactEmailTemplate(data: ContactSchemaType) {
  return `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    
    <h2 style="color:#0f766e;">📩 New Contact Form Submission</h2>
    
    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.number}</p>
    <p><strong>Subject:</strong> ${data.topic}</p>

    <div style="margin-top:20px;">
      <p><strong>Message:</strong></p>
      <p style="background:#f3f4f6; padding:12px; border-radius:8px;">
        ${data.message}
      </p>
    </div>

    <hr style="margin:20px 0;" />

    <p style="font-size:12px; color:#6b7280;">
      This email was sent from BNS Pharma website contact form.
    </p>
  </div>
  `;
}
