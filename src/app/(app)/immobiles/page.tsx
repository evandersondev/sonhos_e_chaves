'use client'

import { getSession } from '@/actions/session'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { deleteImmobile } from '@/data/delete-immobile'
import { getImmobiles } from '@/data/get-immobiles'
import { ImmobileType } from '@/types/immobile-type'
import {
  Bath,
  Bed,
  Car,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Loader2,
  Pencil,
  Plus,
  Ruler,
  Trash
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ImmobilesList() {
  const router = useRouter()
  const [hasSession, setHasSession] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
  const [immobiles, setImmobiles] = useState<ImmobileType[]>([])

  useEffect(() => {
    async function load() {
      const session = await getSession()

      if(session?.user?.email) {
        setHasSession(true)
      }

      const response = await getImmobiles()
      setImmobiles(response)
    }

    load()
  }, [hasSession])

  async function handleDeleteImmobile(immobile: ImmobileType) {
    setLoading(true)
    await deleteImmobile(immobile)
    setLoading(false)
    setModalDeleteIsOpen(false)
    router.refresh()
  }

  return (
    <div className="container h-full flex-col">
      <div className="h-full w-full gap-6">
        <div className="py-8 space-y-8 h-full">
          <div className="flex items-center gap-2">
            <Input
              className="w-80"
              placeholder="Buscar por código, nome, bairro..."
            />

            <div className="w-fit">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo</SelectLabel>
                    <SelectItem value="house">Casa</SelectItem>
                    <SelectItem value="apartment">Apartamento</SelectItem>
                    <SelectItem value="condominium">Condominio</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-fit">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Quartos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Quartos</SelectLabel>
                    <SelectItem value="1">1 Quarto</SelectItem>
                    <SelectItem value="2">2 Quartos</SelectItem>
                    <SelectItem value="3">3 Quartos</SelectItem>
                    <SelectItem value="+4">+4 Quartos</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-fit">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Banheiros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Banheiros</SelectLabel>
                    <SelectItem value="1">1 Banheiro</SelectItem>
                    <SelectItem value="2">2 Banheiros</SelectItem>
                    <SelectItem value="3">3 Banheiros</SelectItem>
                    <SelectItem value="+4">+4 Banheiros</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="size-4 mr-2" />
                    Mais filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-8 space-y-4">
                  <DropdownMenuLabel>Mais filtros</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid justify-center grid-cols-[1fr_3px_1fr] gap-4">
                    <div className="flex w-52 flex-col gap-3">
                      <Label>Tipos de lançamentos</Label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="1" />
                          <Label htmlFor="1" className="font-normal">
                            Na planta
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="1" />
                          <Label htmlFor="1" className="font-normal">
                            em construção
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="1" />
                          <Label htmlFor="1" className="font-normal">
                            e pronto pra morar
                          </Label>
                        </div>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="h-full" />
                    <div className="flex w-52 flex-col gap-3">
                      <Label>Lazer e esporte</Label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="1" />
                          <Label htmlFor="1" className="font-normal">
                            Academia
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="1" />
                          <Label htmlFor="1" className="font-normal">
                            Churrasqueira
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="1" />
                          <Label htmlFor="1" className="font-normal">
                            Espaço gourmet
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="1" />
                          <Label htmlFor="1" className="font-normal">
                            Jardim
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="1" />
                          <Label htmlFor="1" className="font-normal">
                            Piscina
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="1" />
                          <Label htmlFor="1" className="font-normal">
                            Playground
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="condominuim_fee" />
                    <Label htmlFor="condominuim_fee">Taxa de condomínio</Label>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {hasSession && <Button
              onClick={() => router.push('/immobiles/register')}
              className="ml-auto"
            >
              <Plus className="size-4 mr-2" /> Adicionar
            </Button>}
          </div>

          {immobiles?.map((immobile) => {
            return (
              <Card
                key={immobile.id}
                className="shadow-none hover:shadow transition-shadow p-0"
              >
                <CardContent className="h-60  flex items-start p-0 gap-6">
                  <div className="h-full w-80 overflow-hidden rounded-l-md">
                    <Image
                      height={400}
                      width={400}
                      quality={100}
                      alt={immobile.address}
                      className="h-full w-full object-cover"
                      src={`https://dotlxibjbjydutyvfurz.supabase.co/storage/v1/object/public/${immobile.photosId[0]}`}
                    />
                  </div>
                  <div className="flex py-6 pr-6 flex-1 flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{immobile.price}</h2>
                        <h2 className="font-bold">{immobile.address}</h2>
                      </div>

                      <div className="flex items-center gap-2">
                        <Dialog open={modalDeleteIsOpen} onOpenChange={setModalDeleteIsOpen}>
                          <DialogTrigger asChild>
                            <Button size="icon" variant="destructive">
                              <Trash className="size-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Deletar imóvel?</DialogTitle>
                              <DialogDescription>
                                Confirme para deletar imóvel
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex items-center gap-4">
                              <DialogClose asChild>
                                <Button disabled={loading} variant="outline">Cancelar</Button>
                              </DialogClose>

                              <Button
                                disabled={loading}
                                onClick={() => handleDeleteImmobile(immobile)}
                              >
                                {loading && <Loader2 className="size-4 mr-2 animate-spin" />}
                                Confirmar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button onClick={() => router.push(`immobiles/register/${immobile.id}`)} variant="outline" size="icon">
                          <Pencil className="size-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-6  text-muted-foreground">
                      <span className="flex items-center text-xs gap-2">
                        <div className="flex items-center justify-center border rounded-md size-8 bg-zinc-50">
                          <Ruler className="size-4" />
                        </div>
                        {immobile.size}
                      </span>
                      <span className="flex items-center text-xs  gap-2">
                        <div className="flex items-center justify-center border rounded-md size-8 bg-zinc-50">
                          <Bed className="size-4" />
                        </div>
                        {immobile.rooms} quarto(s)
                      </span>
                      <span className="flex items-center text-xs  gap-2">
                        <div className="flex items-center justify-center border rounded-md size-8 bg-zinc-50">
                          <Bath className="size-4" />
                        </div>
                        {immobile.bathrooms} banheiro(s)
                      </span>
                      <span className="flex items-center text-xs  gap-2">
                        <div className="flex items-center justify-center border rounded-md size-8 bg-zinc-50">
                          <Car className="size-4" />
                        </div>
                        {immobile.garage} garagem
                      </span>
                    </div>

                    <p className=" text-xs">{immobile.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          <footer className="flex items-center justify-between pb-8">
            <span className="text-sm text-muted-foreground">
              Total de 40 encontrados
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Página 1 de 5
              </span>
              <Pagination className="w-fit">
                <PaginationContent>
                  <PaginationItem>
                    <Button size="icon" variant="outline">
                      <ChevronsLeft className="size-4 " />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button size="icon" variant="outline">
                      <ChevronLeft className="size-4 " />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button size="icon" variant="outline">
                      <ChevronRight className="size-4" />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button size="icon" variant="outline">
                      <ChevronsRight className="size-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
