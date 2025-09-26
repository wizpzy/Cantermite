import Image from "next/image";
import styles from "./successModal.module.css";

export default function SuccessModal({ onClose, text }) {
    return (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Success action">
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
                <Image src={"/successIcon.png"} alt="Success icon" width={170} height={170} />
                <span> {text} </span>
                <a href="/"> กลับหน้าหลัก </a>
            </div>
        </div>
    );
}