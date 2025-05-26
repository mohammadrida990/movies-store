import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const count = await prisma.movie.count();

    if (count === 0) {
      return NextResponse.json(
        { error: "No movies available" },
        { status: 404 }
      );
    }

    const randomIndex = Math.floor(Math.random() * count);

    const randomMovie = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovie[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
