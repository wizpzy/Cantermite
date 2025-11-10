import Image from "next/image";

export default function StatusModal({ success, onClose, text }) {
    const icon = success ? "/successIcon.png" : "/cautionIcon.png";
    return (
        <div className="fixed flex justify-center items-center z-[999] font-medium text-(--black) inset-0 bg-[rgba(0,0,0,0.5)]" role="dialog" aria-modal="true" aria-label="Success action">
            <div className="relative w-[30%] h-2/5 shadow-[0_0_45.4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-5 px-10 py-0 rounded-[20px] bg-(--white)">
                <button className="absolute text-xl cursor-pointer leading-none border-0 right-5 top-[15px] bg-transparent" onClick={onClose} aria-label="Close">×</button>
                <Image src={icon} alt="Status icon" width={170} height={170} />
                <p> {text} </p>
                <a href="/" className="text-(--lightblue) hover:underline"> กลับหน้าหลัก </a>
            </div>
        </div>
    );
}