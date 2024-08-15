'use client'

import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filters } from './filters'

type HeroProps = {
  searchParams?: { 
    q?: string,
    rooms?: string,
    bathrooms?: string,
    garage?: string,
    type?: string
  }
}

export function Hero() {
  const searchParams = useSearchParams()
  const {replace, push, } = useRouter()

  return (
      <motion.div viewport={{amount: 'all', once: true}} initial={{opacity: 0, y: 8}} whileInView={{ opacity: 1, y: 0 }} transition={{duration: 0.5}} className="py-16 w-full">
        <div className="container h-[400px] flex-col p-40 items-center relative flex justify-center overflow-clip rounded-2xl">
          <h1 className="mb-8 text-6xl font-bold text-center">
            Seu novo lar está a apenas um clique de distância.
          </h1>
          <p className="px-16 text-xl text-center text-muted-foreground">
            Ser a imobiliária mais confiável e inovadora da região metropolitana,
            reconhecida pelo compromisso com a excelência e pela satisfação dos
            nossos clientes.
          </p>
        </div>

      <div className='container'>
        <Filters onHanldeSearch={async () => {
          push(`immobiles?${searchParams.toString()}`)
        }} /> 
      </div>
    </motion.div>
  )
}
