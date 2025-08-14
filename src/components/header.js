import { getAuthSession } from "@/lib/session";
import { getUserById } from "@/lib/db";
import HeaderClient from "./headerClient";

export default async function Header() {
    const session = await getAuthSession();
    console.log(session)
    const isLogin = "userId" in session;
    const fName = isLogin ? (await getUserById(session.userId, {f_name: true})).f_name : null;
    const role = session.role;
    console.log(fName)

    return (
        <HeaderClient isLogin={isLogin} fName={fName} />
    );
}