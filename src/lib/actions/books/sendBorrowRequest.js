"use server";

import { getAvailableCopy, getUserById } from "@/lib/db";
import { randomId } from "@/utils/randomId";
import { reformatDueDate } from "@/utils/date";
import { verifySession } from "../../dal";
import prisma from "@/lib/prisma";

export async function sendBorrowRequest(prevstate, formData) {
    const session = await verifySession();
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

