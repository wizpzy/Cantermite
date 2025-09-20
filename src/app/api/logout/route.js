import { getAuthSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req) {
    const session = await getAuthSession();
    session.destroy();

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}