import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/session";
import { NextResponse } from "next/server";
import "dotenv/config";

// Login
export async function POST(req) {
    const body = await req.json();
    const { email, password, rememberMe } = body;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
    }

    const session = await getAuthSession(rememberMe);
    session.userId = existingUser.user_id;
    session.role = existingUser.role;
    await session.save();

    return NextResponse.json({
        message: "Login successful",
        user: existingUser
     },
     { status: 200 });
}