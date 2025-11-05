import { Plus } from "lucide-react";
import SearchBar from "@/components/searchbar";
import Table from "./table";
import { getAllBooks } from "@/lib/db";
import Link from "next/link";

export default async function ManageBookPage() {
    const booksData = await getAllBooks();

    return (
        <div className="m-10 flex h-full flex-col gap-10 rounded-[25px] border-2 border-solid border-(--lightgrey1) p-10">
            <div className="flex items-center justify-between gap-5">
                <h2 className="text-xl font-medium">จัดการหนังสือ</h2>
                <SearchBar />
                <Link className="button bg-(--black) px-5" href="/staff/books/create">
                    <Plus />
                    เพิ่มหนังสือ
                </Link>
            </div>
            <Table data={booksData} />
        </div>
    );
}
