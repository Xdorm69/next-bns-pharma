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
    <div className="h-[calc(100vh-3rem)] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold font-mono">
            Create Account
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Enter your email and password to login. <br />
            If you don't have an account, please{" "}
            <Link href="/auth/sign-up">sign up</Link>.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between pr-2 border-1 rounded">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="focus:outline-none w-full px-3 py-1.5"
                          placeholder="••••••••"
                          {...field}
                        />
                        <Eye className="text-muted-foreground/80" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Social signup placeholder */}
              <Button
                type="button"
                variant="outline"
                className="w-full mb-2 flex items-center gap-2"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                <Image
                  width={20}
                  height={20}
                  alt="google"
                  src={"/google_auth.png"}
                />{" "}
                <p>Continue with Google</p>
              </Button>

              <Button
                type="submit"
                className="w-full text-white"
                disabled={isPending}
              >
                {isPending ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
