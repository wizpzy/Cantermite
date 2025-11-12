import { getAllGenres } from "@/lib/db";
import BreadCrumb from "@/components/breadCrumb";
import CreateBookForm from "./createBookForm";

export default async function createBookPage() {
    const genres = await getAllGenres();
    return (
        <div className="m-10">
            <BreadCrumb
                items={[
                    { href: "/staff/books", label: "จัดการหนังสือ" },
                    { label: "เพิ่มหนังสือ" },
                ]}
            />
            <CreateBookForm genreChoices={genres} />
        </div>
    );
}
