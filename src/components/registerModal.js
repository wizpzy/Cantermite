"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

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
    <div className="fixed flex justify-center items-center z-[999] font-medium text-(--black) inset-0 bg-[rgba(0,0,0,0.5)]" role="dialog" aria-modal="true" aria-label="ลงทะเบียน">
      <div className="relative w-[520px] h-[690px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] px-[75px] py-[50px] rounded-[20px] bg-(--white)">
        <button className="absolute text-xl cursor-pointer leading-none border-0 right-5 top-[15px] bg-transparent" onClick={onClose} aria-label="Close">×</button>
        <h1 className="text-center text-[32px] text-(--darkblue) mb-1.5">Cantermite</h1>
        <h2 className="text-center text-sm mb-[22px]">ลงทะเบียน</h2>

        <form onSubmit={handleSubmit} className="grid gap-[15px]">
          <div className="flex gap-[30px]">
            <label className="grid gap-[15px]">
              <span className="text-sm">ชื่อ</span>
              <input
                className="text-(--darkblue) border-(--lightgrey1) h-[50px] w-full px-5 py-[15px] rounded-[20px] border-2 border-solid focus:border-(--darkblue) outline-none"
                type="text"
                placeholder="สมชาย"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                autoFocus
                required
              />
            </label>

            <label className="grid gap-[15px]">
              <span className="text-sm">นามสกุล</span>
              <input
                className="text-(--darkblue) border-(--lightgrey1) h-[50px] w-full px-5 py-[15px] rounded-[20px] border-2 border-solid focus:border-(--darkblue) outline-none"
                type="text"
                placeholder="ใจดี"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                required
              />
            </label>
          </div>

          <label className="grid gap-[15px]">
            <span className="text-sm">อีเมล</span>
            <input
              className="text-(--darkblue) border-(--lightgrey1) h-[50px] w-full px-5 py-[15px] rounded-[20px] border-2 border-solid focus:border-(--darkblue) outline-none"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="grid gap-[15px]">
            <span className="text-sm">รหัสผ่าน</span>
            <input
              className="text-(--darkblue) border-(--lightgrey1) h-[50px] w-full px-5 py-[15px] rounded-[20px] border-2 border-solid focus:border-(--darkblue) outline-none"
              type="password"
              placeholder="●●●●●●●●●●●●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label className="grid gap-[15px]">
            <span className="text-sm">ยืนยันรหัสผ่าน</span>
            <input
              className="text-(--darkblue) border-(--lightgrey1) h-[50px] w-full px-5 py-[15px] rounded-[20px] border-2 border-solid focus:border-(--darkblue) outline-none"
              type="password"
              placeholder="●●●●●●●●●●●●"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <button className="button" type="submit" >ลงทะเบียน</button>
        </form>
      </div>
    </div>
  );
}
