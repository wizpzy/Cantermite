"use client";

import { deleteGenre } from "@/lib/actions/genres/deleteGenre";
import { SquarePen, Trash2, StepBack, StepForward } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import ConfirmModal from "@/components/confirmModal";
import StatusModal from "@/components/statusModal";

export default function GenreTable({ data }) {
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [deleteState, setDeleteState] = useState({});

    const [page, setPage] = useState(1);
    const minPage = 1;
    const maxPage = Math.ceil(data.length / 8);
    const updatePage = (newPage) => {
        setPage(Math.max(minPage, Math.min(newPage, maxPage)));
    }
    const rows = data.slice((page - 1) * 8, page * 8);
    while (rows.length < 8) {
        rows.push({ empty: true });
    }

    const handleDeleteClick = (genre) => {
        setSelectedGenre(genre);
        setShowConfirmModal(true);
    }

    const handleConfirmDelete = async () => {
        setDeleteState(await deleteGenre(selectedGenre.genre_id));
        setShowConfirmModal(false);
        setShowStatusModal(true);
    }

    return (
        <>
            <div className="w-full h-full border-(--lightgrey1) p-[30px] rounded-[20px] border-2 border-solid">
                <table className="w-full h-full table-fixed text-center border-collapse border-spacing-2">
                    <thead className="h-[10%]">
                        <tr>
                            <th className="w-[10%]">
                                ลำดับ
                            </th>
                            <th className="w-[20%]">
                                ชื่อหมวดหมู่หนังสือ
                            </th>
                            <th className="w-[60%] indent-[5%] text-left">
                                คำอธิบายหมวดหมู่
                            </th>
                            <th className="w-[10%]">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="h-[90%]">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={4}>ไม่มีรายการหมวดหมู่หนังสือ</td>
                            </tr>
                        ) : (
                            rows.map((genre, index) => (
                                <tr key={index} className="h-[10%]">
                                    <td>{genre.empty ? "" : ((page - 1) * 8) + index + 1}</td>
                                    <td className="">
                                        {genre.empty ? "" :
                                            <span className="button w-40 justify-self-center">
                                                {genre.genre_name}
                                            </span>
                                        }
                                    </td>
                                    <td className="pl-[3%] text-left text-ellipsis">{genre.empty ? "" : genre.description}</td>
                                    <td>
                                        {genre.empty ? <></> :
                                            <div className="flex justify-evenly items-center">
                                                <Link href={`/staff/genres/${genre.genre_id}`}>
                                                    <SquarePen color="var(--darkgrey1)" strokeWidth={3} />
                                                </Link>
                                                <button className="hover:cursor-pointer" onClick={() => handleDeleteClick(genre)}>
                                                    <Trash2 color="var(--cancel)" strokeWidth={3} />
                                                </button>
                                            </div>
                                        }
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
            {showConfirmModal && (
                <ConfirmModal onCancel={() => setShowConfirmModal(false)} onConfirm={() => handleConfirmDelete()} text={`ต้องการลบหมวดหมู่ ${selectedGenre.genre_name} หรือไม่`} />
            )}
            {showStatusModal && (
                <StatusModal success={deleteState?.success} onClose={() => location.reload()} text={deleteState?.message} />
            )}
        </>
    );
}