"use client";

import { ImmobileType } from "@/types/immobile-type";
import { Lamp, Ruler, ShowerHead, Warehouse } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "./ui/card";

type ImmobileCardProps = {
  immobile: ImmobileType;
};

export function ImmobileCard({ immobile }: ImmobileCardProps) {
  const router = useRouter();

  function handleImmbileView(id: string) {
    router.push(`/${id}`);
  }

  return (
    <div className="h-[470px]">
      <Card
        onClick={() => handleImmbileView(immobile.id)}
        className="shadow-none rounded-xl overflow-hidden cursor-pointer hover:border-primary"
      >
        <CardHeader className="w-full h-52 p-0 rounded-t-md">
          <Image
            src={immobile.photosId[0]}
            className="h-full w-full object-cover"
            alt={immobile.address}
            width={400}
            height={400}
          />
        </CardHeader>
        <CardContent className="flex flex-col p-4">
          <span className="text-xl font-semibold">{immobile.price}</span>
          <span className="mb-4">{immobile.address}</span>

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
            <span className="flex items-center gap-2 text-sm">
              <Ruler className="size-4" />
              {immobile.size}m²
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
