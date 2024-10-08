import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get('q')
  const rooms = searchParams.get('rooms')
  const bathrooms = searchParams.get('bathrooms')
  const carage = searchParams.get('carage')
  const type = searchParams.get('type')
  const page = Number(searchParams.get('')) || 1
  const limit = Number(searchParams.get('limit')) || 8
  const skip = (Number(page) - 1) * limit
  const filters = {}

  if (q) {
    filters['OR'] = [
      { address: { contains: q, mode: 'insensitive' } },
      { name: { contains: q, mode: 'insensitive' } }
    ]
  }

  if (rooms) {
    filters['rooms'] = parseInt(rooms)
  }

  if (bathrooms) {
    filters['bathrooms'] = parseInt(bathrooms)
  }

  if (carage) {
    filters['carage'] = parseInt(carage)
  }

  if (type) {
    filters['type'] = type
  }

  try {
    const immobiles = await prisma.immobile.findMany({
      where: filters,
      take: limit,
      skip
    })

    const totalCount = await prisma.immobile.count({
      where: filters
    })

    return NextResponse.json({
      immobiles,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page)
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Erro ao carregar os imóveis.' })
  }
}
