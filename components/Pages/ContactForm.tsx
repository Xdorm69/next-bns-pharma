
"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ContactMutation } from "../ContactMutation";

export function ContactForm() {
  const emptyData = { name: "", email: "", message: "" };
  const [data, setData] = useState(emptyData);

  const { mutate, isPending } = ContactMutation();

  return (
    <section className="w-full py-20 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground mt-2">
            We&apos;d love to hear from you. Fill out the form below.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-none shadow-md">
          <CardContent className="p-8 space-y-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                mutate(data, { onSuccess: () => setData(emptyData) });
              }}
            >
              <Input
                type="text"
                placeholder="Your Name"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Your Email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <Textarea
                placeholder="Your Message"
                rows={5}
                required
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
              />
              <Button disabled={isPending} type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
