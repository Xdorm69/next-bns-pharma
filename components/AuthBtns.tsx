"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AuthBtns = () => {
  const { data: session, status } = useSession();

  // While session is loading
  if (status === "loading") {
    return (
      <Button variant="default" disabled>
        Loading...
      </Button>
    );
  }

  // If not logged in
  if (!session) {
    return (
      <Button variant="default" asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  // If logged in
  return (
    <Button variant="destructive" onClick={() => signOut()}>
      Logout
    </Button>
  );
};

export default AuthBtns;
