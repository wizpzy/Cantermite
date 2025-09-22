"use client";

import { getToday, getDueDate } from "@/utils/date";
import { useState } from "react";
import styles from "./page.module.css";

export default function BorrowForm() {
    const [borrowDate, setBorrowDate] = useState(getToday());

    return (
        <div className={styles.labelValue}>
            <div className={styles.borrowDetailItem}>
                <span className={styles.label}>วันที่ต้องการยืม</span>
                <input type="date" className={styles.dateInput} min={getToday()} value={getToday()} onChange={(e) => setBorrowDate(e.target.value)} />
            </div>
            <div className={styles.borrowDetailItem}>
                <span className={styles.label}>วันที่ต้องคืนหนังสือ</span>
                <span className={styles.dueDate}> {getDueDate(borrowDate)} </span>
            </div>
        </div>
    );
}