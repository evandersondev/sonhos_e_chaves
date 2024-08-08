'use client'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { getImmobile } from '@/data/get-Immobile'
import { ImmobileType } from '@/types/immobile-type'
import { Bath, Bed, Car, MessageCircle, Ruler } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type ImmobilePageProps = {
  params: {
    id: string
  }
}

export default function ImmobilePage({ params }: ImmobilePageProps) {
  const [imageSelected, setImageSelected] = useState<string>()
  const [immobile, setImmobile] = useState<ImmobileType>()

  function handleSelectedImage(url: string) {
    setImageSelected(url)
  }

  async function loadImmobile() {
    const result = await getImmobile(params.id)
    setImmobile(result)
    setImageSelected(result.photosId[0])
  }

  useEffect(() => {
    loadImmobile()
  }, [])

  function handleOpenContact() {
    const url = `https://api.whatsapp.com/send/?phone=${'85991919191'}&text=${encodeURIComponent(`Olá! Quero ser contatado sobre este imóvel à Venda que vi em Sonhos & Chaves. http://localhost:3000/${params.id}`)}`

    window.open(url, '_blank')
  }

  return (
    <div className="mx-auto w-[1280px] h-[500px] items-center grid gap-12 mt-8 grid-cols-2">
      <div className="flex flex-col items-center w-full">
        <div className="w-full h-full mb-4 overflow-hidden aspect-square">
          <Image
            className="object-cover border rounded-md aspect-square h-full w-full"
            src={`https://dotlxibjbjydutyvfurz.supabase.co/storage/v1/object/public/${imageSelected}`}
            alt=""
            width={600}
            height={600}
            quality={100}
          />
        </div>
        <div>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-lg"
          >
            <CarouselContent>
              {immobile?.photosId?.map((id) => (
                <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/4">
                  <Button
                    onClick={() => handleSelectedImage(id)}
                    variant="outline"
                    className="p-0 overflow-hidden rounded-md shadow-none w-28 h-28"
                  >
                    <Image
                      className="object-cover w-full h-full"
                      src={`https://dotlxibjbjydutyvfurz.supabase.co/storage/v1/object/public/${id}`}
                      alt=""
                      width={100}
                      height={100}
                      quality={100}
                    />
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="mb-4 text-xl font-bold">{immobile?.name && `${immobile.name} |`} {immobile?.address}</h2>
        <span className="text-sm text-muted-foreground">A Partir de</span>
        <span className="mb-8 text-4xl font-bold">{immobile.price}</span>
        <Separator orientation="horizontal" className="h-[1px] bg-zinc-100" />
        <div className="flex items-center gap-6 mt-8 text-muted-foreground">
          { immobile?.size &&  <span className="flex items-center gap-2">
            <div className="flex items-center justify-center border rounded-md size-10 bg-zinc-50">
              <Ruler className="size-4" />
            </div>
            {immobile.size}m²
          </span>}
          {immobile?.rooms && <span className="flex items-center gap-2">
            <div className="flex items-center justify-center border rounded-md size-10 bg-zinc-50">
              <Bed className="size-4" />
            </div>
            {immobile.rooms} quarto(s)
          </span>}
          {immobile?.bathrooms && <span className="flex items-center gap-2">
            <div className="flex items-center justify-center border rounded-md size-10 bg-zinc-50">
              <Bath className="size-4" />
            </div>
            {immobile.bathrooms} banheiro(s)
          </span>}
          {immobile?.garage && <span className="flex items-center gap-2">
            <div className="flex items-center justify-center border rounded-md size-10 bg-zinc-50">
              <Car className="size-4" />
            </div>
            {immobile.garage} garagem
          </span>}
        </div>

        <div className="w-full">
          {immobile?.description && (
            <pre className="font-sans text-wrap">
              <p className="leading-relaxed">{immobile.description}</p>
            </pre>
          )}
        </div>

        <Button
          onClick={handleOpenContact}
          className="gap-2 bg-green-500 hover:bg-green-600 w-fit"
        >
          <MessageCircle className="size-4" />
          Quero saber mais
        </Button>
      </div>
    </div>
  )
}
