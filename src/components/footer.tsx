'use client'

import { motion } from 'framer-motion'
import { Instagram, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import logoImage from '../../public/logo.svg'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function Footer() {
  function handleOpenWhatsapp() {
    const url = `https://api.whatsapp.com/send/?phone=8591910416&text=${encodeURIComponent(`Olá! Quero ser contatado sobre este imóveis à Venda que vi em Sonhos & Chaves.`)}`

    window.open(url, '_blank')
  }

  function handleOpenInstagram() {
    const url = `https://www.instagram.com/sonhosechaves`

    window.open(url, '_blank')
  }

  return (
    <motion.footer
      viewport={{ amount: 'all', once: true, margin: '150px' }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full bg-white '
    >
      <div className='py-16 h-[300] grid grid-cols-1 gap-6 md:grid-cols-2 justify-between container'>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex items-center'>
            <Image
              src={logoImage}
              alt='Sonhos & Chaves'
              width={150}
              height={150}
              className='h-36 w-36'
            />
          </div>

          <span className='text-muted-foreground text-sm leading-relaxed'>
            Rua Antero Quental 337
          </span>
          <span className='text-muted-foreground text-sm leading-relaxed'>
            Loja 02 Paupina - CE Fortaleza
          </span>
          <span className='text-muted-foreground text-sm leading-relaxed'>
            CEP 60873-652
          </span>
        </div>

        <div className='flex flex-col justify-center gap-6'>
          <h4 className='text-center font-medium'>
            Seu novo lar está a <br />
            apenas um clique de distância.
          </h4>

          <div className='flex items-center justify-center gap-4 div'>
            <Button onClick={handleOpenInstagram} variant='outline' size='icon'>
              <Instagram className='size-5 text-primary' />
            </Button>
            <Separator orientation='vertical' className='h-5 bg-zinc-200' />
            <Button onClick={handleOpenWhatsapp} variant='outline' size='icon'>
              <MessageCircle className='size-5 text-primary' />
            </Button>
            {/* <Link
              href="mailto:evandersonvasconcelos23@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <Mail className="size-5 text-primary" />
              </Button>
            </Link> */}
          </div>
        </div>
      </div>

      <div className='flex items-center h-16 border-t border-zinc-100'>
        <div className='container flex items-center justify-center md:justify-start flex-col'>
          <span className='text-[10px] md:text-xs text-muted-foreground'>
            © {new Date().getFullYear()} Sonhos&Chaves. Todos os direitos
            reservados.
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
