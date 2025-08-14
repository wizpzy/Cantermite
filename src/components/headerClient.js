"use client";

import { useState } from "react";
import styles from "./headerClient.module.css";
import Link from "next/link";
import SearchBar from "./searchbar";
import { ChevronDown } from 'lucide-react';
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
                    <div className={styles.login}>
                        {/* <Link href="/login" className={styles.loginLink}>เข้าสู่ระบบ</Link> */}
                        <button onClick={() => setShowLoginModal(true)} className={styles.textButton}>เข้าสู่ระบบ</button>
                    </div>
                    <span className={styles.seperator}>|</span>
                    <div className={styles.register}>
                        <Link href="/register" className={styles.registerLink}>สมัครสมาชิก</Link>
                    </div>

                    {showLoginModal && (
                        <LoginModal onClose={() => setShowLoginModal(false)} />
                    )}
                </div>
            )}
        </div>
    );
}