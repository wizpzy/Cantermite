import Link from 'next/link';
import styles from './section.module.css';

export default function Section({ title, seeAllHref, children }) {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {seeAllHref && (
                    <Link className={styles.seeAll} href={seeAllHref}>ดูทั้งหมด</Link>
                )}
            </div>
            {children}
        </section>
    );
}