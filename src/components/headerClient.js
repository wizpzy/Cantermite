"use client";

import { ChevronDown } from 'lucide-react';
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useState } from "react"; 
import axios from "axios";
import Link from "next/link";
import LoginModal from "./loginModal";
import RegisterModal from './registerModal';
import SearchBar from "./searchbar";
import styles from "./headerClient.module.css";

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
    }

    return (
        <div className={styles.header}>
            <Link href="/" >
                <h1>Cantermite</h1>
            </Link>
            <nav className={styles.nav}>
                <div className={styles.dropdown}>
                    <div className={styles.navLink}>
                        <span>ยืมหนังสือ</span>
                        <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                    </div>
                    <div className={styles.dropdownMenu}>
                        <Link href="/" className={styles.dropdownItem}>ยืมหนังสือ</Link>
                        <Link href="/" className={styles.dropdownItem}>ประวัติการยืม</Link>
                    </div>
                </div>
                <div className={styles.dropdown}>
                    <div className={styles.navLink}>
                        <span>จองพื้นที่ทำงาน</span>
                        <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                    </div>
                    <div className={styles.dropdownMenu}>
                        <Link href="/" className={styles.dropdownItem}>จองพื้นที่ทำงาน</Link>
                        <Link href="/" className={styles.dropdownItem}>ประวัติการจอง</Link>
                    </div>
                </div>
            </nav>
            <div>
                {/* Client component */}
                {/* Search bar : WIP */}
                <SearchBar />
            </div>
            {isLogin ? (
                <div className={styles.dropdown}>
                    <div className={styles.navLink}>
                        <img src="/avatar.png" alt="Profile" className={styles.profileIcon} />
                        <div className={styles.profileInfo}>
                            <span className={styles.name}>{fName} {lName}</span>
                            <span className={styles.role}>{role == "staff" ? "เจ้าหน้าที่" : "สมาชิก"}</span>
                        </div>
                        <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                    </div>
                    <div className={styles.dropdownMenu}>
                        <Link href="/" className={styles.dropdownItem}>โปรไฟล์</Link>
                        <a onClick={handleLogout} className={styles.dropdownItem}>ออกจากระบบ</a>
                    </div>
                </div>
            ) : (
                <div className={styles.authContainer}>
                    {/* <Link href="/login" className={styles.loginLink}>เข้าสู่ระบบ</Link> */}
                    <a onClick={() => setShowLoginModal(true)} className={styles.navLink}>เข้าสู่ระบบ</a>
                    <span className={styles.seperator}>|</span>
                    <a onClick={() => setShowRegisterModal(true)} className={styles.navLink}>สมัครสมาชิก</a>

                    {showLoginModal && createPortal(
                        <LoginModal onClose={() => setShowLoginModal(false)} />
                        , document.body
                    )}

                    {showRegisterModal && createPortal(
                        <RegisterModal onClose={() => setShowRegisterModal(false)} />
                        , document.body
                    )}
                </div>
            )}
        </div>
    )
}