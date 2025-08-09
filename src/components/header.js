import styles from "./header.module.css";
import { ChevronDown } from 'lucide-react';
import Link from "next/link";
import SearchBar from "./searchbar";

export default function Header() {
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
                {/* Search bar : WIP */}
                <SearchBar />
            </div>
            <div className={styles.profile}>
                {/* User profile icon : WIP */}
                <h1>Profile</h1>
            </div>
        </div>
    );
}