"use client";

import { useWindowWidth } from "@/utils/use-window-width";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Filters } from "./filters";
import { FiltersMobile } from "./filters-mobile";

export function Hero() {
  const windowWidth = useWindowWidth();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  return (
    <motion.div
      viewport={{ amount: "all", once: true }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 w-full"
    >
      <div className="container md:h-[400px] flex-col p-6 md:p-20 lg:p-40 items-center relative flex justify-center rounded-2xl">
        <h1 className="mb-4 md:mb-8 text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          Seu novo lar está a apenas um clique de distância.
        </h1>
        <p className="px-0 md:px-16 text-base md:text-xl text-center text-muted-foreground">
          Ser a imobiliária mais confiável e inovadora da região metropolitana,
          reconhecida pelo compromisso com a excelência e pela satisfação dos
          nossos clientes.
        </p>
      </div>

      <div className="container">
        {windowWidth > 768 ? (
          <Filters
            onHanldeSearch={async () => {
              push(`immobiles?${searchParams.toString()}`);
            }}
          />
        ) : (
          <FiltersMobile
            onHanldeSearch={async () => {
              push(`immobiles?${searchParams.toString()}`);
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
