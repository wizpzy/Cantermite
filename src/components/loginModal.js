"use client";

import { useState } from "react";
import styles from "./loginModal.module.css";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Replace this with your real login handler (call your /api/login, then refresh or mutate state)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
    onClose(); // close on success (or show error)
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="เข้าสู่ระบบ">
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        <h2 className={styles.title}>เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            อีเมล
            <input
              className={styles.input}
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
          </label>

          <label className={styles.label}>
            รหัสผ่าน
            <input
              className={styles.input}
              type="password"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button className={styles.submit} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
