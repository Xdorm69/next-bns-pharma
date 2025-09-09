import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Protect routes with NextAuth
export default withAuth(
  function middleware(req) {
    // You can add extra checks here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Only allow if user is logged in
        return !!token;
      },
    },
  }
);

// Define which routes to protect
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // add your protected routes here
};
