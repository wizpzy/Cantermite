"use client";

import { useState } from "react";
import styles from "./headerClient.module.css";
import Link from "next/link";
import SearchBar from "./searchbar";
import { ChevronDown } from 'lucide-react';
import { createPortal } from "react-dom";
import LoginModal from "./loginModal";

export default function HeaderClient({ isLogin, fName }) {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <div className={styles.header}>
            <Link href="/" >
                <h1>Cantermite</h1>
            </Link>
            <nav className={styles.nav}>
                <div className={styles.dropdown}>
                    <Link href="/" className={styles.navLink}>
                        ยืมหนังสือ
                        <ChevronDown style={{ marginLeft: '5px' }} color="var(--white)" size={16} strokeWidth={2} />
                    </Link>
                    <div className={styles.dropdownMenu}>
                        <Link href="/" className={styles.dropdownItem}>ยืมหนังสือ</Link>
                        <Link href="/" className={styles.dropdownItem}>ประวัติการยืม</Link>
                    </div>
                </div>
                <div className={styles.dropdown}>
                    <Link href="/" className={styles.navLink}>
                        จองพื้นที่ทำงาน
                        <ChevronDown style={{ marginLeft: '5px' }} color="var(--white)" size={16} strokeWidth={2} />
                    </Link>
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
                <div className={styles.profile}>
                    {/* User profile icon : WIP */}
                    <Link href="/" className={styles.profileLink}> {fName} </Link>
                </div>
            ) : (
                <div className={styles.authContainer}>
                    {/* <Link href="/login" className={styles.loginLink}>เข้าสู่ระบบ</Link> */}
                    <a onClick={() => setShowLoginModal(true)} className={styles.navLink}>เข้าสู่ระบบ</a>
                    <span className={styles.seperator}>|</span>
                    <a className={styles.navLink}>สมัครสมาชิก</a>

                    {showLoginModal && createPortal(
                        <LoginModal onClose={() => setShowLoginModal(false)} />
                        , document.body
                    )}
                </div>
            )}
        </div>
    )
}