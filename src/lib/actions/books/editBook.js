"use server";

import { getYear } from "date-fns";
import prisma from "@/lib/prisma";

export async function editBook(prevstate, formData) {
    const bookId = formData.get("bookId");
    const title = formData.get("title");
    const author = formData.get("author");
    const publisher = formData.get("publisher");
    const year = parseInt(formData.get("year"));
    const genreName = formData.get("genre");
    const language = formData.get("language");

    const bookData = {};
    if (title) bookData.title = title;
    if (author) bookData.author = author;
    if (publisher) bookData.publisher = publisher;
    if (year) {
        if (year > getYear(new Date()))
            return { success: false, yearError: "กรุณาระบุปีที่ถูกต้อง" }
        bookData.year = parseInt(year);
    }

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