import { getAuthSession } from "@/lib/session";
import { getUserById, getBookById, getAvailableCopy, getTier, getUserCurrentTier } from "@/lib/db";
import BreadCrumb from "@/components/breadCrumb";
import styles from "./page.module.css";
import BorrowForm from "./borrowForm";

export default async function BorrowingPage({ params }) {
    const { book_id } = await params;
    const book = await getBookById(book_id);
    const session = await getAuthSession();
    const userData = session?.userId ? await getUserById(session.userId, { address: true }) : null;
    const tier = await getUserCurrentTier(session?.userId);
    const tierData = await getTier(tier);
    book.isAvailable = (await getAvailableCopy(book_id)) ? true : false;

    return (
        <div className={styles.page}>
            <BreadCrumb items={[
                { href: "/books", label: "ยืมหนังสือ" },
                { label: book.title }
            ]} />
            <BorrowForm bookData={book} userData={userData} tierData={tierData} />
        </div>
    );
}