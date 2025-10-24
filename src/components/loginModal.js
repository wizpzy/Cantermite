"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

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
    <div className="fixed flex justify-center items-center z-[999] font-medium text-(--black) inset-0 bg-[rgba(0,_0,_0,_0.5)]" role="dialog" aria-modal="true" aria-label="เข้าสู่ระบบ">
      <div className="relative w-[520px] h-[545px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] px-[75px] py-[50px] rounded-[20px] bg-(--white)">
        <button className="absolute text-xl cursor-pointer leading-none border-0 right-5 top-[15px]" onClick={onClose} aria-label="Close">×</button>
        <h1 className="text-center text-[32px] text-(--darkblue) mb-1.5">Cantermite</h1>
        <h2 className="text-center text-sm mb-[22px]">เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit} className="grid gap-[15px]">
          <label className="grid gap-[15px]">
            <span className="text-sm">อีเมล</span>
            <input
              className="text-(--darkblue) border-(--lightgrey1) px-5 py-[15px] rounded-[20px] border-2 border-solid focus:border-(--darkblue)"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
          </label>

          <label className="grid gap-[15px]">
            <span className="text-sm">รหัสผ่าน</span>
            <input
              className="text-(--darkblue) border-(--lightgrey1) px-5 py-[15px] rounded-[20px] border-2 border-solid focus:border-(--darkblue)"
              type="password"
              placeholder="●●●●●●●●●●●●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="flex justify-between items-center mt-3">
            <label className="inline-flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="peer hidden" id="rememberMe"/>
              <span className="w-8 h-8 grid place-content-center rounded-[5px] border-2 border-solid border-(--lightgrey) peer-checked:border-(--darkblue) peer-checked:bg-(--darkblue) [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M5 13.5l4 4L19 8.5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm">จำฉัน</span>
            </label>

            <a className="text-sm" href="#">ลืมรหัสผ่าน ?</a>
          </div>

          <button type="submit" className="button">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  );
}
