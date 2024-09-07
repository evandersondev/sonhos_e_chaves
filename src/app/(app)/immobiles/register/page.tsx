'use client'

import { motion } from 'framer-motion'
import { ImmobileForm } from './_components/immobile-form'

export default function RegisterImmobile() {
  return (
    <div className='container py-8 space-y-4'>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeIn' }}
      >
        <h1 className='font-semibold text-4xl'>Cadastrar Imóvel</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeIn' }}
      >
        <ImmobileForm />
      </motion.div>
    </div>
  )
}
