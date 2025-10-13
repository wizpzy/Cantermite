import { getAllGenres, getPopularBooks } from "@/lib/db";
import BookCard from "@/components/bookCard";
import GenreCard from "@/components/genreCard";
import Section from "@/components/section";
import styles from "./page.module.css";

export default async function Home() {
  const books = await getPopularBooks(5);
  const genres = await getAllGenres(5);

  return (
    <div className={styles.page}>
      <Section title="หนังสือแนะนำ" seeAllHref="/books">
        <div className={styles.list}>
          {books.map((book) => (
            <BookCard key={book.book_id} bookId={book.book_id} {...book} imagePath={book.image_path} />
          ))}
        </div>
      </Section>

      <Section title="หมวดหมู่" seeAllHref="/genres">
        <div className={styles.list}>
          {genres.map((genre) => (
            <GenreCard key={genre.genre_id} {...genre} />
          ))}
        </div>
      </Section>
    </div>
  );
}
