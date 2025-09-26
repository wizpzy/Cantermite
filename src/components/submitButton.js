"use client";

import { createPortal } from "react-dom";
import { useState } from "react";
import Button from "./button";
import SuccessModal from "./successModal";

export default function SubmitButton({ type = "button", className, children, onClick, disabled = false, text }) {
    const [showModal, setShowModal] = useState(false);
    const [formEl, setFormEl] = useState(null)

    const handleClick = (e) => {
        const form = e.currentTarget.closest("form");
        if(!form) return;
        if (!form.reportValidity()) return;
        setFormEl(form);
        formEl?.requestSubmit();
        setShowModal(true);
    };


    return (
        <>
            <Button
                type={type}
                className={className}
                onClick={handleClick}
                disabled={disabled}
            >
                {children}
            </Button>
            {showModal && createPortal(
                <SuccessModal onClose={() => setShowModal(false)} text={text} />
                , document.body
            )}
        </>
    );
}