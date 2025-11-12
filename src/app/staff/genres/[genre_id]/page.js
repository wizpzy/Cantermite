import BreadCrumb from "@/components/breadCrumb";
import EditGenreForm from "./editGenreForm";
import { getGenreById } from "@/lib/db";


export default async function EditGenrePage({ params }) {
    const { genre_id } = await params;
    const genre = await getGenreById(genre_id)

    return (
        <div className="m-10">
            <BreadCrumb
                items={[
                    { href: "/staff/genres", label: "จัดการหมวดหมู่หนังสือ" },
                    { label: "แก้ไขหมวดหมู่หนังสือ" },
                ]}
            />
            <EditGenreForm genreData={genre} />
        </div>
    );
}