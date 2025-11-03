import { getAllGenres, getBookById } from "@/lib/db";
import BreadCrumb from "@/components/breadCrumb";
import Image from "next/image";
import EditForm from "./editForm";

export default async function EditBookPage({ params }) {
    const { book_id } = await params;
    const book = await getBookById(book_id);
    const genres = await getAllGenres();
    const imageUrl = book.image_path ? `https://covers.openlibrary.org/b/id/${book.image_path}-L.jpg` : '/noImage.png';
    return (
        <div className="m-10">
            <BreadCrumb
                items={[
                    { href: "/staff/books", label: "จัดการหนังสือ" },
                    { label: "ดูรายละเอียดหนังสือ" },
                ]}
            />
            <div className="flex justify-center items-center w-full h-full gap-10 rounded-[25px] bg-[white] p-10 shadow-[0_0_45.4px_rgba(0,0,0,0.2)]">
                <div className="overflow-hidden w-[350px] h-[560px] rounded-[20px] relative">
                    <Image src={imageUrl} alt={`${book.title} cover / ${book.image_path}`} fill priority />
                </div>
                <EditForm bookData={book} genreChoices={genres} />
            </div>
        </div>
    );
}
