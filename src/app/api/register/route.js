import prisma from "@/_lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

// Register
export async function POST(req) {
    const body = await req.json();
    const { email, password, fName, lName, role } = body;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

    try {
        const user = await prisma.user.create({
            data: {
                user_id: uuidv4(),
                email,
                password: hashedPassword,
                f_name: fName,
                l_name: lName,
                role,
            },
        });
        return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "User registration failed" },
            { status: 400 },
            { error }
        );
    }
}