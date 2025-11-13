"use server";

import { randomId } from "@/utils/randomId";
import prisma from "@/lib/prisma";

export async function createGenre(prevstate, formData) {
    const genreId = randomId(3);
    const genreName = formData.get("name");
    const description = formData.get("description");
    const inputError = {};

    try {
        if(!genreName) inputError.nameError = "กรุณากรอกข้อมูลให้ครบถ้วน"
        if(!description) inputError.descriptionError = "กรุณากรอกข้อมูลให้ครบถ้วน"
        if(!genreName || !description)
            return { success: false, inputError }

        const createdGenre = await prisma.genre.create({
            data: {
                genre_id: genreId,
                genre_name: genreName,
                description
            }
        });

        return { success: true, message: `สร้างหมวดหมู่ ${createdGenre.genre_name} สำเร็จ` }

    } catch (error) {
        console.log(error);
        return { success: false, message: "เกิดปัญหาขัดข้องภายในเซิร์ฟเวอร์"}
    }
}