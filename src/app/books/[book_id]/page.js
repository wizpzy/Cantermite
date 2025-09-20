export default async function BorrowingPage({ params }) {
    const { book_id } = params;
    return (
        <div>
            <h1>Borrowing Page</h1>
            <p>Book ID: {book_id}</p>
        </div>
    );
}