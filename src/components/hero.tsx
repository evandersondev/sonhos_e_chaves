import { Button } from './ui/button'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Separator } from './ui/separator'

export function Hero() {
  return (
    <div className="py-16">
      <div className="mx-auto w-[1280px] h-[400px] flex-col p-40 items-center relative flex justify-center overflow-clip rounded-2xl">
        <h1 className="mb-8 text-6xl font-bold text-center">
          Seu novo lar está a apenas um clique de distância.
        </h1>
        <p className="px-16 text-xl text-center text-muted-foreground">
          Ser a imobiliária mais confiável e inovadora da região metropolitana,
          reconhecida pelo compromisso com a excelência e pela satisfação dos
          nossos clientes.
        </p>
      </div>

      <div className="flex items-end gap-8 px-8 py-8 mx-auto bg-white border border-zinc-200/50 w-fit rounded-xl">
        <div className="flex flex-col gap-2">
          <Label htmlFor="district">Localização</Label>
          <Select>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecionar bairro" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="h-16 bg-zinc-200/50" />

        <div className="flex flex-col gap-2">
          <Label htmlFor="room">Quartos</Label>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Quartos" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Quartos</SelectLabel>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="+4">+4</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="h-16 bg-zinc-200/50" />

        <div className="flex flex-col gap-2">
          <Label htmlFor="room">Banheiros</Label>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Banheiros" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Banheiros</SelectLabel>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="+4">+4</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="h-16 bg-zinc-200/50" />

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Tipo</Label>
          <Select>
            <SelectTrigger className="w-[200px]">
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

        <Separator orientation="vertical" className="h-16 bg-zinc-200/50" />

        <Button className="self-center">Buscar</Button>
      </div>
    </div>
  )
}
