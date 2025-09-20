"use client"

import styles from "./searchbar.module.css";

export default function SearchBar() {
    return (
        <div className={styles.searchbar}>
            <input type="text" placeholder="ค้นหา . . ." />
        </div>
    );
}
