"use client";

import { StepBack, StepForward, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Table({ data }) {
    const [page, setPage] = useState(1);
    const minPage = 1;
    const maxPage = Math.ceil(data.length / 5);
    const updatePage = (newPage) => {
        setPage(Math.max(minPage, Math.min(newPage, maxPage)));
    }
    const rows = data.slice((page - 1) * 5, page * 5);
    while (rows.length < 5) {
        rows.push({ empty: true });
    }

    return (
        <>
            <div className="w-full h-full border-(--lightgrey1) p-[30px] rounded-[20px] border-2 border-solid">
                <table className="w-full h-full table-fixed text-center border-collapse border-spacing-2">
                    <thead className="h-[10%]">
                        <tr>
                            <th className="w-1/10">
                                ลำดับ
                            </th>
                            <th className="w-1/10">
                                ภาพหนังสือ
                            </th>
                            <th className="text-left indent-[5%] w-4/10">
                                ชื่อหนังสือ
                            </th>
                            <th className="w-1/10">
                                ชื่อผู้เขียน
                            </th>
                            <th className="w-1/10">
                                ชื่อสำนักพิมพ์
                            </th>
                            <th className="w-1/10">
                                ปีที่พิมพ์
                            </th>
                            <th className="w-1/10">
                                ภาษา
                            </th>
                            <th className="w-1/10">
                                หมวดหมู่
                            </th>
                            <th className="w-1/10">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="h-[90%]">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={9}>ไม่มีรายการหนังสือ</td>
                            </tr>
                        ) : (
                            rows.map((book, index) => (
                                <tr key={index} className="h-[20%] max-h-[20%]">
                                    <td>{book.empty ? "" : ((page - 1) * 5) + index + 1}</td>
                                    <td>
                                        <div className="overflow-hidden h-4/5 rounded-[5px] relative">
                                            <Image src={book.image_path ? `https://covers.openlibrary.org/b/id/${book.image_path}-S.jpg` : '/noImage.png'} alt={`${book.title} cover`} fill priority />
                                        </div>
                                    </td>
                                    <td className="text-left indent-[5%] overflow-hidden whitespace-nowrap text-ellipsis">{book.empty ? "" : book.title}</td>
                                    <td>
                                        <p className="overflow-hidden line-clamp-2 text-ellipsis">{book.empty ? "" : book.author}</p>
                                        </td>
                                    <td>{book.empty ? "" : book.publisher ?? "-"}</td>
                                    <td>{book.empty ? "" : book.year ?? "-"}</td>
                                    <td>{book.empty ? "" : book.language}</td>
                                    <td>{book.empty ? "" : book.genre_name}</td>
                                    <td>
                                        <div className="flex justify-evenly items-center">
                                            <Link href={`/staff/books/${book.book_id}`}>
                                                <SquarePen color="var(--darkgrey1)" strokeWidth={3} />
                                            </Link>
                                            <Trash2 color="var(--cancel)" strokeWidth={3} />
                                        </div>
                                    </td>
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