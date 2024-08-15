'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <motion.header initial={{opacity: 0, y: -8}} whileInView={{ opacity: 1, y: 0 }} transition={{duration: 0.5}} className="sticky top-0 left-0 right-0 z-40 h-16 transition-colors border-b border-b-bg-zinc-200/30 backdrop-blur supports-backdrop-blur:bg-zinc-100/95">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">LOGO</h1>
        </div>

        <nav className="flex items-center gap-10">
          <Link
            className="hover:font-semibold hover:text-primary font-semibold transition-colors"
            href="/"
          >
            Inicio
          </Link>
          <Separator orientation="vertical" className="h-5 bg-zinc-200" />
          <Link
            className="hover:font-semibold hover:text-primary font-semibold transition-colors"
            href="/immobiles"
          >
            Imóveis
          </Link>
          <Separator orientation="vertical" className="h-5 bg-zinc-200" />
          <Link
            className="hover:font-semibold hover:text-primary font-semibold transition-colors"
            href="/"
          >
            Sobre nós
          </Link>
          <Separator orientation="vertical" className="h-5 bg-zinc-200" />
          <Link
            className="hover:font-semibold hover:text-primary font-semibold transition-colors"
            href="/"
          >
            Contato
          </Link>
        </nav>

        <Button variant="outline">Entre em contato</Button>
      </div>
    </motion.header>
  )
}
