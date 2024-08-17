"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <motion.footer
      viewport={{ amount: "all", once: true, margin: "150px" }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white "
    >
      <div className="py-16 h-[300] flex-col container flex justify-center items-center">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-xl font-semibold">LOGO</h1>
        </div>
        <h4 className="mb-12 text-base md:text-xl text-center text-muted-foreground">
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
        <div className="container flex items-center justify-center md:justify-start flex-col">
          <span className="text-[10px] md:text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sonhos&Chaves. Todos os direitos
            reservados.
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
