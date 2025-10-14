"use client";

import { getToday, getDueDate } from "@/utils/date";
import { PackagePlus, SquarePen } from "lucide-react";
import { sendBorrowRequest } from "./action";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Image from "next/image";
import styles from "./page.module.css";
import SuccessModal from "@/components/successModal";

export default function BorrowForm({ bookData, userData, tierData }) {
    const [state, formAction, isPending] = useActionState(sendBorrowRequest, { success: false });
    const imageUrl = bookData.image_path ? `https://covers.openlibrary.org/b/id/${bookData.image_path}-L.jpg` : '/noImage.png';
    const router = useRouter();
    const setDueDate = (e) => {
        const form = e.currentTarget.closest("form");
        const borrowDate = e.target.value;
        form.querySelector('[name="dueDate"]').value = getDueDate(borrowDate, tierData.borrow_day);
    };

    return (
        <>
            <form className={styles.detailLayout} action={formAction}>
                <div className={styles.detailContainer}>
                    <div className={styles.image}>
                        <Image src={imageUrl} alt={`${bookData.title} cover / ${bookData.image_path}`} width={400} height={640} priority />
                    </div>

                    <div className={styles.bookInfo}>
                        <div className={styles.bookSection}>
                            <h2 className={styles.sectionTitle}>รายละเอียดหนังสือ</h2>
                            <div className={styles.labelValue}>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ชื่อหนังสือ</span>
                                    <span className={styles.value}>{bookData.title}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ชื่อผู้เขียน</span>
                                    <span className={styles.value}>{bookData.author}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ชื่อสำนักพิมพ์</span>
                                    <span className={styles.value}>{bookData.publisher ? bookData.publisher : "-"}</span>
                                </div>
                            </div>
                            <div className={styles.labelValue}>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ปีที่พิมพ์</span>
                                    <span className={styles.value}>{bookData.year}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ภาษา</span>
                                    <span className={styles.value}>{bookData.language ? bookData.language : "-"}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>หมวดหมู่</span>
                                    <span className={styles.value}>{bookData.genre_name ? bookData.genre_name : "-"}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bookSection}>
                            <h3 className={styles.sectionTitle}>รายละเอียดการยืม</h3>
                            <div className={styles.labelValue}>
                                <div className={styles.borrowDetailItem}>
                                    <span className={styles.label}>
                                        วันที่ต้องการยืม
                                        <span className={styles.required}> *</span>
                                    </span>
                                    <input
                                        type="date"
                                        name="borrowDate"
                                        className={styles.dateInput}
                                        min={getToday()}
                                        onChange={(e) => { setDueDate(e) }}
                                        required
                                    />
                                </div>
                                <div className={styles.borrowDetailItem}>
                                    <span className={styles.label}>วันที่ต้องคืนหนังสือ</span>
                                    <input
                                        type="text"
                                        name="dueDate"
                                        className={styles.dueDate}
                                        placeholder="-- / -- / ----"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.bookSection}>
                            <a href="" className={styles.edit}> {/* WIP */}
                                <SquarePen color="var(--darkgrey1)" />
                            </a>
                            <div className={styles.addressContainer}>
                                <span className={styles.sectionTitle}>ที่อยู่ที่บันทึกไว้</span>
                                <p className={styles.value}>{userData ? userData?.address || "ไม่มีที่อยู่ที่บันทึกไว้ กรุณาเพิ่มที่อยู่ในหน้าข้อมูลส่วนตัว" : "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="bookId" value={bookData.book_id} />
                <div className={styles.buttonContainer}>
                    <Button type="submit" disabled={!userData || !userData?.address || !bookData.isAvailable || isPending}>
                        <PackagePlus size={20} />
                        {isPending ? "กำลังส่งคำขอ..." : bookData.isAvailable ? "ยืมหนังสือ" : "ไม่พร้อมให้บริการ"}
                    </Button>
                </div>
            </form>

            {state.success && (
                <SuccessModal text="ส่งคำขอสำเร็จแล้ว" onClose={() => location.reload()} />
            )}
        </>
    );
}