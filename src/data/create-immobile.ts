import { api } from '@/lib/api'
import { ImmobileType } from '@/types/immobile-type'

export async function createImmobile(immobile: ImmobileType) {
  await api.post('/immobiles/create', immobile)
}
