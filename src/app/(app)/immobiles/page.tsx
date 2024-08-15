"use client";

import { Filters } from "@/components/filters";
import { api } from "@/lib/api";
import { ImmobileType } from "@/types/immobile-type";
import { useEffect, useState } from "react";
import { ImmobilesList } from "./_components/immobiles-list";

interface ResponseData {
  immobiles: ImmobileType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

type ImmobilesProps = {
  searchParams?: {
    q?: string;
    rooms?: string;
    bathrooms?: string;
    garage?: string;
    type?: string;
  };
};

export default function Immobiles({ searchParams }: ImmobilesProps) {
  const [immobiles, setImmobiles] = useState<ImmobileType[]>([]);
  const [totalCount, setTotalCount] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();

  async function load(page?: number) {
    const { data } = await api.get<ResponseData>("/immobiles", {
      params: {
        bathrooms: searchParams?.bathrooms,
        garage: searchParams?.garage,
        q: searchParams?.q,
        rooms: searchParams?.rooms,
        type: searchParams?.type,
        page,
      },
    });

    setImmobiles(data.immobiles);
    setTotalCount(data.totalCount);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <div className="h-full w-full gap-6">
        <div className="py-8 space-y-8 h-full flex flex-col">
          <Filters onHanldeSearch={load} />

          <ImmobilesList
            immobiles={immobiles}
            totalCount={totalCount}
            totalPages={totalPages}
            currentPage={currentPage}
            onHanldeSearch={load}
          />
        </div>
      </div>
    </div>
  );
}
