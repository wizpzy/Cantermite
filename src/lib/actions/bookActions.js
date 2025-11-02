"use server";

import { getAuthSession } from "@/lib/session";
import { getAvailableCopy, getUserById } from "@/lib/db";
import { randomId } from "@/utils/randomId";
import { reformatDueDate } from "@/utils/date";
import prisma from "@/lib/prisma";

export async function sendBorrowRequest(prevstate, formData) {
    const session = await getAuthSession();
    const userData = session?.userId ? await getUserById(session.userId, { user_id: true }) : null;
    const borrowId = randomId(10);
    const bookId = formData.get("bookId");
    try {
        const bookCopy = await getAvailableCopy(bookId);
        const borrowDate = formData.get("borrowDate");
        const dueDate = reformatDueDate(formData.get("dueDate"));
        await prisma.borrowing_detail.create({
            data: {
                borrow_id: borrowId,
                member_id: userData.user_id,
                book_copy_id: bookCopy.copy_id,
                borrow_date: new Date(borrowDate),
                due_date: new Date(dueDate),
                status: "pending",
            }
        });
        await prisma.book_copy.update({
            data: {
                status: "reserved"
            },
            where: {
                copy_id: bookCopy.copy_id
            }
        });
        return { success: true };
    } catch (error) {
        console.log(error)
        return { success: false, error };
    }
}

export async function editBook(prevstate, formData) {
    const bookId = formData.get("bookId");
    const title = formData.get("title");
    const author = formData.get("author");
    const publisher = formData.get("publisher");
    const year = parseInt(formData.get("year"));
    const genreName = formData.get("genre");
    const language = formData.get("language");
    console.log(genreName)

    const bookData = {};
    if (title) bookData.title = title;
    if (author) bookData.author = author;
    if (publisher) bookData.publisher = publisher;
    if (year) bookData.year = parseInt(year);
    if (language) bookData.language = language;

    try {
        if (Object.keys(bookData).length > 0) {
            const bookResult = await prisma.book_title.update({
                where: {
                    book_id: bookId
                },
                data: bookData
            });
        }

        const oldGenre = await prisma.book_genre.findFirst({
            where: {
                book_id: bookId
            }
        });
        if (oldGenre.genre_name != genreName) {
            const newGenre = await prisma.genre.findFirst({
                where: {
                    genre_name: genreName
                }
            });
            const genreResult = await prisma.book_genre.update({
                where: {
                    book_id_genre_id: {
                        book_id: bookId,
                        genre_id: oldGenre.genre_id
                    }
                },
                data: {
                    genre_id: newGenre.genre_id
                }
            });
        }
        return { success: true };
    } catch (error) {
        console.log(error)
        return { success: false, error };
    }
}