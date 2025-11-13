"use client";

import StatusModal from "@/components/statusModal";
import { createGenre } from "@/lib/actions/genres/createGenre";
import { useActionState } from "react";

export default function CreateGenreForm() {
    const [state, formAction, isPending] = useActionState(createGenre, { success: false });

    return (
        <>
                    <div className="flex flex-col h-full w-full gap-7 rounded-[25px] bg-[white] p-10 shadow-[0_0_45.4px_rgba(0,0,0,0.2)]">
                        <h2 className="font-medium">เพิ่มหมวดหมู่หนังสือ</h2>
                        <form className="flex flex-col gap-12" action={formAction}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="name" className="font-medium text-sm">ชื่อหมวดหมู่หนังสือ <span className="text-red-400"> *{state?.inputError?.nameError ? state?.inputError.nameError : ""}</span> </label>
                                    <input
                                        name="name"
                                        id="name"
                                        className={`rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm ${state?.inputError?.nameError ? "bg-red-200" : ""}`}
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="description" className="font-medium text-sm">คำอธิบายหมวดหมู่ <span className="text-red-400"> *{state?.inputError?.descriptionError ? state?.inputError.descriptionError : ""}</span> </label>
                                    <input
                                        name="description"
                                        id="description"
                                        className={`rounded-[20px] border-2 border-(--lightgrey1) px-5 py-3 text-(--darkblue) text-sm ${state?.inputError?.descriptionError ? "bg-red-200" : ""}`}
                                    />
                                </div>
                            </div>
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