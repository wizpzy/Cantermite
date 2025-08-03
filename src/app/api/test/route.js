import "dotenv/config";
import { NextResponse } from "next/server";
import { getIronSessionData } from "@/lib/session";

export async function GET(req) {
    const session = await getIronSessionData();
    if (!session.userId)
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 });

    console.log(session);
    return NextResponse.json({ message: "Test successful", userId: session.userId, role: session.role }, { status: 200 });
}