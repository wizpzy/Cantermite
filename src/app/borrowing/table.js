"use client";

import { formatDateFromDB } from "@/utils/date";
import { StepBack, StepForward } from "lucide-react";
import { useState } from "react";
import styles from "./page.module.css"
import Button from "@/components/button";

const statusDict = {
    "pending": "รอดำเนินการ",
    "borrowed": "กำลังรอการคืน",
    "returned": "คืนแล้ว",
    "overdue": "เกินกำหนด"
}

export default function Table({ data }) {
    const [page, setPage] = useState(1);
    const minPage = 1;
    const maxPage = Math.ceil(data.length / 10);
    const updatePage = (newPage) => {
        setPage(Math.max(minPage, Math.min(newPage, maxPage)));
    }
    const rows = data.slice((page - 1) * 10, page * 10);
    while (rows.length < 10) {
        rows.push({ empty: true });
    }

    return (
        <>
            <div className={styles.historyContainer}>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>
                                ลำดับ
                            </th>
                            <th className={styles.bookTitle} style={{ width: "40%" }}>
                                ชื่อหนังสือ
                            </th>
                            <th style={{ width: "10%" }}>
                                วันที่ยืม
                            </th>
                            <th style={{ width: "10%" }}>
                                กำหนดการคืน
                            </th>
                            <th style={{ width: "10%" }}>
                                วันที่คืนจริง
                            </th>
                            <th>
                                สถานะ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={6}>ไม่มีประวัติการยืม</td>
                            </tr>
                        ) : (
                            rows.map((borrow, index) => (
                                <tr key={index}>
                                    <td>{borrow.empty ? "" : ((page - 1) * 10) + index + 1}</td>
                                    <td className={styles.bookTitle}>{borrow.empty ? "" : borrow.book_copy?.book_title?.title}</td>
                                    <td>{borrow.empty ? "" : formatDateFromDB(borrow.borrow_date)}</td>
                                    <td>{borrow.empty ? "" : formatDateFromDB(borrow.due_date)}</td>
                                    <td>{borrow.empty ? "" : formatDateFromDB(borrow.return_date)}</td>
                                    <td><div className={`${styles.status} ${styles[borrow.status]}`}>{borrow.empty ? "" : statusDict[borrow.status]}</div></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                <Button onClick={() => { updatePage(page - 1) }} disabled={page === minPage} className="iconButton">
                    <StepBack size={28} />
                </Button>
                <input type="number" className={styles.pageNumber} name="pageNumber" value={page ?? ""} onChange={(e) => { updatePage(e.target.value) }} min={minPage} max={maxPage} />
                <span className={styles.maxPageNumber}> จาก {maxPage} </span>
                <Button onClick={() => { updatePage(page + 1) }} disabled={page === maxPage} className="iconButton">
                    <StepForward size={28} />
                </Button>
            </div>
        </>
    );
}