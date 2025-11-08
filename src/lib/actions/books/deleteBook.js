"use server";

import prisma from "@/lib/prisma";
import supabase from "@/lib/supabase";

export async function deleteBook(bookId) {
    try {
        await prisma.book_title.delete({
            where: {
                book_id: bookId
            }
        });

        await supabase.storage.from("book_cover").remove(`${bookId}_cover`);
    } catch (error) {
        console.log(error);
    }
}