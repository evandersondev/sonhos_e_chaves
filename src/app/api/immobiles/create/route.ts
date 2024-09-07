import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const bodySchema = z.object({
  code: z.string(),
  name: z.string().optional(),
  address: z.string(),
  type: z.enum([
    'apartment',
    'condominium',
    'house',
    'ground',
    'commercial',
    'residential'
  ]),
  price: z.string(),
  size: z.string(),
  rooms: z.number(),
  bathrooms: z.number(),
  garage: z.number(),
  description: z.string(),
  photosId: z.array(z.string())
})

export async function POST(req: Request) {
  const body = bodySchema.parse(await req.json())

  await prisma.immobile.create({
    data: {
      code: body.code,
      name: body.name,
      address: body.address,
      type: body.type,
      price: body.price,
      size: body.size,
      rooms: body.rooms,
      bathrooms: body.bathrooms,
      garage: body.garage,
      description: body.description,
      photosId: body.photosId
    }
  })

  return Response.json({})
}
