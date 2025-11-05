"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function abbreviateFileSize(size) {
    if (size >= 1024 ** 2)
        return (size / 1024 ** 2).toFixed(2) + " MB";
    else if (size >= 1024)
        return (size / 1024).toFixed(2) + " KB";
}

export default function ImageDropZone({ name }) {
    const [file, setFile] = useState(null);

    const discardFile = (e) => {
        e.stopPropagation(); // prevent triggering the dropzone
        setFile(null);
    };

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                // Do whatever you want with the file contents
                console.log(file)
                setFile({
                    dataURL: reader.result,
                    fileInfo: file
                });
            };
            reader.readAsDataURL(file);
        });
        // Do something with the files
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
        },
        maxFiles: 1,
        maxSize: 4 * 1024 * 1024,
        noClick: !!file,
        onDropRejected: () => {
            alert(`กรุณาใช้รูปภาพขนาดไม่เกิน 4 MB`);
        }
    });

    return (
        <div
            className="bg-(white) h-full w-full rounded-[20px] border-2 border-dashed border-(--lightgrey1)"
            {...getRootProps()}
        >
            <input name={name} {...getInputProps()} />
            <div className="flex h-full w-full flex-col items-center justify-center p-10">
                {file ? (
                    <div className="flex flex-col h-full w-full items-center gap-4 relative">
                        <button
                            type="button"
                            onClick={discardFile}
                            className="absolute top-0 right-0 text-xl z-10 cursor-pointer bg-transparent"
                        > x </button>
                        <div className="relative h-full w-full">
                            <Image
                                src={file.dataURL}
                                alt="Image preview"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2 font-medium text-sm">
                        <span>{file.fileInfo.name}</span>
                        <span className="text-(--darkgrey1)">{abbreviateFileSize(file.fileInfo.size)}</span>
                        </div>
                    </div>
                ) : isDragActive ? (
                    <span>เห้ยๆๆๆ ไฟล์มา</span>
                ) : (
                    <>
                        <Image
                            src="/image.png"
                            alt="image placeholder"
                            width={150}
                            height={150}
                            priority
                        />
                        <span>
                            ลากหรือวางไฟล์ที่นี่ หรือ
                            <span className="text-(--lightblue) hover:cursor-pointer hover:underline">
                                เลือกไฟล์
                            </span>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
