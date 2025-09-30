"use client";

import { getToday, getDueDate } from "@/utils/date";
import styles from "./page.module.css";

export default function BorrowDateInput({ tierData }) {

  const setDueDate = (e) => {
    const form = e.currentTarget.closest("form");
    const borrowDate = e.target.value
    console.log(form)
    form.querySelector('[name="dueDate"]').value = getDueDate(borrowDate, tierData.borrow_day);
  };

  return (
    <div className={styles.labelValue}>
      <div className={styles.borrowDetailItem}>
        <span className={styles.label}>
          วันที่ต้องการยืม
          <span className={styles.required}> *</span>
        </span>
        <input
          type="date"
          name="borrowDate"
          className={styles.dateInput}
          min={getToday()}
          onChange={(e) => {setDueDate(e)}}
          required
        />
      </div>
      <div className={styles.borrowDetailItem}>
        <span className={styles.label}>วันที่ต้องคืนหนังสือ</span>
        <input
          type="text"
          name="dueDate"
          className={styles.dueDate}
          placeholder="-- / -- / ----"
          readOnly
        />
      </div>
    </div>
  );
}
