import styles from "./page.module.css";
import { getAuthSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import Table from "./table";

export default async function BorrowingHistoryPage() {
    const session = await getAuthSession();
    const userId = session?.userId ?? null;

    const borrowingHistory = userId ? await prisma.borrowing_detail.findMany({
            where: { member_id: userId },
            include: {
                book_copy: {
                    include: {
                        book_title: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                borrow_date: "desc",
            },
        })
        : [];

    return (
        <div className={styles.page}>
            <div className={styles.heading}>
                <h2>ประวัติการยืมหนังสือ</h2>
            </div>
            <Table data={borrowingHistory} />
            {/* <div className={styles.historyContainer}>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>
                                ลำดับ
                            </th>
                            <th style={{ width: "40%" }}>
                                ชื่อหนังสือ
                            </th>
                            <th style={{ width: "20%" }}>
                                วันที่ต้องการยืม
                            </th>
                            <th style={{ width: "20%" }}>
                                วันที่ต้องคืน
                            </th>
                            <th>
                                สถานะ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowingHistory.length === 0 ? (
                            <tr>
                                <td colSpan={5}>ไม่มีประวัติการยืม</td>
                            </tr>
                        ) : (
                            borrowingHistory.map((borrow, index) => (
                                <tr key={borrow.borrow_id}>
                                    <td>{index + 1}</td>
                                    <td>{borrow.book_copy?.book_title?.title ?? "-"}</td>
                                    <td>{formatDate(borrow.borrow_date)}</td>
                                    <td>{formatDate(borrow.due_date)}</td>
                                    <td>{borrow.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}></div> */}
        </div>
    );
}
