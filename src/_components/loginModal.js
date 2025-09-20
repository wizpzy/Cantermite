"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import styles from "./loginModal.module.css";
import Button from "./button";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rememberMe = document.getElementById("rememberMe").checked;
      const response = await axios.post("/api/login", { email, password, rememberMe });
      console.log("Login successful:", response.data);
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    // role, aria-modal, aria-label are just for accessibility (like screen reading)
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="เข้าสู่ระบบ">
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        <h1 className={styles.header}>Cantermite</h1>
        <h2 className={styles.title}>เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <span className={styles.labelText}>อีเมล</span>
            <input
              className={styles.input}
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
          </label>

          <label className={styles.label}>
            <span className={styles.labelText}>รหัสผ่าน</span>
            <input
              className={styles.input}
              type="password"
              placeholder="●●●●●●●●●●●●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className={styles.actions}>
            <label className={styles.checkboxWrapper}>
              <input type="checkbox" className={styles.checkbox} id="rememberMe"/>
              <span className={styles.box}>
                <svg viewBox="0 0 24 24" className={styles.icon}>
                  <path d="M5 13.5l4 4L19 8.5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </span>
              <span className={styles.labelText}>จำฉัน</span>
            </label>

            <a className={styles.labelText} href="#">ลืมรหัสผ่าน ?</a>
          </div>

          <Button type="submit">เข้าสู่ระบบ</Button>
        </form>
      </div>
    </div>
  );
}
