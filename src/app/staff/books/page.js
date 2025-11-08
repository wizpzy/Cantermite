import { getAllBooks } from "@/lib/db";
import FilterSection from "./filterSection";

export default async function ManageBookPage() {
    const booksData = await getAllBooks();

    return (
        <div className="m-10 flex h-full flex-col gap-10 rounded-[25px] border-2 border-solid border-(--lightgrey1) p-10">
            <FilterSection booksData={booksData} />
        </div>
    );
}
