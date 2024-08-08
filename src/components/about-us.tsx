import { OUR_VALUES } from '@/constants/our-values'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion'

export function AboutUs() {
  return (
    <div className="py-16  mx-auto flex-col w-[1280px] flex justify-center items-center">
      <div className="flex items-center w-full gap-16">
        <div className="flex flex-col w-1/2 mb-12">
          <h2 className="mb-1 text-2xl font-bold">Sobre nós</h2>
          <p className="mb-8">Valores</p>
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
              )
            })}
          </Accordion>
        </div>

        <div className="flex flex-col items-center justify-end w-1/2">
          <h2 className="self-start mb-8 text-6xl font-bold text-end">
            Nossa missão
          </h2>
          <p className="text-xl text-start text-muted-foreground">
            Fornecer soluções imobiliárias de qualidade, conectando pessoas aos
            seus sonhos através de um serviço de excelência, transparência e
            expertise.
          </p>
        </div>
      </div>
    </div>
  )
}
