"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import styles from "./registerModal.module.css";

export default function RegisterModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return ;
    }
    try {
      const response = await axios.post("/api/register", { email, password, fName, lName, role: "member" });
      console.log("Registration successful:", response.data);
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    // role, aria-modal, aria-label are just for accessibility (like screen reading)
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="ลงทะเบียน">
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        <h1 className={styles.header}>Cantermite</h1>
        <h2 className={styles.title}>ลงทะเบียน</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.nameContainer}>
            <label className={styles.label}>
              <span className={styles.labelText}>ชื่อ</span>
              <input
                className={styles.input}
                type="text"
                placeholder="สมชาย"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                autoFocus
                required
              />
            </label>

            <label className={styles.label}>
              <span className={styles.labelText}>นามสกุล</span>
              <input
                className={styles.input}
                type="text"
                placeholder="ใจดี"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                required
              />
            </label>
          </div>

          <label className={styles.label}>
            <span className={styles.labelText}>อีเมล</span>
            <input
              className={styles.input}
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <label className={styles.label}>
            <span className={styles.labelText}>ยืนยันรหัสผ่าน</span>
            <input
              className={styles.input}
              type="password"
              placeholder="●●●●●●●●●●●●"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <button className={styles.submit} type="submit">ลงทะเบียน</button>
        </form>
      </div>
    </div>
  );
}
