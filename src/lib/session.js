import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export async function getAuthSession(rememberMe = false) {
  const baseOptions = {
    password: process.env.SESSION_PASSWORD,
    cookieName: "authSession",
  };

  const session = await getIronSession(await cookies(),
    rememberMe ? {
      ...baseOptions,
      ttl: 0
    } : baseOptions);
  return session
}