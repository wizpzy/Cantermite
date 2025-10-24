import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BookCard({ bookId, title, author, year, language, imagePath }) {
    const imageUrl = imagePath ? `https://covers.openlibrary.org/b/id/${imagePath}-M.jpg` : '/noImage.png';
    return (
        <div className="overflow-hidden w-[300px] h-[460px] text-sm shadow-[0_2px_6px_rgba(0,0,0,0.2)] pb-5 rounded-[20px]">
            <div className="relative w-full h-[280px]">
                <Image src={imageUrl} alt={`${title} cover`} fill />
            </div>
            <div className="flex flex-col flex-1 gap-2 px-5 py-2.5">
                <div className="text-(--darkblue) font-medium overflow-hidden min-h-[calc(1.5em_*_2)]">{title}</div>
                <span className="flex items-stretch gap-1.5 text-(--black) min-h-[calc(1.5em_*_2)]">
                    <span>
                        <CircleUserRound color='var(--black)' size={18} strokeWidth={2} />
                    </span>
                    {author}
                </span>
                <Link href={`/books/${bookId}`} className="button">ดูรายละเอียด</Link>
                {/* <span className={styles.language}>{language}</span> */}
            </div>
        </div>
    );
}