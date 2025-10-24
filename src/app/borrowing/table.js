"use client";

import { formatDateFromDB } from "@/utils/date";
import { StepBack, StepForward } from "lucide-react";
import { useState } from "react";

const statusDict = {
    "pending": {
        text: "รอดำเนินการ",
        style: "bg-(--lightpurple) text-(--purple)"
    },
    "borrowed": {
        text: "กำลังรอการคืน",
        style: "bg-(--lightyellow) text-(--yellow)"
    },
    "returned": {
        text: "คืนแล้ว",
        style: "bg-(--lightgreen) text-(--green)"
    },
    "overdue": {
        text: "เกินกำหนด",
        style: "bg-(--lightred) text-(--red)"
    }
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
            <div className="w-full h-full border-(--lightgrey1) mx-0 my-[30px] p-[30px] rounded-[20px] border-2 border-solid">
                <table className="w-full h-full table-fixed text-center border-collapse">
                    <thead className="h-[10%]">
                        <tr>
                            <th className="w-1/10">
                                ลำดับ
                            </th>
                            <th className="text-left indent-[5%] w-4/10">
                                ชื่อหนังสือ
                            </th>
                            <th className="w-1/10">
                                วันที่ยืม
                            </th>
                            <th className="w-1/10">
                                กำหนดการคืน
                            </th>
                            <th className="w-1/10">
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
                                <tr key={index} className="h-[9%]">
                                    <td>{borrow.empty ? "" : ((page - 1) * 10) + index + 1}</td>
                                    <td className="text-left indent-[5%]">{borrow.empty ? "" : borrow.book_copy?.book_title?.title}</td>
                                    <td>{borrow.empty ? "" : formatDateFromDB(borrow.borrow_date)}</td>
                                    <td>{borrow.empty ? "" : formatDateFromDB(borrow.due_date)}</td>
                                    <td>{borrow.empty ? "" : formatDateFromDB(borrow.return_date)}</td>
                                    <td><div className={`justify-self-center w-[180px] px-[30px] py-1.5 rounded-[20px] ${statusDict[borrow.status]?.style}`}>{borrow.empty ? "" : statusDict[borrow.status]?.text}</div></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="w-full h-[45px] flex gap-1 justify-end items-center">
                <button onClick={() => { updatePage(page - 1) }} disabled={page === minPage} className="text-(--darkblue) cursor-pointer flex content-center border-0">
                    <StepBack size={28} />
                </button>
                <input type="number" className="w-[50px] h-full border border-(--lightgrey1) text-center text-sm rounded-[20px] border-solid" name="pageNumber" value={page ?? ""} onChange={(e) => { updatePage(e.target.value) }} min={minPage} max={maxPage} />
                <span className="text-(--darkgrey1)"> จาก {maxPage} </span>
                <button onClick={() => { updatePage(page + 1) }} disabled={page === maxPage} className="text-(--darkblue) cursor-pointer flex content-center border-0">
                    <StepForward size={28} />
                </button>
            </div>
        </>
    );
}