"use client";

import { OUR_VALUES } from "@/constants/our-values";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function AboutUs() {
  return (
    <div className="py-16 flex-col container flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center w-full gap-12 md:gap-16">
        <motion.div
          viewport={{ amount: "all", once: true, margin: "150px" }}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col w-full md:w-1/2 mb-12"
        >
          <h2 className="mb-1 text-xl md:text-2xl font-bold">Sobre nós</h2>
          <p className="text-sm md:text-base mb-8">Valores</p>
          <Accordion
            defaultValue={OUR_VALUES[0][0]}
            className="h-[400px]"
            type="single"
            collapsible
          >
            {OUR_VALUES.map((value) => {
              return (
                <AccordionItem
                  key={value[0]}
                  className="mb-4 border rounded-md"
                  value={value[0]}
                >
                  <AccordionTrigger className="px-4">
                    {value[0]}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 text-base border-t text-muted-foreground">
                    {value[1]}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>

        <motion.div
          viewport={{ amount: "all", once: true }}
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-end w-full md:w-1/2"
        >
          <h2 className="md:self-start mb-8 self-center text-4xl md:text-6xl font-bold text-end">
            Nossa missão
          </h2>
          <p className="md:text-xl text-center px-20 md:px-0 text-base md:text-start text-muted-foreground">
            Fornecer soluções imobiliárias de qualidade, conectando pessoas aos
            seus sonhos através de um serviço de excelência, transparência e
            expertise.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
