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



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mutation for login
  const { mutate, isPending } = LoginMutation();

  //handling submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="h-[calc(100vh-3rem)] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold font-mono">Login Form</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Enter your email and password to login. <br />If you don&apos;t have an account,
            please <Link href="/auth/sign-up">sign up</Link>.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="mt-2"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="mt-2"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Social providers (Google, GitHub, etc.) */}
            <Button
              type="button"
              variant="outline"
              className="w-full mb-2 flex items-center gap-2"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <Image
                width={20}
                height={20}
                alt="google"
                src={"/google_auth.png"}
              />{" "}
              <p>Continue with Google</p>
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full text-white"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-blue-400 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
