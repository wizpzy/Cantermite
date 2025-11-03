"use client";

import { editBook } from "@/lib/actions/bookActions";
import { Check, ChevronDown } from "lucide-react";
import { useActionState } from "react";
import SuccessModal from "@/components/successModal";

export default function EditForm({ bookData, genreChoices }) {
    const [state, formAction, isPending] = useActionState(editBook, {
        success: false,
    });

    return (
        <>
            <form
                action={formAction}
                className="flex h-fit w-6/10 flex-col gap-4 rounded-[20px] border-2 border-(--lightgrey1) p-10"
            >
                <h2 className="text-base font-medium">รายละเอียดหนังสือ</h2>
                <div className="flex flex-col gap-5">
                    <div className="flex">
                        <div className="flex w-1/2 flex-col gap-2 text-sm">
                            <span className="font-medium">ชื่อหนังสือ</span>
                            <input
                                name="title"
                                className="w-7/10 rounded-[20px] border-2 border-(--lightgrey1) px-3 py-2 text-(--darkblue)"
                                placeholder={bookData.title ?? "-"}
                            />
                        </div>
                        <div className="flex w-1/2 flex-col gap-2 text-sm">
                            <span className="font-medium">ชื่อสำนักพิมพ์</span>
                            <input
                                name="publisher"
                                className="w-7/10 rounded-[20px] border-2 border-(--lightgrey1) px-3 py-2 text-(--darkblue)"
                                placeholder={bookData.publisher ?? "-"}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex w-1/2 flex-col gap-2 text-sm">
                            <span className="font-medium">ชื่อผู้เขียน</span>
                            <input
                                name="author"
                                className="w-7/10 rounded-[20px] border-2 border-(--lightgrey1) px-3 py-2 text-(--darkblue)"
                                placeholder={bookData.author ?? "-"}
                            />
                        </div>
                        <div className="flex w-1/2 flex-col gap-2 text-sm">
                            <span className="font-medium">
                                ปีที่พิมพ์
                                <span className="font-normal text-red-400"> {state.yearError ? `*${state.yearError}*` : ""}</span>
                            </span>
                            <input
                                type="number"
                                name="year"
                                className="w-7/10 rounded-[20px] border-2 border-(--lightgrey1) px-3 py-2 text-(--darkblue)"
                                placeholder={bookData.year ?? "-"}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex w-1/2 flex-col gap-2 text-sm">
                            <span className="font-medium">หมวดหมู่</span>
                            <div className="relative w-7/10">
                                <select
                                    name="genre"
                                    className="w-full rounded-[20px] border-2 border-(--lightgrey1) px-3 py-2 text-(--darkblue) appearance-none"
                                    defaultValue={bookData.genre_name}
                                >
                                    {genreChoices.map((genre) => (
                                        <option key={genre.genre_id} value={genre.genre_name} className="rounded-[20px]">
                                            {genre.genre_name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown color="var(--darkblue)" strokeWidth={2} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex w-1/2 flex-col gap-2 text-sm">
                            <span className="font-medium">ภาษา</span>
                            <input
                                name="language"
                                className="w-7/10 rounded-[20px] border-2 border-(--lightgrey1) px-3 py-2 text-(--darkblue)"
                                placeholder={bookData.language ?? "-"}
                            />
                        </div>
                    </div>
                </div>
                <input name="bookId" type="hidden" value={bookData.book_id} />
                <div className="flex justify-center">
                    <button type="submit" className="button w-fit justify-self-center mt-10">
                        <Check strokeWidth={3} />
                        แก้ไขหนังสือ
                    </button>
                </div>
            </form>
            {state.success && (
                <SuccessModal text="แก้ไขหนังสือสำเร็จแล้ว" onClose={() => location.reload()} />
            )}
        </>
    );
}
