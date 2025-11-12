"use server";

import prisma from "@/lib/prisma";

export async function deleteGenre(genreId) {
    try {
        const childBook = await prisma.book_genre.findFirst({
            where: {
                genre_id: genreId
            }
        });

        if (childBook)
            return { success: false, message: "ไม่สามารถลบหมวดหมู่ได้ เนื่องจากมีหนังสือหมวดหมู่นี้อยู่" }

        const genreInfo = await prisma.genre.update({
            where: {
                genre_id: genreId
            },
            data: {
                is_deleted: true,
                deleted_at: new Date()
            }
        });

        return { success: true, message: `ลบหมวดหมู่ ${genreInfo.genre_name} สำเร็จ` }
    } catch (error) {
        console.log(error);
        return { success: false, message: error }
    }
}