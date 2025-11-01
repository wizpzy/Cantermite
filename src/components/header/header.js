import { getUserById } from "@/lib/db";
import { verifySession } from "@/lib/dal";
import HeaderLogo from "./logo";
import NavBar from "./navbar";
import Profile from "./profile";

export default async function Header() {
    const session = await verifySession();
    const name = session.userId ? (await getUserById(session.userId, { f_name: true, l_name: true })) : null;
    const role = session?.role || null;

    return (
        <div className={`sticky top-0 z-[1] flex h-[10vh] w-full items-center px-20 py-2.5 text-sm text-(--white) gap-10 ${role === "staff" ? "bg-(--black)" : "bg-(--darkblue)"}`}>
            <HeaderLogo />
            <NavBar role={role} />
            <Profile fName={name?.f_name} lName={name?.l_name} />
        </div>
    );
}