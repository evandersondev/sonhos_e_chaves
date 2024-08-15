"use client";

import { ImmobileCard } from "@/components/immobile-card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { deleteImmobile } from "@/data/delete-immobile";
import { ImmobileType } from "@/types/immobile-type";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImmobilesEmpty } from "./immobiles-empty";

type ImmobilesListProps = {
  immobiles: ImmobileType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  onHanldeSearch: (page?: number) => Promise<void>;
};

export function ImmobilesList({
  immobiles,
  currentPage,
  totalCount,
  totalPages,
  onHanldeSearch,
}: ImmobilesListProps) {
  const { refresh } = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  async function handleDeleteImmobile(immobile: ImmobileType) {
    setLoading(true);
    await deleteImmobile(immobile);
    setLoading(false);
    setModalDeleteIsOpen(false);
    refresh();
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      onHanldeSearch(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      onHanldeSearch(currentPage + 1);
    }
  }

  return (
    <>
      {immobiles.length < 1 ? (
        <ImmobilesEmpty />
      ) : (
        <div className="flex-col h-full flex-1 flex">
          <div className="grid grid-cols-4 gap-6">
            {immobiles?.map((immobile) => {
              return <ImmobileCard key={immobile.code} immobile={immobile} />;
            })}
          </div>
          <footer className="flex items-center justify-between pb-8">
            <span className="text-sm text-muted-foreground">
              Total de {totalCount} encontrados
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Página {currentPage} de {totalPages}
              </span>
              <Pagination className="w-fit">
                <PaginationContent>
                  <PaginationItem>
                    <Button size="icon" variant="outline">
                      <ChevronsLeft className="size-4 " />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button size="icon" variant="outline">
                      <ChevronLeft className="size-4 " />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      onClick={() => onHanldeSearch(currentPage + 1)}
                      size="icon"
                      variant="outline"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button size="icon" variant="outline">
                      <ChevronsRight className="size-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
