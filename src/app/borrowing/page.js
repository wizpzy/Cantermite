import { getBorrowHistory } from "@/lib/db";
import { verifySession } from "@/lib/dal";
import Table from "./table";

export default async function BorrowingHistoryPage() {
    const session = await verifySession();
    const userId = session?.userId ?? null;
    const borrowingHistory = userId ? await getBorrowHistory(userId) : [];

    return (
        <div className="h-[calc(90vh_-_80px)] flex flex-col border-(--lightgrey1) m-10 p-10 rounded-[25px] border-2 border-solid">
            <div className="w-full">
                <h2 className="text-xl font-medium">ประวัติการยืมหนังสือ</h2>
            </div>
            <Table data={borrowingHistory} />
        </div>
    );
}
