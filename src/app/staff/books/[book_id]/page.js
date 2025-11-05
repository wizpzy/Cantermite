import { getAllGenres, getBookById } from "@/lib/db";
import BreadCrumb from "@/components/breadCrumb";
import Image from "next/image";
import EditForm from "./editForm";
import { getBookCover } from "@/utils/imagePath";

export default async function EditBookPage({ params }) {
    const { book_id } = await params;
    const book = await getBookById(book_id);
    const genres = await getAllGenres();
    const imageUrl = book.image_path ? getBookCover(book.image_path, 'L') : '/noImage.png';
    return (
        <div className="m-10">
            <BreadCrumb
                items={[
                    { href: "/staff/books", label: "จัดการหนังสือ" },
                    { label: "ดูรายละเอียดหนังสือ" },
                ]}
            />
            <div className="flex flex-col w-full h-full gap-10 rounded-[25px] bg-[white] p-10 shadow-[0_0_45.4px_rgba(0,0,0,0.2)]">
                <h2 className="font-medium">แก้ไขหนังสือ</h2>
                <div className="flex gap-10 w-full justify-evenly items-center">
                    <div className="overflow-hidden w-[350px] h-[560px] rounded-[20px] relative">
                        <Image src={imageUrl} alt={`${book.title} cover / ${book.image_path}`} fill priority />
                    </div>
                    <EditForm bookData={book} genreChoices={genres} />
                </div>
            </div>
        </div>
    );
}
