"use server";

import { getYear } from "date-fns";
import prisma from "@/lib/prisma";
import supabase from "@/lib/supabase";

export async function editBook(prevstate, formData) {
    const bookId = formData.get("bookId");
    const title = formData.get("title");
    const author = formData.get("author");
    const publisher = formData.get("publisher");
    const year = parseInt(formData.get("year"));
    const genreName = formData.get("genre");
    const language = formData.get("language");
    const image = formData.get("imageFile");

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

        if (image.size > 0 && image.type.startsWith("image")) {
            const { data, error } = await supabase.storage.from("book_cover").upload(`${bookId}_cover`, image, {upsert: true});
            if (error) {
                throw error;
            }

            await prisma.book_title.update({
                where: {
                    book_id: bookId
                },
                data: {
                    image_path: `${bookId}_cover`
                }
            })
        }

        return { success: true };
    } catch (error) {
        console.log(error)
        return { success: false, error };
    }
}