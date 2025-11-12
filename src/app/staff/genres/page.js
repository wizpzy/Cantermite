import { Plus } from "lucide-react";
import Link from "next/link";
import GenreTable from "./genreTable";
import { getAllGenres } from "@/lib/db";

export default async function ManageGenrePage() {
    const genresData = await getAllGenres();

    return (
        <div className="m-10 flex h-full flex-col gap-10 rounded-[25px] border-2 border-solid border-(--lightgrey1) p-10">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">จัดการหมวดหมู่หนังสือ</h2>
                <Link className="button bg-(--black) px-5" href="/staff/genres/create">
                    <Plus />
                    เพิ่มหมวดหมู่หนังสือ
                </Link>
            </div>
            <GenreTable data={genresData} />
        </div>
    );
}