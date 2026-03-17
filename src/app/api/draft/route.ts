import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.set("datocms-draft", "true", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/";
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}

