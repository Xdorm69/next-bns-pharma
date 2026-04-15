import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { contact } from "@/lib/constants/contact";
import { ContactForm } from "./_components/ContactForm";
import React from "react";
import { FaqSection } from "./_components/FaqSection";

const contactIconMap = {
  MapPin: <MapPin className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
};

export default function ContactUsPage() {
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
            {contact.availability}
          </span>

          <h1 className="font-primary text-4xl md:text-5xl font-bold leading-tight mb-5">
            {contact.title.slice(0, 18)} <br className="hidden md:block" />{" "}
            {contact.title.slice(18)}
          </h1>
          <p className="text-primary-foreground/75 text-base md:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            {contact.description}
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
          {contact.cards.map((card, index) => (
            <Card
              key={index}
              className="group border border-border/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* top accent bar */}
              <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300" />
              <CardHeader className="pb-2">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {contactIconMap[card.icon as keyof typeof contactIconMap]}
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
          {/* CONTACT FORM  */}
          <ContactForm />

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
                  href={contact.mapLink}
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
                {contact.hours.map((h, i) => (
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
      <FaqSection />

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
            href={`tel:${contact.mobile}`}
            className="inline-block bg-white text-primary font-bold px-8 py-3.5 rounded-xl text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            📞 {contact.mobile}
          </a>
        </div>
      </section>
    </div>
  );
}
