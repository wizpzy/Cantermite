import { getAuthSession } from "@/lib/session";
import { getUserById } from "@/lib/db";
import HeaderClient from "./headerClient";

export default async function Header() {
    const session = await getAuthSession();
    const isLogin = "userId" in session;
    const name = isLogin ? (await getUserById(session.userId, {f_name: true, l_name: true})) : null;
    const role = session.role;

    return (
        <HeaderClient isLogin={isLogin} fName={name?.f_name} lName={name?.l_name} role={role} />
    );
}