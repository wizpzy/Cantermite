import prisma from "./prisma";

// USER

export async function getUserById(userId, select = null) {
    return await prisma.user.findUnique({
        where: { user_id: userId },
        select
    });
}

export async function getUserCurrentTier(userId) {
    return (await prisma.subscription.findFirst({
        where: { 
            member_id: userId,
            status: "active"
         },
        orderBy: { end_date: 'desc' },
        select: { tier: true }
    }))?.tier || "Guest";
}

export async function getTier(tier) {
    return (await prisma.membership_tier.findFirst({
        where: { tier }
    }));
}

// BOOK

export async function getBookById(bookId) {
    const bookData = await prisma.book_title.findUnique({
        where: { book_id: bookId },
        include: {
            book_genre: {
                select: {
                    genre: {
                        select: {
                            genre_name: true
                        }
                    }
                }
            }
        }
    });
    bookData.genre_name = bookData.book_genre[0].genre.genre_name;
    delete bookData.book_genre;
    return bookData;
}

export async function getAvailableCopy(bookId) {
    return await prisma.book_copy.findFirst({
            where: {
                book_id: bookId,
                status: "available",
            },
        });
}

export async function getPopularBooks(limit) {
    return await prisma.$queryRaw
            `
            SELECT bt.*, COALESCE(COUNT(bd.borrow_id), 0)::int AS borrow_count
            FROM book_title bt
            LEFT JOIN book_copy bc
                ON bc.book_id = bt.book_id
            LEFT JOIN borrowing_detail bd
                ON bd.book_copy_id = bc.copy_id
                AND bd.status = 'returned'
            GROUP BY bt.book_id, bt.title, bt.author
            ORDER BY borrow_count DESC, bt.title ASC
            LIMIT ${limit};
            `;
}

export async function getAllGenres(limit) {
    return await prisma.genre.findMany({
        orderBy: { genre_name: 'asc' },
        take: limit
    });
}

// SPACE

export async function getSpaceById(spaceId) {
    return await prisma.working_space.findUnique({
        where: {
            space_id: spaceId
        },
        include: {
            space_type: true
        }
    });
}

export async function getSmallSpace() {
    return await prisma.working_space.findMany({
        include: {
            space_type: true
        },
        where: {
            space_type: {
                capacity: {
                    lt: 4
                }
            }
        }
    });
}

export async function getLargeSpace() {
    return await prisma.working_space.findMany({
        include: {
            space_type: true
        },
        where: {
            space_type: {
                capacity: {
                    gte: 4
                }
            }
        }
    });
}