import styles from "./genreCard.module.css";
import Image from "next/image";

export default function GenreCard({ genre_name }) {
    return (
        <div className={styles.card}>
            {genre_name}
        </div>
    );
}