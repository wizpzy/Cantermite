"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import bcrypt from "bcrypt";

export async function login(prevstate, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const rememberMe = formData.get("rememberMe");
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        return { success: false, error: "Incorrect email or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return { success: false, error: "Incorrect email or password" };
    }

    const baseSessionOptions = {
        password: process.env.SESSION_PASSWORD,
        cookieName: "authSession",
    };
    const session = await getIronSession(await cookies(),
        rememberMe ? {
            ...baseSessionOptions,
            ttl: 0
        } : baseSessionOptions);
    session.userId = existingUser.user_id;
    session.role = existingUser.role;
    await session.save();

    return { success: true }
}