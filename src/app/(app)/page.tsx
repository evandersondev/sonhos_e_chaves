import { AboutUs } from '@/components/about-us'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Immobile } from '@/components/immobile'
import { Separator } from '@/components/ui/separator'

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <Separator orientation="horizontal" className="h-[1px] bg-zinc-100" />
      <Immobile />
      <Separator orientation="horizontal" className="h-[1px] bg-zinc-100" />
      <AboutUs />
      <Separator orientation="horizontal" className="h-[1px] bg-zinc-100" />
      <Footer />
    </div>
  )
}
