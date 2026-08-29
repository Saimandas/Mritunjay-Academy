import { NextResponse } from "next/server";

export function proxy(request) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};