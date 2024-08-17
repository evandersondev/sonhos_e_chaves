"use client";

import { AboutUs } from "@/components/about-us";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Immobile } from "@/components/immobile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function HomePage() {
  const { push } = useRouter();

  return (
    <Suspense fallback={<div />}>
      <div className="bg-white relative">
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

        <Button
          className="fixed bottom-6 right-6 z-50"
          size="icon"
          onClick={() => push("/immobiles/register")}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </Suspense>
  );
}
