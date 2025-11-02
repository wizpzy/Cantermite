import { NextResponse } from "next/server";
import { verifySession } from "./lib/dal";

const protectedRoute = "/staff"

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const session = await verifySession();
    const isProtectedRoute = path.startsWith(protectedRoute);
    if (isProtectedRoute && session?.role != "staff")
        return NextResponse.redirect(new URL("/", req.nextUrl));
}