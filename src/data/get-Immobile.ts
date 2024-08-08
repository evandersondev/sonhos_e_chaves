import { api } from '@/lib/api'
import { ImmobileType } from '@/types/immobile-type'

export async function getImmobile(id: string): Promise<ImmobileType> {
  const response = await api.get(`/immobiles/${id}`)

  return response.data
}
