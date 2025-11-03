import { verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import Table from "./table";

export default async function BorrowingHistoryPage() {
    const session = await verifySession();
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
        <div className="h-[calc(90vh_-_80px)] flex flex-col border-(--lightgrey1) m-10 p-10 rounded-[25px] border-2 border-solid">
            <div className="w-full">
                <h2 className="text-xl font-medium">ประวัติการยืมหนังสือ</h2>
            </div>
            <Table data={borrowingHistory} />
        </div>
    );
}
