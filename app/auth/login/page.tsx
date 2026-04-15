"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { LoginMutation } from "./_mutations/loginMutation";
import Image from "next/image";
import { images } from "@/lib/constants/images";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = LoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 🌄 FULL BACKGROUND */}
      <Image
        src={images.auth}
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* 🌫️ Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* 🧊 CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        {/* GLASS CARD */}
        <Card
          className="
          w-full max-w-md
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-2xl
          text-white
        "
        >
          <CardHeader>
            <CardTitle className="text-2xl text-center font-semibold font-mono text-white">
              Login Form
            </CardTitle>
            <CardDescription className="text-white/70 text-center">
              Enter your email and password to login. <br />
              If you don&apos;t have an account,{" "}
              <Link href="/auth/sign-up" className="underline text-white">
                sign up
              </Link>
              .
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Google */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <Image
                  width={20}
                  height={20}
                  alt="google"
                  src="/google_auth.png"
                />
                Continue with Google
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 mt-4">
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white/90 "
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>

              <p className="text-sm text-center text-white/70">
                Don&apos;t have an account?{" "}
                <Link href="/auth/sign-up" className="text-white underline">
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
