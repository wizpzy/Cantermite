import { CircleUserRound } from 'lucide-react';
import Button from './button';
import Image from 'next/image';
import Link from 'next/link';
import styles from './bookCard.module.css';

export default function BookCard({ bookId, title, author, year, language, imagePath }) {
    const imageUrl = imagePath ? `https://covers.openlibrary.org/b/id/${imagePath}-M.jpg` : '/noImage.png';
    return (
        <div className={styles.cardContainer}>
            <Image src={imageUrl} alt={`${title} cover / ${imagePath}`} className={styles.coverImage} width={300} height={280} />
            <div className={styles.bookInfo}>
                <div className={styles.title}>{title}</div>
                <span className={styles.author}>
                    <span className={styles.icon}>
                        <CircleUserRound color='var(--black)' size={18} strokeWidth={2} />
                    </span>
                    {author}
                </span>
                <Link href={`/books/${bookId}`} className={styles.linkButton}>ดูรายละเอียด</Link>
                {/* <span className={styles.language}>{language}</span> */}
            </div>
        </div>
    );
}