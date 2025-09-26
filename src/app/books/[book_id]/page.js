import { getAuthSession } from "@/lib/session";
import { getUserById, getBookById } from "@/lib/db";
import { PackagePlus } from "lucide-react";
import BorrowDateInput from "./borrowDateInput";
import BreadCrumb from "@/components/breadCrumb";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/button";
import SubmitButton from "@/components/submitButton";
import { sendBorrowRequest } from "./action";

export default async function BorrowingPage({ params }) {
    const { book_id } = await params;
    const book = await getBookById(book_id);
    const session = await getAuthSession();
    const userData = session?.userId ? await getUserById(session.userId, { address: true }) : null;
    const imageUrl = book.image_path ? `https://covers.openlibrary.org/b/id/${book.image_path}-L.jpg` : '/noImage.png';

    return (
        <div className={styles.page}>
            <BreadCrumb items={[
                { href: "/books", label: "ยืมหนังสือ" },
                { label: book.title }
            ]} />
            <form className={styles.detailLayout} action={sendBorrowRequest}>
                <div className={styles.detailContainer}>
                    <div className={styles.image}>
                        <Image src={imageUrl} alt={`${book.title} cover / ${book.image_path}`} width={400} height={640} />
                    </div>

                    <div className={styles.bookInfo}>
                        <div className={styles.bookSection}>
                            <h2 className={styles.sectionTitle}>รายละเอียดหนังสือ</h2>
                            <div className={styles.labelValue}>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ชื่อหนังสือ</span>
                                    <span className={styles.value}>{book.title}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ชื่อผู้เขียน</span>
                                    <span className={styles.value}>{book.author}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ชื่อสำนักพิมพ์</span>
                                    <span className={styles.value}>{book.publisher ? book.publisher : "-"}</span>
                                </div>
                            </div>
                            <div className={styles.labelValue}>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ปีที่พิมพ์</span>
                                    <span className={styles.value}>{book.year}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>ภาษา</span>
                                    <span className={styles.value}>{book.language ? book.language : "-"}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>หมวดหมู่</span>
                                    <span className={styles.value}>{book.category ? book.category : "-"}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bookSection}>
                            <h3 className={styles.sectionTitle}>รายละเอียดการยืม</h3>
                            <BorrowDateInput />
                        </div>
                        <div className={styles.bookSection}>
                            <div className={styles.addressContainer}>
                                <span className={styles.sectionTitle}>ที่อยู่ที่บันทึกไว้</span>
                                <p className={styles.value}>{userData ? userData?.address || "คุณยังไม่มีที่อยู่ที่บันทึกไว้ กรุณาเพิ่มที่อยู่ในหน้าข้อมูลส่วนตัว" : "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="bookId" value={book_id} />
                <div className={styles.buttonContainer}>
                    <SubmitButton className={styles.borrowButton} disabled={!session || !userData?.address} text={"อิอิ"}>
                        <PackagePlus size={20} />
                        ยืมหนังสือ
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}