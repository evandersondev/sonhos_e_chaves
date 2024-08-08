import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const immobile = await prisma.immobile.findUnique({
      where: { id: params.id },
    })

    return NextResponse.json(immobile)
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Erro ao carregar os imóvel.' })
  }
}
