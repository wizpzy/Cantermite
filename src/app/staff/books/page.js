import { Plus } from "lucide-react";
import SearchBar from "@/components/searchbar";
import Table from "./table";
import { getAllBooks } from "@/lib/db";

export default async function ManageBookPage() {
    const booksData = await getAllBooks();

    return (
        <div className="h-full flex flex-col border-(--lightgrey1) m-10 p-10 gap-10 rounded-[25px] border-2 border-solid">
            <div className="flex items-center justify-between gap-5">
                <h2 className="font-medium text-xl">จัดการหนังสือ</h2>
                <SearchBar />
                <button className="button bg-(--black) px-5">
                    <Plus />
                    เพิ่มหนังสือ
                </button>
            </div>
            <Table data={booksData} />
        </div>
    );
}