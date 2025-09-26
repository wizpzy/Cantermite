import prisma from "./prisma";

export async function getUserById(userId, select = null) {
    return await prisma.user.findUnique({
        where: { user_id: userId },
        select
    });
}

export async function getBookById(bookId) {
    return await prisma.book_title.findUnique({
        where: { book_id: bookId }
    });
}

export async function getUserCurrentTier(userId) {
    return (await prisma.subscription.findFirst({
        where: { user_id: userId },
        orderBy: { end_date: 'desc' },
        select: { tier: true }
    }))?.tier || "Guest";
}

export async function getAvailableCopy(bookId) {
    return await prisma.book_copy.findFirst({
            where: {
                book_id: bookId,
                status: "available",
            },
        });
}