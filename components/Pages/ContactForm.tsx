"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ContactForm() {
  return (
    <section className="w-full py-20 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground mt-2">
            We’d love to hear from you. Fill out the form below.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-none shadow-md">
          <CardContent className="p-8 space-y-6">
            <form className="space-y-4">
              <Input type="text" placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Textarea placeholder="Your Message" rows={5} required />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
