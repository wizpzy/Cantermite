"use server";

import prisma from "@/lib/prisma";

export async function editGenre(prevstate, formData) {
    const genreId = formData.get("genreId");
    const genre_name = formData.get("name");
    const description = formData.get("description");

    const genreData = {};
    if (genre_name) genreData.genre_name = genre_name;
    if (description) genreData.description = description;

    try {
        // if (Object.keys(genreData).length > 0) {
        const genreResult = await prisma.genre.update({
            where: {
                genre_id: genreId
            },
            data: genreData
        });

        return { success: true, message: "แก้ไขข้อมูลหมวดหมู่สำเร็จแล้ว" }
        // }
    } catch (error) {
        console.log(error);
        return { success: false, message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" };
    }
}