import { api } from '@/lib/api'
import { ImmobileType } from '@/types/immobile-type'

export async function getImmobiles(): Promise<ImmobileType[]> {
  const response = await api.get('/immobiles')

  return response.data
}
