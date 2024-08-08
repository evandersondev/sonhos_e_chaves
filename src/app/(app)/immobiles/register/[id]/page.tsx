import { getImmobile } from "@/data/get-Immobile";
import { Suspense } from "react";
import { ImmobileForm } from "../_components/immobile-form";

type ImmobileEditProps = {
    params: {
      id: string
    }
  }

export default async function ImmobileEdit({params}: ImmobileEditProps) {
    const immobile = await getImmobile(params.id)

    return (
        <div className="container py-8 space-y-4">
            <h1 className='font-semibold text-4xl'>Editar Imóvel</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ImmobileForm immobile={immobile} />
            </Suspense>
        </div>
    )
}