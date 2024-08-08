'use client'

import { getImmobiles } from '@/data/get-immobiles'
import { supabase } from '@/lib/supabase'
import { ImmobileType } from '@/types/immobile-type'
import { Lamp, ShowerHead, Warehouse } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { Skeleton } from './ui/skeleton'

export function Immobile() {
  const router = useRouter()

  const [immobiles, setImmobiles] = useState<ImmobileType[]>([])

  useEffect(() => {
    async function load() {
      const response = await getImmobiles()
      setImmobiles(response)

      const { data } = await supabase.storage
        .from('poc/298986')
        .getPublicUrl('zf96moddlb0d1.png')

      console.log(data.publicUrl)
    }

    load()
  }, [])

  function handleImmbileView(index: string) {
    router.push(`/${index}`)
  }

  return (
    <div className="w-full py-16 bg-white">
      <div className="mb-12 mx-auto w-[1280px] flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Imóveis</h2>
          <p>Imóveis que inspiram. Lares que acolhem.</p>
        </div>

        <Button asChild variant="outline">
          <Link href="/immobiles">Ver tudo</Link>
        </Button>
      </div>

      <div>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {immobiles.length < 1
              ? Array.from({ length: 10 }, (_, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <Skeleton className="h-[470px] w-full p-1" />
                    </CarouselItem>
                  )
                })
              : immobiles?.map((immobile) => {
                  return (
                    <CarouselItem
                      key={immobile.code}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="h-[470px]">
                        <Card className="shadow-none overflow-hidden">
                          <CardHeader className="w-full h-60 p-0 rounded-t-md">
                            <Image
                              src={`https://dotlxibjbjydutyvfurz.supabase.co/storage/v1/object/public/${immobile.photosId[0]}`}
                              className="h-full w-full object-cover"
                              alt={immobile.address}
                              width={400}
                              height={400}
                              quality={90}
                            />
                          </CardHeader>
                          <CardContent className="flex flex-col p-4">
                            <span className="text-xl font-semibold">
                              {immobile.price}
                            </span>
                            <span className="mb-4">{immobile.size}</span>

                            <div className="flex flex-col gap-2">
                              <span className="flex items-center gap-2 text-sm">
                                <Lamp className="size-4" />
                                {immobile.rooms} quartos
                              </span>
                              <span className="flex items-center gap-2 text-sm">
                                <ShowerHead className="size-4" />
                                {immobile.bathrooms} banheiros
                              </span>
                              <span className="flex items-center gap-2 text-sm">
                                <Warehouse className="size-4" />
                                {immobile.garage} garagem
                              </span>
                            </div>
                            <Button
                              onClick={() => handleImmbileView(immobile.id)}
                              variant="outline"
                              className="self-end mt-2 w-fit"
                            >
                              Visualizar
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )
                })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
