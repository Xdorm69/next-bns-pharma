import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    } & DefaultSession["user"];
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    provider?: string;
  }
}
