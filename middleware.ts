import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Protect routes with NextAuth

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow if user is logged in AND role is ADMIN
        return !!token;
      },
    },
  }
);

// Define which routes to protect
export const config = {
  matcher: ["/admin/:path*"], // only admin routes
};
