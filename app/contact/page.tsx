"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const CardData = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Corporate Office 1",
    description: "13 No. Second Floor, City Court, Dhakoli, Zirakpur, Punjab",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Corporate Office 2",
    description: "Ground Floor – Shop No. 19 Wadhawa Nagar, Dhakoli",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Phone",
    description: "(+91) 7696291637\n7696779637",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
    description: "bnspharma@gmail.com",
  },
];

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "You can book an appointment by calling us at (+91) 7696291637, sending an email to bnspharma@gmail.com, or by filling the contact form above. We usually respond within a few hours.",
  },
  {
    q: "Do you offer home delivery for medicines?",
    a: "Yes, we offer home delivery within select areas in Zirakpur and the Tricity region. Please contact us to check availability in your area.",
  },
  {
    q: "Which insurance plans do you accept?",
    a: "We work with most major health insurance providers. Please bring your insurance card when you visit or contact us in advance to verify coverage.",
  },
  {
    q: "Can I get a prescription refill online?",
    a: "For refills, simply email your prescription to bnspharma@gmail.com or WhatsApp us. We'll confirm availability before preparing your order.",
  },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM", closed: false },
  { day: "Saturday", time: "10:00 AM – 5:00 PM", closed: false },
  { day: "Sunday", time: "Closed", closed: true },
];

export default function ContactUsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-muted/20">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-20 px-4 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

        <div className="container max-w-3xl mx-auto text-center relative z-10">
          {/* live badge */}
          <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full mb-5 border border-green-400/30">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available Mon–Sat · 9AM – 7PM
          </span>

          <h1 className="font-primary text-4xl md:text-5xl font-bold leading-tight mb-5">
            We're Here to Help You <br className="hidden md:block" />
            Feel Better, Faster
          </h1>
          <p className="text-primary-foreground/75 text-base md:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            Reach out to our medical team — whether you have questions, need to
            book an appointment, or want to learn more about our services.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="tel:+917696291637"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl text-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a
              href="mailto:bnspharma@gmail.com"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/20 transition-all"
            >
              <Mail className="w-4 h-4" /> Send an Email
            </a>
          </div>
        </div>
      </section>

      {/* ── INFO CARDS ────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CardData.map((card, index) => (
            <Card
              key={index}
              className="group border border-border/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* top accent bar */}
              <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300" />
              <CardHeader className="pb-2">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {card.icon}
                </div>
                <CardTitle className="font-primary text-base font-semibold">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── CONTACT FORM + MAP ───────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* FORM */}
          <div>
            <p className="uppercase tracking-widest text-xs text-primary font-semibold mb-2">
              Send a Message
            </p>
            <h2 className="font-primary text-3xl font-bold mb-2">
              Get In Touch
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Have a question or want to book an appointment? Fill out the form
              and our team will get back to you within 24 hours.
            </p>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    placeholder="Rajesh"
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    placeholder="Kumar"
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Subject</label>
                <select className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-muted-foreground appearance-none">
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option>Appointment Booking</option>
                  <option>Prescription Enquiry</option>
                  <option>Product / Medicine Info</option>
                  <option>Billing & Insurance</option>
                  <option>General Query</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50 resize-none"
                />
              </div>

              <button className="self-start inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-xl text-sm hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                Send Message
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* MAP + HOURS */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="uppercase tracking-widest text-xs text-primary font-semibold mb-2">
                Find Us
              </p>
              <h2 className="font-primary text-3xl font-bold mb-2">
                Our Location
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Conveniently located in Dhakoli, Zirakpur — easy to reach from
                Chandigarh, Panchkula and Mohali.
              </p>
            </div>

            {/* Map placeholder */}
            <div className="bg-accent border-2 border-dashed border-primary/20 rounded-2xl min-h-[260px] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
              {/* grid lines */}
              {[25, 50, 75].map((p) => (
                <React.Fragment key={p}>
                  <div
                    className="absolute w-full h-px bg-primary/5"
                    style={{ top: `${p}%` }}
                  />
                  <div
                    className="absolute h-full w-px bg-primary/5"
                    style={{ left: `${p}%` }}
                  />
                </React.Fragment>
              ))}

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="font-primary font-semibold text-primary text-lg mb-1">
                  BNS Pharma
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  Dhakoli, Zirakpur, Punjab
                </p>
                <Link
                  href="https://www.google.com/maps/place/City+Court,+5,+National+Highway,+Gulmohar+Complex,+Guru+Gobind+Singh+Nagar,+Dhakoli,+Zirakpur,+Punjab+160104/data=!4m2!3m1!1s0x390f94b4320df62b:0x44e1016d809e40ac!18m1!1e1?entry=gps&coh=192189&g_ep=CAESBzI2LjE0LjkYACCenQoqlAEsOTQyNjc3MjcsOTQyOTIxOTUsOTQyOTk1MzIsMTAwNzk2NDk4LDEwMDc5Nzc1NywxMDA3OTY1MzUsOTQyODQ0NzIsOTQyODA1NzYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsOTQyNzk2MTksMTAwNzk5MjQ2QgJJTg%3D%3D&skid=231b3f97-912c-49e8-aa3e-0e1efadab772&g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary text-xs font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Open in Google Maps
                </Link>
              </div>
            </div>

            {/* Working Hours */}
            <Card className="border border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="font-primary text-base font-semibold">
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm border-b border-border/40 last:border-0 pb-3 last:pb-0"
                  >
                    <span className="text-muted-foreground">{h.day}</span>
                    <span
                      className={
                        h.closed
                          ? "text-destructive font-medium"
                          : "font-medium"
                      }
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="bg-muted/40 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-widest text-xs text-primary font-semibold mb-2">
              FAQ
            </p>
            <h2 className="font-primary text-3xl md:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Quick answers to the questions we hear most often.
            </p>
          </div>

          <Card className="border border-border/60">
            <CardContent className="p-0 divide-y divide-border/60">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="px-6 py-5 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h4 className="font-semibold text-sm">{faq.q}</h4>
                    <svg
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  {openFaq === i && (
                    <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="font-primary text-3xl font-bold mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/75 mb-7 leading-relaxed">
            Our expert team is just a call or click away.
          </p>
          <a
            href="tel:+917696291637"
            className="inline-block bg-white text-primary font-bold px-8 py-3.5 rounded-xl text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            📞 +91 7696291637
          </a>
        </div>
      </section>
    </div>
  );
}
