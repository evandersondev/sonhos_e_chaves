import { api } from "@/lib/api";
import { ImmobileType } from "@/types/immobile-type";

export async function editImmobile(immobile: ImmobileType) {
    await api.put(`/immobiles/edit/${immobile.id}`, immobile)
  }
  