"use client";

import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import LoginModal from "./loginModal";
import RegisterModal from "./registerModal";
import SearchBar from "./searchbar";

export default function HeaderClient({ isLogin, fName, lName, role }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/logout");
            console.log("Logout successful:", response.data);
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="sticky top-0 z-[1] flex h-[10vh] w-full items-center justify-evenly bg-(--darkblue) px-5 py-2.5 text-sm text-(--white)">
            <Link href="/">
                <h1 className="text-2xl">Cantermite</h1>
            </Link>
            <nav className="flex gap-[5px]">
                <div className="group relative">
                    <div className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline">
                        <span>ยืมหนังสือ</span>
                        <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                    </div>
                    <div className="absolute left-2/4 hidden w-full min-w-[180px] -translate-x-2/4 overflow-hidden rounded-[20px] bg-(--white) shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:block">
                        <Link
                            href="/books"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            ยืมหนังสือ
                        </Link>
                        <Link
                            href="/borrowing"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            ประวัติการยืม
                        </Link>
                    </div>
                </div>
                <div className="group relative">
                    <div className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline">
                        <span>จองพื้นที่ทำงาน</span>
                        <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                    </div>
                    <div className="absolute left-2/4 hidden w-full min-w-[180px] -translate-x-2/4 overflow-hidden rounded-[20px] bg-(--white) shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:block">
                        <Link
                            href="/spaces"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            จองพื้นที่ทำงาน
                        </Link>
                        <Link
                            href="/booking"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            ประวัติการจอง
                        </Link>
                    </div>
                </div>
            </nav>
            <div>
                {/* Client component */}
                {/* Search bar : WIP */}
                <SearchBar />
            </div>
            {isLogin ? (
                <div className="group relative">
                    <div className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline">
                        <img
                            src="/avatar.png"
                            alt="Profile"
                            className="w-[45px] h-[45px] rounded-[50%]"
                        />
                        <div className="flex flex-col mr-2.5">
                            <span>
                                {fName} {lName}
                            </span>
                            <span className="text-(--lightgrey1)">
                                {role == "staff" ? "เจ้าหน้าที่" : "สมาชิก"}
                            </span>
                        </div>
                        <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                    </div>
                    <div className="absolute left-2/4 hidden w-full min-w-[180px] -translate-x-2/4 overflow-hidden rounded-[20px] bg-(--white) shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:block">
                        <Link
                            href="/"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            โปรไฟล์
                        </Link>
                        <a
                            onClick={handleLogout}
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            ออกจากระบบ
                        </a>
                    </div>
                </div>
            ) : (
                <div className="flex items-center">
                    {/* <Link href="/login" className={styles.loginLink}>เข้าสู่ระบบ</Link> */}
                    <a
                        onClick={() => setShowLoginModal(true)}
                        className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline"
                    >
                        เข้าสู่ระบบ
                    </a>
                    <span className="mx-2.5 my-0">|</span>
                    <a
                        onClick={() => setShowRegisterModal(true)}
                        className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline"
                    >
                        สมัครสมาชิก
                    </a>

                    {showLoginModal &&
                        createPortal(
                            <LoginModal onClose={() => setShowLoginModal(false)} />,
                            document.body,
                        )}

                    {showRegisterModal &&
                        createPortal(
                            <RegisterModal onClose={() => setShowRegisterModal(false)} />,
                            document.body,
                        )}
                </div>
            )}
        </div>
    );
}
