import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * El teléfono del cliente, dibujado con CSS: marco negro de 10 px, 36 px de
 * radio y una barra de estado mínima. Mide 260 x 520, y 220 x 440 en pantallas
 * chicas.
 */
export function Phone({
  dark = false,
  time,
  children,
  className,
}: {
  dark?: boolean;
  time: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[440px] w-[220px] shrink-0 rounded-phone bg-black p-[10px] sm:h-[520px] sm:w-[260px]",
        dark && "ring-1 ring-ink-line",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-[26px]",
          dark ? "bg-ink text-paper" : "bg-white text-ink",
        )}
      >
        <div className="flex h-8 shrink-0 items-center justify-between px-5 pt-1 text-[11.5px] font-semibold tabular">
          <span>{time}</span>
          <span className="flex items-center gap-1" aria-hidden>
            <span className="flex items-end gap-[2px]">
              <i className="block h-[4px] w-[3px] rounded-[1px] bg-current" />
              <i className="block h-[6px] w-[3px] rounded-[1px] bg-current" />
              <i className="block h-[8px] w-[3px] rounded-[1px] bg-current" />
            </span>
            <span className="ml-1 block h-[10px] w-[19px] rounded-[3px] border border-current p-[1.5px]">
              <i className="block h-full w-[70%] rounded-[1px] bg-current" />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
