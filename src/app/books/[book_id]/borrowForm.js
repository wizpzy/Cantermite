"use client";

import { getToday, getDueDate } from "@/utils/date";
import { PackagePlus, SquarePen } from "lucide-react";
import { sendBorrowRequest } from "@/lib/actions/bookActions";
import { useActionState } from "react";
import Image from "next/image";
import SuccessModal from "@/components/successModal";

export default function BorrowForm({ bookData, userData, tierData }) {
    const [state, formAction, isPending] = useActionState(sendBorrowRequest, { success: false });
    const imageUrl = bookData.image_path ? `https://covers.openlibrary.org/b/id/${bookData.image_path}-L.jpg` : '/noImage.png';
    const setDueDate = (e) => {
        const form = e.currentTarget.closest("form");
        const borrowDate = e.target.value;
        form.querySelector('[name="dueDate"]').value = getDueDate(borrowDate, tierData.borrow_day);
    };

    return (
        <>
            <form className="w-full flex flex-col gap-10 bg-[white] shadow-[0_0_45.4px_rgba(0,0,0,0.2)] p-10 rounded-[25px]" action={formAction}>
                <div className="flex gap-10">
                    <div className="overflow-hidden w-[400px] h-[640px] rounded-[20px] relative">
                        <Image src={imageUrl} alt={`${bookData.title} cover / ${bookData.image_path}`} fill priority />
                    </div>

                    <div className="w-[calc(100%_-_440px)] flex flex-col gap-10">
                        <div className="relative w-full border-(--lightgrey1) flex flex-col gap-[30px] p-[30px] rounded-[20px] border-2 border-solid">
                            <h2 className="text-base text-(--black) font-medium">รายละเอียดหนังสือ</h2>
                            <div className="flex justify-between w-[calc(100%_-_180px)]">
                                <div className="w-[15%] flex flex-col gap-2 text-sm">
                                    <span className="font-medium text-(--black)">ชื่อหนังสือ</span>
                                    <span className="text-(--darkblue)">{bookData.title}</span>
                                </div>
                                <div className="w-[15%] flex flex-col gap-2 text-sm">
                                    <span className="font-medium text-(--black)">ชื่อผู้เขียน</span>
                                    <span className="text-(--darkblue)">{bookData.author}</span>
                                </div>
                                <div className="w-[15%] flex flex-col gap-2 text-sm">
                                    <span className="font-medium text-(--black)">ชื่อสำนักพิมพ์</span>
                                    <span className="text-(--darkblue)">{bookData.publisher ? bookData.publisher : "-"}</span>
                                </div>
                            </div>
                            <div className="flex justify-between w-[calc(100%_-_180px)]">
                                <div className="w-[15%] flex flex-col gap-2 text-sm">
                                    <span className="font-medium text-(--black)">ปีที่พิมพ์</span>
                                    <span className="text-(--darkblue)">{bookData.year}</span>
                                </div>
                                <div className="w-[15%] flex flex-col gap-2 text-sm">
                                    <span className="font-medium text-(--black)">ภาษา</span>
                                    <span className="text-(--darkblue)">{bookData.language ? bookData.language : "-"}</span>
                                </div>
                                <div className="w-[15%] flex flex-col gap-2 text-sm">
                                    <span className="font-medium text-(--black)">หมวดหมู่</span>
                                    <span className="text-(--darkblue)">{bookData.genre_name ? bookData.genre_name : "-"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full border-(--lightgrey1) flex flex-col gap-[30px] p-[30px] rounded-[20px] border-2 border-solid">
                            <h3 className="text-base text-(--black) font-medium">รายละเอียดการยืม</h3>
                            <div className="flex justify-between w-[calc(100%_-_180px)]">
                                <div className="w-[45%] flex flex-col gap-2">
                                    <span className="text-sm font-medium text-(--black)">
                                        วันที่ต้องการยืม
                                        <span className="text-(--cancel)"> *</span>
                                    </span>
                                    <input
                                        type="date"
                                        name="borrowDate"
                                        className="border-(--lightgrey1) text-sm text-(--darkblue) px-5 py-3 rounded-[20px] border-2 border-solid"
                                        min={getToday()}
                                        onChange={(e) => { setDueDate(e) }}
                                        required
                                    />
                                </div>
                                <div className="w-[45%] flex flex-col gap-2">
                                    <span className="text-sm font-medium text-(--black)">วันที่ต้องคืนหนังสือ</span>
                                    <input
                                        type="text"
                                        name="dueDate"
                                        className="w-fit text-sm font-medium text-(--black) cursor-default mt-3 border-0 focus: outline-none"
                                        placeholder="-- / -- / ----"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full border-(--lightgrey1) flex flex-col gap-[30px] p-[30px] rounded-[20px] border-2 border-solid">
                            <a href="" className="z-[2] absolute right-10 top-[30px]"> {/* WIP */}
                                <SquarePen color="var(--darkgrey1)" />
                            </a>
                            <div className="flex flex-col gap-2">
                                <span className="text-base text-(--black) font-medium">ที่อยู่ที่บันทึกไว้</span>
                                <p className="text-sm text-(--darkblue)">{userData ? userData?.address || "ไม่มีที่อยู่ที่บันทึกไว้ กรุณาเพิ่มที่อยู่ในหน้าข้อมูลส่วนตัว" : "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="bookId" value={bookData.book_id} />
                <div className="flex justify-center">
                    <button type="submit" disabled={!userData || !userData?.address || !bookData.isAvailable || isPending}>
                        <PackagePlus size={20} />
                        {isPending ? "กำลังส่งคำขอ..." : bookData.isAvailable ? "ยืมหนังสือ" : "ไม่พร้อมให้บริการ"}
                    </button>
                </div>
            </form>

            {state.success && (
                <SuccessModal text="ส่งคำขอสำเร็จแล้ว" onClose={() => location.reload()} />
            )}
        </>
    );
}