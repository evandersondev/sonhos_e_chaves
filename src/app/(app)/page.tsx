import { AboutUs } from "@/components/about-us";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Immobile } from "@/components/immobile";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={<div />}>
      <div className="bg-white">
        <section id="hero">
          <Hero />
        </section>
        <Separator orientation="horizontal" className="h-[1px] bg-zinc-100" />
        <section id="immobiles">
          <Immobile />
        </section>
        <Separator orientation="horizontal" className="h-[1px] bg-zinc-100" />
        <section id="about-us">
          <AboutUs />
        </section>
        <Separator orientation="horizontal" className="h-[1px] bg-zinc-100" />
        <section id="footer">
          <Footer />
        </section>
      </div>
    </Suspense>
  );
}
