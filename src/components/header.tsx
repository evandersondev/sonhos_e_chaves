'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import iconImage from '../../public/icon.svg'
import { HeaderNavigation } from './header-navigation'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='sticky top-0 left-0 right-0 z-40 h-16 transition-colors border-b border-b-bg-zinc-200/30 backdrop-blur supports-backdrop-blur:bg-zinc-100/95'
    >
      <div className='container h-full flex items-center justify-between'>
        <Link href='/'>
          <div className='flex items-center justify-center'>
            <Image
              src={iconImage}
              alt='Sonhos & Chaves'
              width={120}
              height={120}
              className='h-12 w-12'
            />
          </div>
        </Link>

        <HeaderNavigation />
      </div>
    </motion.header>
  )
}
