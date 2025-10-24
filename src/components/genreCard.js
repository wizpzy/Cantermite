import Link from "next/link";
import Image from "next/image";

export default function GenreCard({ genre_name, image_path }) {
    const imageUrl = image_path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${image_path}` : '/noImage.png';
    return (
        <Link href={`/genres/${genre_name}`} className="relative h-44 w-80 grid place-content-center overflow-hidden text-(--white) text-2xl rounded-[20px]">
            <Image src={imageUrl} alt={`${genre_name} cover`} fill className="object-cover brightness-[40%] z-0" />
            <span className="z-10">{genre_name}</span>
        </Link>
    );
}