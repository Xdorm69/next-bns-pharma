"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupDataType, signupSchema } from "@/lib/validations/auth";
import { useRegisterMutation } from "./_mutations/registerMutation";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Eye } from "lucide-react";

export default function SignupPage() {
  const { mutate, isPending } = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupDataType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignupDataType) {
    mutate(values);
    form.reset();
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 🌄 FULL BACKGROUND */}
      <Image
        src="/auth/bg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* 🌫️ Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* 🧊 CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
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
              Create Account
            </CardTitle>
            <CardDescription className="text-white/70 text-center">
              Enter your details to create an account. <br />
              Already have an account?{" "}
              <Link href="/auth/login" className="underline text-white">
                Login
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center pr-2 border border-white/20 rounded-lg bg-white/10">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="focus:outline-none w-full px-3 py-2 bg-transparent text-white placeholder:text-white/60"
                            placeholder="••••••••"
                            {...field}
                          />
                          <Eye
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="text-white/70 cursor-pointer"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Google */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                >
                  <Image
                    width={20}
                    height={20}
                    alt="google"
                    src="/google_auth.png"
                  />
                  Continue with Google
                </Button>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90"
                  disabled={isPending}
                >
                  {isPending ? "Signing Up..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <p className="text-sm text-center text-white/70 w-full">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline text-white">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
