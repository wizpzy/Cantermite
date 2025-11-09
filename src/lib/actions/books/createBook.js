"use server";

import { randomId } from "@/utils/randomId";
import prisma from "@/lib/prisma";
import supabase from "@/lib/supabase";

export async function createBook(prevstate, formData) {
    const bookId = randomId(6);
    const title = formData.get("title");
    const author = formData.get("author");
    const publisher = formData.get("publisher");
    const year = parseInt(formData.get("year"));
    const genreName = formData.get("genre");
    const language = formData.get("language");
    const amount = formData.get("amount");
    const image = formData.get("imageFile");
    const inputError = {};

    try {
        if (!title) inputError.titleError = "กรุณากรอกข้อมูลให้ครบถ้วน"
        if (!author) inputError.authorError = "กรุณากรอกข้อมูลให้ครบถ้วน"
        if (!year) inputError.yearError = "กรุณากรอกข้อมูลให้ครบถ้วน"
        if (!language) inputError.languageError = "กรุณากรอกข้อมูลให้ครบถ้วน"
        if (!amount) inputError.amountError = "กรุณากรอกข้อมูลให้ครบถ้วน"
        if (!title || !author || !year || !language || !amount)
            throw inputError

        const newBook = await prisma.book_title.create({
            data: {
                book_id: bookId,
                title,
                author,
                publisher,
                year,
                language
            }
        });
        const genre = await prisma.genre.findFirst({
            where: {
                genre_name: genreName
            }
        });
        const bookGenre = await prisma.book_genre.create({
            data: {
                book_id: bookId,
                genre_id: genre.genre_id
            }
        });

        if (image.size > 0 && image.type.startsWith("image")) {
            const { data, error } = await supabase.storage.from("book_cover").upload(`${bookId}_cover`, image);
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

        await prisma.book_copy.createMany({
            data: Array.from({ length: amount }, () => ({
                copy_id: randomId(10),
                book_id: bookId,
                status: "available"
            }))
        })

        return { success: true, title }
    } catch (error) {
        console.log(error);
        return { success: false, error }
    }


}