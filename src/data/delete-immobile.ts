import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import { ImmobileType } from '@/types/immobile-type'

export async function deleteImmobile(immobile: ImmobileType) {
  try {
    await api.delete(`/immobiles/delete/${immobile.id}`)
    await supabase.storage.from(`poc`).remove([...immobile.photosId.map(item => item.split('poc/')[1]) ])
  }
  catch(error) {
    console.log(error)
  }
}
