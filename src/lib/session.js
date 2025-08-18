import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export async function getAuthSession() {
  const session = await getIronSession(await cookies(), {
    password: process.env.SESSION_PASSWORD,
    cookieName: "authSession"
  });
  return session
}