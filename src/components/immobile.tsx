'use client'

import { api } from '@/lib/api'
import { ImmobileType } from '@/types/immobile-type'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ImmobileCard } from './immobile-card'
import { Button } from './ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel'
import { Skeleton } from './ui/skeleton'

interface ResponseData {
  immobiles: ImmobileType[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export function Immobile() {
  const [immobiles, setImmobiles] = useState<ImmobileType[]>([])

  useEffect(() => {
    async function load() {
      const response = await api.get<ResponseData>('/immobiles?limit=8')

      setImmobiles(response.data.immobiles)
    }

    load()
  }, [])

  return (
    <motion.div
      viewport={{ amount: 'all', once: true, margin: '150px' }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full py-16 bg-white'
    >
      <div className='mb-12 container flex justify-between items-center'>
        <div className='flex flex-col'>
          <h2 className='text-xl md:text-2xl font-bold'>Imóveis</h2>
          <p className='text-sm md:text-base'>
            Imóveis que inspiram. Lares que acolhem.
          </p>
        </div>

        <Button asChild size='sm' variant='outline'>
          <Link href='/immobiles'>Ver tudo</Link>
        </Button>
      </div>

      <div className='px-20'>
        <Carousel
          opts={{
            align: 'start'
          }}
          className='w-full max-w-5xl mx-auto'
        >
          <CarouselContent>
            {immobiles?.length < 1
              ? Array.from({ length: 10 }, (_, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className='w-full md:basis-1/2 lg:basis-1/3'
                  >
                    <Skeleton className='h-[470px] w-full p-1' />
                  </CarouselItem>
                )
              })
              : immobiles?.map(immobile => {
                return (
                  <CarouselItem
                    key={immobile.code}
                    className='w-full md:basis-1/2 lg:basis-1/3'
                  >
                    <ImmobileCard immobile={immobile} />
                  </CarouselItem>
                )
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </motion.div>
  )
}
