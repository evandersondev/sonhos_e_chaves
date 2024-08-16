import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("");
    const rooms = searchParams.get("");
    const bathrooms = searchParams.get("");
    const carage = searchParams.get("");
    const type = searchParams.get("");
    const page = Number(searchParams.get("")) || 1;

    const limit = 8;
    const skip = (Number(page) - 1) * limit;

    const filters = {};

    if (q) {
      filters["OR"] = [
        { address: { contains: q, mode: "insensitive" } },
        { name: { contains: q, mode: "insensitive" } },
      ];
    }

    if (rooms) {
      filters["rooms"] = parseInt(rooms);
    }

    if (bathrooms) {
      filters["bathrooms"] = parseInt(bathrooms);
    }

    if (carage) {
      filters["carage"] = parseInt(carage);
    }

    if (type) {
      filters["type"] = type;
    }

    const immobiles = await prisma.immobile.findMany({
      where: filters,
      take: limit,
      skip,
    });

    const totalCount = await prisma.immobile.count({
      where: filters,
    });

    return NextResponse.json({
      immobiles,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Erro ao carregar os imóveis." });
  }
}
