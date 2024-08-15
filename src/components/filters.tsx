"use client";

import { Loader2, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

type FiltersProps = {
  onHanldeSearch: () => Promise<void>;
};

export function Filters({ onHanldeSearch }: FiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push, refresh } = useRouter();
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [rooms, setRooms] = useState(searchParams.get("rooms") || "");
  const [bathrooms, setBathrooms] = useState(
    searchParams.get("bathrooms") || ""
  );
  const [type, setType] = useState(searchParams.get("type") || "");

  function handleChangeSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setSearch(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function handleChangeSelectRooms(key: string, value: string) {
    if (key === "rooms") setRooms(value);
    if (key === "bathrooms") setBathrooms(value);
    if (key === "type") setType(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function handleSearchSubmit() {
    setLoading(true);
    onHanldeSearch();
    setLoading(false);
  }

  async function handleClearFilters() {
    setSearch("");
    setRooms("");
    setBathrooms("");
    setType("");

    push(`${pathname}`);
    await onHanldeSearch();

    refresh();
  }

  return (
    <div className="flex items-center gap-4 px-8 py-8 bg-white border border-zinc-200/50 rounded-xl">
      <div className="flex min-w-40 flex-1 flex-col gap-2">
        <Label htmlFor="search">Filtrar</Label>
        <Input
          value={search}
          onChange={handleChangeSearchInput}
          className="w-full"
          placeholder="Por localidade, código, condominío..."
        />
      </div>

      <Separator orientation="vertical" className="h-20 bg-zinc-200/50" />

      <div className="flex flex-col gap-2">
        <Label htmlFor="room">Quartos</Label>
        <Select
          value={rooms}
          onValueChange={(value) => handleChangeSelectRooms("rooms", value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Quartos" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Quartos</SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="+4">+4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator orientation="vertical" className="h-20 bg-zinc-200/50" />

      <div className="flex flex-col gap-2">
        <Label htmlFor="room">Banheiros</Label>
        <Select
          value={bathrooms}
          onValueChange={(value) => handleChangeSelectRooms("bathrooms", value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Banheiros" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Banheiros</SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="+4">+4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator orientation="vertical" className="h-20 bg-zinc-200/50" />

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Tipo</Label>
        <Select
          value={type}
          onValueChange={(value) => handleChangeSelectRooms("type", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="house">Casa</SelectItem>
              <SelectItem value="apartment">Apartamento</SelectItem>
              <SelectItem value="condominium">Condomínio</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator orientation="vertical" className="h-20 bg-zinc-200/50" />

      <div className="flex items-center gap-4 mt-5">
        <Button
          disabled={loading}
          type="button"
          onClick={handleSearchSubmit}
          className="self-center"
        >
          {loading ? (
            <Loader2 className="size-4 mr-2 animate-spin" />
          ) : (
            <Search className="size-4 mr-2" />
          )}
          Buscar
        </Button>
        {(search || rooms || bathrooms || type) && (
          <Button
            disabled={loading}
            size="icon"
            variant="outline"
            type="button"
            onClick={handleClearFilters}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <X className="size-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
