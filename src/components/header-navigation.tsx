"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function HeaderNavigation() {
  const { push } = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (sectionId) => {
    if (pathname !== "/") {
      push("/");
    }

    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="flex w-fit justify-between items-center md:items-center gap-1 md:gap-10">
        <Button
          data-enable={activeSection === "hero" && pathname === "/"}
          className="hover:font-semibold text-xs md:text-base data-[enable=true]:text-primary hover:text-primary font-semibold transition-colors"
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection("hero")}
        >
          Inicio
        </Button>
        <Separator orientation="vertical" className="h-5 bg-zinc-200" />
        <Button
          data-enable={activeSection === "immobiles" && pathname === "/"}
          variant="ghost"
          className="hover:font-semibold  text-xs md:text-base hover:text-primary data-[enable=true]:text-primary font-semibold transition-colors"
          onClick={() => scrollToSection("immobiles")}
          size="sm"
        >
          Imóveis
        </Button>
        <Separator orientation="vertical" className="h-5 bg-zinc-200" />
        <Button
          data-enable={activeSection === "about-us" && pathname === "/"}
          variant="ghost"
          className="hover:font-semibold  text-xs md:text-base hover:text-primary data-[enable=true]:text-primary font-semibold transition-colors"
          onClick={() => scrollToSection("about-us")}
          size="sm"
        >
          Sobre nós
        </Button>
        <Separator orientation="vertical" className="h-5 bg-zinc-200" />
        <Button
          data-enable={activeSection === "footer" && pathname === "/"}
          variant="ghost"
          className="hover:font-semibold  text-xs md:text-base hover:text-primary data-[enable=true]:text-primary font-semibold transition-colors"
          onClick={() => scrollToSection("footer")}
          size="sm"
        >
          Contato
        </Button>
      </nav>

      {!session ? (
        <div className="hidden md:block" />
      ) : (
        <Button
          className="hidden md:block"
          size="sm"
          onClick={() => push("/immobiles/register")}
        >
          <Plus className="mr-2 size-4" />
          Adicionar
        </Button>
      )}
    </>
  );
}
