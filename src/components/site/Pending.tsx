import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Marcador visible de contenido que falta confirmar o completar.
 * Para listarlos todos: buscar `data-pendiente` o `<Pending` en el código.
 */
export function Pending({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span data-pendiente className={cn("pending", className)} title="Pending confirmation">
      <span aria-hidden className="font-mono text-[0.82em] text-muted">
        [
      </span>
      {children}
      <span aria-hidden className="font-mono text-[0.82em] text-muted">
        ]
      </span>
    </span>
  );
}

/** El mismo marcador, como bloque: para párrafos enteros que faltan. */
export function PendingBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      data-pendiente
      className={cn("pending px-4 py-3 text-[15px] leading-[1.5] text-ink", className)}
      title="Pending confirmation"
    >
      {children}
    </p>
  );
}
