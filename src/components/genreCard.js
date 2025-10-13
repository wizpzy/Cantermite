import Link from "next/link";
import styles from "./genreCard.module.css";
import Image from "next/image";

export default function GenreCard({ genre_name, image_path }) {
    const imageUrl = image_path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${image_path}` : '/noImage.png';
    return (
        <Link href={`/genres/${genre_name}`} className={styles.linkButton}>
            <Image src={imageUrl} alt={`${genre_name} cover`} fill={true} className={styles.bgImage} />
            <span className={styles.genreText}>{genre_name}</span>
        </Link>
    );
}