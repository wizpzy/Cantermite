import styles from './genreList.module.css';
import GenreCard from './genreCard';

export default function GenreList({ genres }) {
    return (
        <div className={styles.list}>
            {genres.map((genre) => (
                <GenreCard key={genre.genre_id} {...genre}/>
            ))}
        </div>
    );
}