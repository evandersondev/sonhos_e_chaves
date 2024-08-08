import { prisma } from '@/lib/prisma'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  await prisma.immobile.delete({
    where: {
      id: params.id,
    },
  })

  return Response.json({})
}
