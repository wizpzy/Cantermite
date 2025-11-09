"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "./table";

export default function FilterSection({ booksData }) {
    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(booksData.filter((book) => {
            return book.title.toLowerCase().startsWith(filter.toLowerCase());
        }))
    }, [filter])

    return (
        <>
            <div className="flex items-center justify-between gap-5">
                <h2 className="text-xl font-medium">จัดการหนังสือ</h2>
                <div className="h-[45px] w-[45vw] flex-1">
                    <input
                        className="h-full w-full rounded-[20px] border-2 border-(--lightgrey1) bg-(--white) px-5 py-0 text-sm text-(--black)"
                        type="text"
                        placeholder="ค้นหา . . ."
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <Link className="button bg-(--black) px-5" href="/staff/books/create">
                    <Plus />
                    เพิ่มหนังสือ
                </Link>
            </div>
            <Table data={filteredData} />
        </>
    );
}