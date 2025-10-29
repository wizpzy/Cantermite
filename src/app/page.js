import {
  getAllGenres,
  getPopularBooks,
  getAllTiers,
  getUserCurrentTier,
} from "@/lib/db";
import { verifySession } from "@/lib/dal";
import BookCard from "@/components/bookCard";
import GenreCard from "@/components/genreCard";
import Section from "@/components/section";
import TierCard from "@/components/tierCard";

export default async function Home() {
  const session = await verifySession();
  const currentTier = await getUserCurrentTier(session?.userId);
  const books = await getPopularBooks(5);
  const genres = await getAllGenres(5);
  const allTiers = await getAllTiers();

  allTiers.map((item) => {
    if (item.tier === currentTier) item.current = true;
  });

  return (
    <div className="m-10">
      <Section title="หนังสือแนะนำ" seeAllHref="/books">
        <div className="flex flex-wrap gap-[50px] justify-center">
          {books.map((book) => (
            <BookCard
              key={book.book_id}
              bookId={book.book_id}
              {...book}
              imagePath={book.image_path}
              session={session}
            />
          ))}
        </div>
      </Section>

      <Section title="หมวดหมู่" seeAllHref="/genres">
        <div className="flex flex-wrap gap-[50px] justify-center">
          {genres.map((genre) => (
            <GenreCard key={genre.genre_id} {...genre} />
          ))}
        </div>
      </Section>

      <section className="my-[60px] flex flex-col justify-center gap-[30px]">
        <h2 className="text-center text-[20px] font-medium">การสมัครสมาชิก</h2>
        <div className="flex justify-center gap-[50px]">
          {allTiers.map((tier) => (
            <TierCard key={tier.tier} tierData={tier} />
          ))}
        </div>
      </section>
    </div>
  );
}
