import { NextResponse, type NextRequest } from "next/server";

/**
 * Route protection. The Firebase client SDK manages auth in the browser, so we
 * mirror auth state into a lightweight `shringar_auth` cookie (set in
 * AuthContext). Pages additionally use <AuthGuard> for role checks + UX.
 */
const PROTECTED = ["/profile", "/checkout", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const needsAuth = PROTECTED.some((p) => pathname.startsWith(p));
  if (!needsAuth) return NextResponse.next();

  const isAuthed = request.cookies.get("shringar_auth")?.value === "1";
  if (!isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/checkout/:path*", "/admin/:path*"],
};
