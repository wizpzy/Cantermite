import { ChevronDown } from "lucide-react";
import Link from "next/link";
import SearchBar from "../searchbar";

export default function NavBar({ role }) {
    if (role === "staff")
        return (
            <nav className="flex gap-[5px] flex-1">
                <div className="group relative">
                    <div className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline">
                        <span>จัดการหนังสือ</span>
                        <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                    </div>
                    <div className="absolute left-2/4 hidden w-full min-w-[180px] -translate-x-2/4 overflow-hidden rounded-[20px] bg-(--white) shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:block">
                        <Link
                            href="/"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            จัดการหนังสือ
                        </Link>
                        <Link
                            href="/"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            จัดการหมวดหมู่หนังสือ
                        </Link>
                    </div>
                </div>
                <div className="group relative">
                    <div className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline">
                        <span>จัดการพื้นที่ทำงาน</span>
                        <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                    </div>
                    <div className="absolute left-2/4 hidden w-full min-w-[180px] -translate-x-2/4 overflow-hidden rounded-[20px] bg-(--white) shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:block">
                        <Link
                            href="/"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            จัดการพื้นที่ทำงาน
                        </Link>
                        <Link
                            href="/"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            จัดการประเภทพื้นที่ทำงาน
                        </Link>
                    </div>
                </div>
                <div className="group relative">
                    <div className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline">
                        <span>จัดการสมาชิก</span>
                        <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                    </div>
                    <div className="absolute left-2/4 hidden w-full min-w-[180px] -translate-x-2/4 overflow-hidden rounded-[20px] bg-(--white) shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:block">
                        <Link
                            href="/"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            จัดการสมาชิก
                        </Link>
                        <Link
                            href="/"
                            className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                        >
                            จัดการระดับสมาชิก
                        </Link>
                    </div>
                </div>
                <div className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline">
                    <Link href="/">แดชบอร์ด</Link>
                </div>
            </nav>
        );

    else
        return (
            <nav className="flex gap-10 flex-1">
                <div className="flex gap-[5px] items-center">
                    <div className="group relative">
                        <div className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline">
                            <span>ยืมหนังสือ</span>
                            <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                        </div>
                        <div className="absolute left-2/4 hidden w-full min-w-[180px] -translate-x-2/4 overflow-hidden rounded-[20px] bg-(--white) shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:block">
                            <Link
                                href="/books"
                                className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                            >
                                ยืมหนังสือ
                            </Link>
                            <Link
                                href="/borrowing"
                                className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                            >
                                ประวัติการยืม
                            </Link>
                        </div>
                    </div>
                    <div className="group relative">
                        <div className="m-2.5 flex cursor-pointer items-center gap-2.5 no-underline">
                            <span>จองพื้นที่ทำงาน</span>
                            <ChevronDown color="var(--white)" size={16} strokeWidth={2} />
                        </div>
                        <div className="absolute left-2/4 hidden w-full min-w-[180px] -translate-x-2/4 overflow-hidden rounded-[20px] bg-(--white) shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:block">
                            <Link
                                href="/spaces"
                                className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                            >
                                จองพื้นที่ทำงาน
                            </Link>
                            <Link
                                href="/booking"
                                className="block cursor-pointer px-5 py-2.5 text-(--black) no-underline hover:bg-(--lightblue) hover:text-(--white)"
                            >
                                ประวัติการจอง
                            </Link>
                        </div>
                    </div>
                </div>

                <SearchBar />
            </nav>
        );

}