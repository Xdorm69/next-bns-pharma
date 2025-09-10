import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // 👈 add role to User
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string; // 👈 add role to Session
    } & DefaultSession["user"];
    provider?: string;
  }

  interface JWT {
    id?: string;
    role?: string;
    provider?: string;
  }
}
