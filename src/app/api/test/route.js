import "dotenv/config";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/session";

export async function GET(req) {
    const session = await getAuthSession();
    if (!session.userId)
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 });

    console.log(session);
    return NextResponse.json({ message: "Test successful", userId: session.userId, role: session.role }, { status: 200 });
}