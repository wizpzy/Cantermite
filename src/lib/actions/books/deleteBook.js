"use server";

import prisma from "@/lib/prisma";
import supabase from "@/lib/supabase";

export async function deleteBook(bookId) {
    try {
        const borrowedCopy = await prisma.book_copy.findFirst({
            where: {
                book_id: bookId,
                status: "borrowed"
            }
        });

        if (borrowedCopy)
            return { success: false, message: "ไม่สามารถลบหนังสือได้ เนื่องจากมีสมาชิกกำลังยืมหนังสือนี้อยู่"}

        const bookInfo = await prisma.book_title.update({
            where: {
                book_id: bookId
            },
            data: {
                is_deleted: true,
                deleted_at: new Date()
            }
        });

        await prisma.book_copy.updateMany({
            data: {
                status: "deleted"
            },
            where: {
                book_id: bookId
            }
        })

        // await supabase.storage.from("book_cover").remove(`${bookId}_cover`);
        return { success: true, message: `ลบหนังสือ ${bookInfo.title} สำเร็จ`}
    } catch (error) {
        console.log(error);
        return { success: false, message: error }
    }
}