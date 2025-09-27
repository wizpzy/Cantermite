"use client";

import { getToday, getDueDate } from "@/utils/date";
import { useState } from "react";
import styles from "./page.module.css";

export default function BorrowDateInput() {
    const [borrowDate, setBorrowDate] = useState(null);

    return (
        <div className={styles.labelValue}>
            <div className={styles.borrowDetailItem}>
                <span className={styles.label}>
                    วันที่ต้องการยืม
                    <span className={styles.required}> *</span>
                </span>
                <input type="date" name="borrowDate" className={styles.dateInput} min={getToday()} onChange={(e) => setBorrowDate(e.target.value)} required />
            </div>
            <div className={styles.borrowDetailItem}>
                <span className={styles.label}>วันที่ต้องคืนหนังสือ</span>
                <input type="text" name="dueDate" className={styles.dueDate} placeholder="-- / -- / ----" value={borrowDate ? getDueDate(borrowDate) : ""} readOnly />
            </div>
        </div>
    );
}