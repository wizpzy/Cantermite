"use client";

import { editBook } from "@/lib/actions/books/editBook";
import { Check, ChevronDown } from "lucide-react";
import { useActionState } from "react";
import ImageDropZone from "@/components/imageDropZone";
import SuccessModal from "@/components/successModal";
import { getBookCover } from "@/utils/imagePath";

export default function EditForm({ bookData, genreChoices }) {
    const [state, formAction, isPending] = useActionState(editBook, { success: false });
    const imageUrl = bookData.image_path ? getBookCover(bookData.image_path, 'L') : '/noImage.png';
    console.log(imageUrl)

    return (
        <>
            <div className="flex flex-col h-full w-full gap-10 rounded-[25px] bg-[white] p-10 shadow-[0_0_45.4px_rgba(0,0,0,0.2)]">
                <h2 className="font-medium">แก้ไขหนังสือ</h2>
                <form className="flex flex-col gap-10" action={formAction}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-4 w-7/20">
                            <span className="font-medium text-sm">รูปปกหนังสือ</span>
                            <ImageDropZone name="imageFile" defaultImage={{ dataURL: imageUrl, fileInfo: { name: `ภาพปก ${bookData.title}`, size: 0 } }} />
                        </div>
                        <div className="flex flex-col gap-8 w-13/20">
                            <div className="flex flex-col gap-4 w-7/10">
                                <label htmlFor="title" className="font-medium text-sm">ชื่อหนังสือ <span className="text-red-400">* {state.error?.titleError ? state.error.titleError + " *" : ""}</span> </label>
                                <input
                                    name="title"
                                    id="title"
                                    className={`rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm ${state.error?.titleError ? "bg-red-200" : ""}`}
                                    placeholder={bookData.title ?? "-"}
                                />
                            </div>
                            <div className="flex flex-col gap-4 w-7/10">
                                <label htmlFor="author" className="font-medium text-sm">ชื่อผู้เขียน <span className="text-red-400">* {state.error?.authorError ? state.error.authorError + " *" : ""}</span> </label>
                                <input
                                    name="author"
                                    id="author"
                                    className={`rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm ${state.error?.authorError ? "bg-red-200" : ""}`}
                                    placeholder={bookData.author ?? "-"}
                                />
                            </div>
                            <div className="flex flex-col gap-4 w-7/10">
                                <label htmlFor="publisher" className="font-medium text-sm">ชื่อสำนักพิมพ์</label>
                                <input
                                    name="publisher"
                                    id="publisher"
                                    className={`rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm`}
                                    placeholder={bookData.publisher ?? "-"}
                                />
                            </div>
                            <div className="flex gap-7 w-7/10 justify-between">
                                <div className="flex flex-col gap-4 flex-1">
                                    <label htmlFor="year" className="font-medium text-sm">ปีที่พิมพ์ <span className="text-red-400">* {state.error?.yearError ? state.error.yearError + " *" : ""}</span> </label>
                                    <input
                                        type="number"
                                        name="year"
                                        id="year"
                                        className={`rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm ${state.error?.yearError ? "bg-red-200" : ""}`}
                                        placeholder={bookData.year ?? "-"}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 flex-1">
                                    <label htmlFor="language" className="font-medium text-sm">ภาษา <span className="text-red-400">* {state.error?.languageError ? state.error.languageError + " *" : ""}</span> </label>
                                    <input
                                        name="language"
                                        id="language"
                                        className={`rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm ${state.error?.languageError ? "bg-red-200" : ""}`}
                                        placeholder={bookData.language ?? "-"}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 flex-1">
                                    <label htmlFor="genre" className="font-medium text-sm">หมวดหมู่ <span className="text-red-400">*</span> </label>
                                    <div className="relative">
                                        <select
                                            name="genre"
                                            id="genre"
                                            className="w-full rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm appearance-none"
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
                            </div>
                        </div>
                    </div>
                    <input name="bookId" type="hidden" value={bookData.book_id} />
                    <div className="flex justify-center">
                        <button type="submit" className="button bg-(--black) w-40">แก้ไขหนังสือ</button>
                    </div>
                </form>
            </div>
            {state.success && (
                <SuccessModal text={`แก้ไขหนังสือ ${state.title ?? bookData.title} สำเร็จแล้ว`} onClose={() => location.reload()} />
            )}
        </>
    );
}
