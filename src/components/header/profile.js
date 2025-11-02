"use client";

import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { logout } from "@/lib/actions/logout";
import { useState, useActionState } from "react";
import Link from "next/link";
import LoginModal from "../loginModal";
import RegisterModal from "../registerModal";

export default function Profile({ fName, lName, role }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [state, formAction, isPending] = useActionState(logout, { success: false });

    if (fName)
        return (
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
                    <form action={formAction}>
                        <button
                            type="submit"
                            className="w-full text-start block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                            onClick={() => {window.history.replaceState(null, "", "/")}}
                        >
                            ออกจากระบบ
                        </button>
                    </form>
                </div>
            </div>
        );
    else
        return (
            <div className="flex items-center">
                {/* <Link href="/login" className={styles.loginLink}>เข้าสู่ระบบ</Link> */}
                <button
                    onClick={() => setShowLoginModal(true)}
                    className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline"
                >
                    เข้าสู่ระบบ
                </button>
                <span className="mx-2.5 my-0">|</span>
                <button
                    onClick={() => setShowRegisterModal(true)}
                    className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline"
                >
                    สมัครสมาชิก
                </button>

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
        );
}