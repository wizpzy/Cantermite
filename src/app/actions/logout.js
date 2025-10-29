"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function logout() {
    const session = await getIronSession(await cookies(), {
        password: process.env.SESSION_PASSWORD,
        cookieName: "authSession",
    });
    session.destroy();
    
    return { success: true };
}