import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * La ventana del producto, del lado del equipo: blanca, 12 px de radio, borde
 * gris cálido y una barra de 36 px con el nombre del caso.
 */
export function AppWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-window border border-line bg-white text-ink shadow-window",
        className,
      )}
    >
      <div className="flex h-9 shrink-0 items-center gap-3.5 border-b border-line px-3.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="block h-[9px] w-[9px] rounded-full bg-line-strong" />
          <i className="block h-[9px] w-[9px] rounded-full bg-line-strong" />
          <i className="block h-[9px] w-[9px] rounded-full bg-line-strong" />
        </span>
        <span className="truncate text-[12.5px] text-muted">{title}</span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
