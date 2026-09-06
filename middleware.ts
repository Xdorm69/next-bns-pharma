import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Route prefixes that require a signed-in ADMIN user.
// Add new admin-only paths here instead of gating them page-by-page.
const ADMIN_PATH_PREFIXES = ["/admin", "/api/admin"];

function isAdminPath(pathname: string): boolean {
  return ADMIN_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAdminPath(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Not signed in at all -> send to login, remembering where they wanted to go.
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Signed in but not an admin -> bounce to home.
  if (token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Only run this middleware where it's actually needed, keeps it cheap
  // for every other request (product pages, auth, static assets, etc.)
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
