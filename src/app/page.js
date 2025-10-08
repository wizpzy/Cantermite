import { getAllGenres, getPopularBooks } from "@/lib/db";
import BookList from "@/components/bookList";
import GenreList from "@/components/genreList";
import Section from "@/components/section";
import styles from "./page.module.css";

export default async function Home() {
  const books = await getPopularBooks(5);
  const genres = await getAllGenres(5);

  return (
    <div className={styles.page}>
      <Section title="หนังสือแนะนำ" seeAllHref="/books" children={<BookList books={books} />} />
      <Section title="หมวดหมู่" seeAllHref="/genres" children={<GenreList genres={genres} />} />
    </div>
  );
}
