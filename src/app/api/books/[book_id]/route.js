import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { book_id } = await params;
    try {
        const book = await prisma.book_title.findUnique({
            where: { book_id: book_id }
        });
        if (book) {
            return NextResponse.json(book, { status: 200 });
        } else {
            return NextResponse.json({ message: "Book not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return NextResponse.json(error, { status: 500 });
    }
}