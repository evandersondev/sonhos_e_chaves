import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const {
      q,
      rooms,
      bathrooms,
      carage,
      type,
      page = 1,
    } = Object.fromEntries(new URL(request.url).searchParams);
    const skip = (Number(page) - 1) * 10;

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

    // Faz a query no Prisma usando os filtros
    const immobiles = await prisma.immobile.findMany({
      where: filters,
      skip,
    });

    const totalCount = await prisma.immobile.count({
      where: filters,
    });

    return NextResponse.json({
      immobiles,
      totalCount,
      totalPages: Math.ceil(totalCount / 10),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Erro ao carregar os imóveis." });
  }
}
