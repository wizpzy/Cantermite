import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { getIronSession } from "iron-session";

const baseOptions = {
    password: process.env.SESSION_PASSWORD,
    cookieName: "authSession",
  };

export const verifySession = cache(async () => {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, baseOptions);
    console.log("Session: ",session)
    return session;
})