import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const bodySchema = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  type: z.enum(['apartment', 'condominium', 'house']).optional(),
  price: z.string().optional(),
  size: z.string().optional(),
  rooms: z.number().optional(),
  bathrooms: z.number().optional(),
  garage: z.number().optional(),
  description: z.string().optional(),
})

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = bodySchema.parse(await req.json())
  await prisma.immobile.update({
    where: {
      id: params.id,
    },
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
    },
  })

  return Response.json({})
}
