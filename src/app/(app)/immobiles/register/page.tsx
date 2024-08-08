import { ImmobileForm } from './_components/immobile-form'

export default function RegisterImmobile() {
  return (
    <div className="container py-8 space-y-4">
      <h1 className='font-semibold text-4xl'>Cadastrar Imóvel</h1>
      <ImmobileForm />
    </div>
  )
}
