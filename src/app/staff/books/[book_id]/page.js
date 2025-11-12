import { getAllGenres, getBookById } from "@/lib/db";
import BreadCrumb from "@/components/breadCrumb";
import EditBookForm from "./editBookForm";

export default async function EditBookPage({ params }) {
    const { book_id } = await params;
    const book = await getBookById(book_id);
    const genres = await getAllGenres();
    return (
        <div className="m-10">
            <BreadCrumb
                items={[
                    { href: "/staff/books", label: "จัดการหนังสือ" },
                    { label: "ดูรายละเอียดหนังสือ" },
                ]}
            />
            <EditBookForm bookData={book} genreChoices={genres} />
        </div>
    );
}
