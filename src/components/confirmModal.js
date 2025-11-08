import Image from "next/image";

export default function ConfirmModal({ onConfirm, onCancel, text }) {
    return (
        <div className="fixed flex justify-center items-center z-[999] font-medium text-(--black) inset-0 bg-[rgba(0,0,0,0.5)]" role="dialog" aria-modal="true" aria-label="Success action">
            <div className="relative w-[30%] h-2/5 shadow-[0_0_45.4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-6 px-10 py-0 rounded-[20px] bg-(--white)">
                <Image src={"/cautionIcon.png"} alt="Caution icon" width={170} height={170} />
                <div className="flex flex-col items-center gap-2">
                    <span> {text} </span>
                    <span className="text-(--darkgrey1) text-sm font-normal">หากยืนยันแล้วจะไม่สามารถแก้ไขได้</span>
                </div>
                
                <div className="flex gap-8 w-full justify-center">
                    <button className="button bg-(--cancel) w-1/4" onClick={onCancel}>ยกเลิก</button>
                    <button className="button w-1/4" onClick={onConfirm}>ยืนยัน</button>
                </div>
            </div>
        </div>
    );
}