import { Eraser } from "lucide-react";

export function ImmobilesEmpty() {
  return (
    <div className="h-[calc(100vh-16rem)] flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Eraser className="size-6" />
        <span className="font-medium text-muted-foreground">
          Nenhum imóvel encontrado...
        </span>
      </div>
    </div>
  );
}
