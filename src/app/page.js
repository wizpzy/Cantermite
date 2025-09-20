import axios from "axios";
import BookList from "@/components/bookList";
import GenreList from "@/components/genreList";
import Section from "@/components/section";
import styles from "./page.module.css";

export default async function Home() {
  const bookResponse = await axios.get("http://localhost:3000/api/books?sort=popular");
  const bookData = bookResponse.data.slice(0, 5);
  const genreResponse = await axios.get("http://localhost:3000/api/genres");
  const genreData = genreResponse.data.slice(0, 5);

  return (
    <div className={styles.page}>
      <Section title="หนังสือแนะนำ" seeAllHref="/books" children={<BookList books={bookData} />} />
      <Section title="หมวดหมู่" seeAllHref="/genres" children={<GenreList genres={genreData} />} />
    </div>
  );
}
