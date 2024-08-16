"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function HeaderNavigation() {
  const { push } = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <nav className="flex items-center gap-10">
        <Link
          className="hover:font-semibold hover:text-primary font-semibold transition-colors"
          href="/"
        >
          Inicio
        </Link>
        <Separator orientation="vertical" className="h-5 bg-zinc-200" />
        <Link
          className="hover:font-semibold hover:text-primary font-semibold transition-colors"
          href="/immobiles"
        >
          Imóveis
        </Link>
        <Separator orientation="vertical" className="h-5 bg-zinc-200" />
        <Link
          className="hover:font-semibold hover:text-primary font-semibold transition-colors"
          href="/"
        >
          Sobre nós
        </Link>
        <Separator orientation="vertical" className="h-5 bg-zinc-200" />
        <Link
          className="hover:font-semibold hover:text-primary font-semibold transition-colors"
          href="/"
        >
          Contato
        </Link>
      </nav>

      {!session ? (
        <div />
      ) : (
        <Button onClick={() => push("/immobiles/register")}>
          <Plus className="mr-2 size-4" />
          Adicionar
        </Button>
      )}
    </>
  );
}
