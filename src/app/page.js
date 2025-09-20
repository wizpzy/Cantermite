import axios from "axios";
import BookList from "@/components/bookList";
import GenreList from "@/components/genreList";
import Section from "@/components/section";
import styles from "./page.module.css";

const getBooks = async () => {
  const response = await axios.get("http://localhost:3000/api/books?sort=popular");
  return response.data.slice(0, 5);
}

const getGenres = async () => {
  const response = await axios.get("http://localhost:3000/api/genres");
  return response.data.slice(0, 5);
}

export default async function Home() {
  const [books, genres] = await Promise.all([getBooks(), getGenres()]);

  return (
    <div className={styles.page}>
      <Section title="หนังสือแนะนำ" seeAllHref="/books" children={<BookList books={books} />} />
      <Section title="หมวดหมู่" seeAllHref="/genres" children={<GenreList genres={genres} />} />
    </div>
  );
}
