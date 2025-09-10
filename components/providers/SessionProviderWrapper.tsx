"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: {user: {id: string, email: string, name: string, role: string}, expires: string};
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
