"use client";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./button";
import SuccessModal from "./successModal";

export default function SubmitButton({ className, children, onClick, disabled = false, text }) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const onClose = () => {
        setShowModal(false)
        router.refresh();
    }

    return (
        <>
            <Button
                type="submit"
                className={className}
                onClick={() => {setShowModal(true)}}
                disabled={disabled}
            >
                {children}
            </Button>
            {showModal && createPortal(
                <SuccessModal onClose={onClose} text={text} />
                , document.body
            )}
        </>
    );
}