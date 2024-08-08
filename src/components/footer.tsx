import { Instagram, KeyRound, Mail, MessageCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function Footer() {
  return (
    <footer className="w-full bg-white ">
      <div className="py-16 h-[300] mx-auto flex-col w-[1280px] flex justify-center items-center">
        <div className="flex items-center gap-2 mb-2">
          <KeyRound className="size-5" />
          <h1 className="text-xl font-semibold">Sonhos&Chaves</h1>
        </div>
        <h4 className="mb-12 text-xl text-center text-muted-foreground">
          Seu novo lar está a <br />
          apenas um clique de distância.
        </h4>
        <div className="flex items-center div">
          <Button variant="link">
            <Instagram className="size-5" />
          </Button>
          <Separator orientation="vertical" className="h-5 bg-zinc-200" />
          <Button variant="link">
            <MessageCircle className="size-5" />
          </Button>
          <Separator orientation="vertical" className="h-5 bg-zinc-200" />
          <Button variant="link">
            <Mail className="size-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center h-16 border-t border-zinc-100">
        <div className="mx-auto flex-col w-[1280px]">
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} evandersondev. Todos os direitos
            reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
