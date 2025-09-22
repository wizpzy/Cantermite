import Link from "next/link";
import Button from "./button";
import styles from "./genreCard.module.css";
import Image from "next/image";

export default function GenreCard({ genre_name }) {
    return (
        <Link href={`/genres/${genre_name}`} className={styles.linkButton}>{genre_name}</Link>
        // <Button className={styles.card}>{genre_name}</Button>
    );
}