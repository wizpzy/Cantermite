import styles from './bookList.module.css';
import BookCard from './bookCard';

export default function BookList({ books }) {
    return (
        <div className={styles.list}>
            {books.map((book) => (
                <BookCard key={book.book_id} {...book} imagePath={book.image_path} />
            ))}
        </div>
    );
}