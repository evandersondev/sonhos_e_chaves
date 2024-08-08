import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const immobiles = await prisma.immobile.findMany()

    return NextResponse.json(immobiles)
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Erro ao carregar os imóveis.' })
  }
}
