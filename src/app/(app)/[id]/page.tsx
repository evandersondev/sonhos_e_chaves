"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getImmobile } from "@/data/get-Immobile";
import { ImmobileType } from "@/types/immobile-type";
import { Bath, Bed, Car, MessageCircle, Ruler } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type ImmobilePageProps = {
  params: {
    id: string;
  };
};

export default function ImmobilePage({ params }: ImmobilePageProps) {
  const [imageSelected, setImageSelected] = useState<string>("");
  const [immobile, setImmobile] = useState<ImmobileType>();
  const [loading, setLoading] = useState(false);

  function handleSelectedImage(url: string) {
    setLoading(true);
    setImageSelected(url);
    setLoading(false);
  }

  async function loadImmobile() {
    setLoading(true);
    const result = await getImmobile(params.id);
    setImmobile(result);
    setImageSelected(result.photosId[0]);
    setLoading(false);
  }

  useEffect(() => {
    loadImmobile();
  }, []);

  function handleOpenContact() {
    const url = `https://api.whatsapp.com/send/?phone=8591910416&text=${encodeURIComponent(`Olá! Quero ser contatado sobre este imóvel à Venda que vi em Sonhos & Chaves. Código: ${immobile.code} - link: http://localhost:3000/${params.id}`)}`;

    window.open(url, "_blank");
  }

  return (
    <div className="mx-auto w-full lg:w-[1280px] items-center grid gap-12 py-6 grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center w-full">
        <div className="w-full h-[500px] mb-4 overflow-hidden aspect-square">
          {loading ? (
            <div className="w-full h-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <Image
              className="object-cover border rounded-md aspect-square h-full w-full"
              src={imageSelected}
              alt={immobile?.code}
              width={700}
              height={700}
            />
          )}
        </div>
        <div className="w-full px-12">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full h-28"
          >
            <CarouselContent>
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-3/2  lg:basis-1/4"
                    >
                      <Skeleton className="h-28 w-28 p-1" />
                    </CarouselItem>
                  ))
                : immobile?.photosId?.map((id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/2 lg:basis-1/4"
                    >
                      <Button
                        onClick={() => handleSelectedImage(id)}
                        variant="outline"
                        className="p-0 overflow-hidden rounded-md shadow-none w-28 h-28"
                      >
                        <Image
                          className="object-cover w-full h-full"
                          src={id}
                          alt={immobile?.code}
                          width={100}
                          height={100}
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

      <div className="flex flex-col w-full justify-between  h-full">
        {loading ? (
          <div className="h-full w-full">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <div className="h-full w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">
                {immobile?.name && `${immobile.name} |`} {immobile?.address}
              </h2>
              <span className="text-sm text-muted-foreground leading-snug">
                A Partir de
              </span>
              <span className="mb-6 flex items-end justify-between text-4xl font-bold">
                {immobile?.price}
                <strong className="text-muted-foreground text-xs">
                  C. {immobile?.code}
                </strong>{" "}
              </span>
            </div>
            <Separator
              orientation="horizontal"
              className="h-[1px] bg-zinc-100"
            />
            <div className="flex items-center gap-6 mt-8 text-muted-foreground">
              {immobile?.size && (
                <span className="flex items-center gap-2">
                  <div className="flex items-center justify-center border rounded-md size-10 bg-zinc-50">
                    <Ruler className="size-4" />
                  </div>
                  {immobile.size}m²
                </span>
              )}
              {immobile?.rooms && (
                <span className="flex items-center gap-2">
                  <div className="flex items-center justify-center border rounded-md size-10 bg-zinc-50">
                    <Bed className="size-4" />
                  </div>
                  {immobile.rooms} quarto(s)
                </span>
              )}
              {immobile?.bathrooms && (
                <span className="flex items-center gap-2">
                  <div className="flex items-center justify-center border rounded-md size-10 bg-zinc-50">
                    <Bath className="size-4" />
                  </div>
                  {immobile.bathrooms} banheiro(s)
                </span>
              )}
              {immobile?.garage && (
                <span className="flex items-center gap-2">
                  <div className="flex items-center justify-center border rounded-md size-10 bg-zinc-50">
                    <Car className="size-4" />
                  </div>
                  {immobile.garage} garagem
                </span>
              )}
            </div>

            <div className="w-full">
              {immobile?.description && (
                <pre className="font-sans text-wrap">
                  <p className="leading-relaxed">{immobile.description}</p>
                </pre>
              )}
            </div>
          </div>
        )}
        <Button
          onClick={handleOpenContact}
          className="gap-2 bg-green-500 hover:bg-green-600 self-end w-fit"
        >
          <MessageCircle className="size-4" />
          Quero saber mais
        </Button>
      </div>
    </div>
  );
}
