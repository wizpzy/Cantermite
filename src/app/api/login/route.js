import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import "dotenv/config";

// Login
export async function POST(req) {
    const body = await req.json();
    const { email, password } = body;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    console.log("Existing User:", existingUser);

    if (!existingUser) {
        return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
    }

    const session = await getIronSession(await cookies(), {password: process.env.SESSION_PASSWORD, cookieName: "authSession"});
    session.userId = existingUser.user_id;
    session.role = existingUser.role;
    await session.save();

    return NextResponse.json({
        message: "Login successful",
        user: existingUser
     },
     { status: 200 });
}