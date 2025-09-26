"use server";

import { getAuthSession } from "@/lib/session";
import { getUserById } from "@/lib/db";
import { randomId } from "@/utils/randomId";
import { reformatDueDate } from "@/utils/date";
import prisma from "@/lib/prisma";

export async function sendBorrowRequest(formData) {
    const session = await getAuthSession();
    const userData = session?.userId ? await getUserById(session.userId, { user_id: true }) : null;
    const borrowId = randomId(10);
    const bookId = formData.get("bookId");
    try {
        const bookCopy = await prisma.book_copy.findFirst({
            where: {
                book_id: bookId,
                status: "available",
            },
        });
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
                // book_copy_id: bookCopy.copy_id,
                // user_borrowing_detail_member_idTouser: userData,
            }
        });
        await prisma.book_copy.update({
            data: {
                status: "reserved"
            },
            where: {
                copy_id: bookCopy.copy_id
            }
        })
        console.log("Borrow request sent:");
    } catch (error) {
        console.log(error)
    }

    // console.log(formData);
};