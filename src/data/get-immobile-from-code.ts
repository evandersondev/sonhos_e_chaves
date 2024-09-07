'use server'

import { prisma } from '@/lib/prisma'
import { ImmobileType } from '@/types/immobile-type'

export async function getImmobileFromCode(
  code?: string
): Promise<ImmobileType | null> {
  const immobile = await prisma.immobile.findFirst({
    where: {
      code
    }
  })

  return immobile
}
