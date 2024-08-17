"use client";

import { ImmobileType } from "@/types/immobile-type";
import {
  Lamp,
  Loader2,
  Pencil,
  Ruler,
  ShowerHead,
  Trash,
  Warehouse,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type ImmobileCardProps = {
  immobile: ImmobileType;
  loading?: boolean;
  modalDeleteIsOpen?: boolean;
  setModalDeleteIsOpen?: Dispatch<SetStateAction<boolean>>;
  handleDeleteImmobile?: (immobile: ImmobileType) => Promise<void>;
};

export function ImmobileCard({
  immobile,
  loading,
  handleDeleteImmobile,
  modalDeleteIsOpen,
  setModalDeleteIsOpen,
}: ImmobileCardProps) {
  const router = useRouter();
  const { data: session } = useSession();

  function handleImmbileView(id: string) {
    router.push(`/${id}`);
  }

  return (
    <Dialog open={modalDeleteIsOpen} onOpenChange={setModalDeleteIsOpen}>
      <ContextMenu>
        <ContextMenuTrigger disabled={!session} asChild>
          <div className="md:h-[470px]">
            <Card
              onClick={() => handleImmbileView(immobile.id)}
              className="shadow-none relative rounded-xl overflow-hidden cursor-pointer hover:border-primary"
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
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => router.push(`/immobiles/register/${immobile.id}`)}
            >
              <Pencil className="size-4 mr-2" />
              Editar
            </Button>
          </ContextMenuItem>
          <ContextMenuItem>
            <DialogTrigger asChild>
              <Button className="w-full" variant="ghost">
                <Trash className="size-4 mr-2" />
                Deletar
              </Button>
            </DialogTrigger>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Imóvel?</DialogTitle>
          <DialogDescription className="self-end flex items-center gap-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              disabled={loading}
              onClick={() => handleDeleteImmobile(immobile)}
              variant="destructive"
            >
              {loading && <Loader2 className="size-4 mr-2 animate-spin" />}
              Deletar
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
