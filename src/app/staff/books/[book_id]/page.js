import { getAllGenres, getBookById } from "@/lib/db";
import BreadCrumb from "@/components/breadCrumb";
import EditForm from "./editForm";

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
            <EditForm bookData={book} genreChoices={genres} />
        </div>
    );
}
