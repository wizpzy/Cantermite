import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const genres = await prisma.genre.findMany();
        return NextResponse.json(genres, { status: 200 });
    } catch (error) {
        console.error("Error fetching genres:", error);
        return NextResponse.json(error, { status: 500 });
    }
}