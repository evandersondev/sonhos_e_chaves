'use client'

import { motion } from 'framer-motion'
import { FiltersHome } from './filters-home'

export function Hero() {

  return (
    <motion.div
      viewport={{ amount: 'all', once: true }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='py-16 w-full'
    >
      <div className='container md:h-[400px] flex-col p-6 md:p-20 lg:p-40 items-center relative flex justify-center rounded-2xl'>
        <h1 className='mb-4 text-secondary md:mb-8 text-4xl px-20 md:text-5xl lg:text-6xl font-bold text-center'>
          Seu novo lar está a apenas um clique de distância.
        </h1>
        <p className='px-0 md:px-16 text-base md:text-xl text-center text-muted-foreground'>
          Na Sonhos&Chaves, nossa missão é transformar o sonho da casa própria
          em uma realidade. Com experiência no mercado imobiliário, oferecemos
          uma abordagem personalizada para ajudar você a encontrar o lar
          perfeito.
        </p>
      </div>

      <div className='w-full max-w-[700px] px-8 mx-auto'>
        <FiltersHome />
      </div>
    </motion.div>
  )
}
