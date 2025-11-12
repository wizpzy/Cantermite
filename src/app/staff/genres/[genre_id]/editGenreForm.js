"use client";

import { editGenre } from "@/lib/actions/genres/editGenre";
import { useActionState } from "react";
import StatusModal from "@/components/statusModal";

export default function EditGenreForm({ genreData }) {
    const [state, formAction, isPending] = useActionState(editGenre, { success: false });


    return (
        <>
            <div className="flex flex-col h-full w-full gap-7 rounded-[25px] bg-[white] p-10 shadow-[0_0_45.4px_rgba(0,0,0,0.2)]">
                <h2 className="font-medium">แก้ไขหมวดหมู่หนังสือ</h2>
                <form className="flex flex-col gap-12" action={formAction}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="name" className="font-medium text-sm">ชื่อหมวดหมู่หนังสือ <span className="text-red-400"> {state?.error?.nameError ? state?.error.nameError : ""}</span> </label>
                            <input
                                name="name"
                                id="name"
                                className={`rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm ${state?.error?.nameError ? "bg-red-200" : ""}`}
                                placeholder={genreData.genre_name ?? "-"}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="description" className="font-medium text-sm">คำอธิบายหมวดหมู่ <span className="text-red-400"> {state?.error?.descriptionError ? state?.error.descriptionError : ""}</span> </label>
                            <input
                                name="description"
                                id="description"
                                className={`rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm ${state?.error?.descriptionError ? "bg-red-200" : ""}`}
                                placeholder={genreData.description ?? "-"}
                            />
                        </div>
                    </div>
                    <input name="genreId" type="hidden" value={genreData.genre_id} />
                    <div className="flex justify-center">
                        <button type="submit" className="button bg-(--black) w-40">บันทึกข้อมูล</button>
                    </div>
                </form>
            </div>
            {state.message && (
                <StatusModal success={state.success} text={state.message} onClose={() => location.reload()} />
            )}
        </>
    );
}