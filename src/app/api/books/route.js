import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const sort = searchParams.get("sort") || "title"; // Default sort by title;
    try {
        if (sort === "popular") {
            const popularBooks = await prisma.$queryRaw
            `
            SELECT bt.*, COALESCE(COUNT(bd.borrow_id), 0)::int AS borrow_count
            FROM book_title bt
            LEFT JOIN book_copy bc
                ON bc.book_id = bt.book_id
            LEFT JOIN borrowing_detail bd
                ON bd.book_copy_id = bc.copy_id
                AND bd.status = 'returned'
            GROUP BY bt.book_id, bt.title, bt.author
            ORDER BY borrow_count DESC, bt.title ASC;
            `
            return NextResponse.json(popularBooks, { status: 200 });
        }
        else {
            const books = await prisma.book_title.findMany();
            return NextResponse.json(books, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json(error, { status: 500 });
    }


}

export async function POST(req) {
    const body = await req.json();
    // console.log("body:", JSON.stringify(body.data, null, 2));

    try {
        for (const book of body.data.books) {
            console.log("Creating book:", JSON.stringify(book, null, 2));
            const newId = crypto.randomBytes(16).toString("base64").replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);
            const newBook = await prisma.book_title.create({
                data: {
                    book_id: newId,
                    title: book.title,
                    author: book.author,
                    year: book.year,
                    language: book.language,
                    image_path: book.cover_id ? book.cover_id.toString() : null,
                }
            });
            const genre = await prisma.genre.findFirst({
                where: { genre_name: book.genre }
            });
            const newBookGenre = await prisma.book_genre.create({
                data: {
                    book_id: newId,
                    genre_id: genre.genre_id
                }
            });
        }
    } catch (error) {
        console.error("Error creating books:", error);
        return NextResponse.json({ error: "Failed to create books" }, { status: 500 });
    }

    return NextResponse.json({ message: "Book created" }, { status: 201 });
}