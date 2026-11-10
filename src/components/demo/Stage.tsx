import type { ReactNode, RefObject } from "react";
import { demo } from "@/content/sampleCase";
import { cn } from "@/lib/utils";
import { StageControl } from "./StageControl";

type StageApi = {
  ref: RefObject<HTMLDivElement>;
  still: boolean;
  paused: boolean;
  toggle: () => void;
  hoverProps: {
    onPointerEnter: (event: React.PointerEvent) => void;
    onPointerLeave: () => void;
  };
};

/**
 * El escenario de un paso: un fondo gris cálido muy claro con 16 px de radio
 * que muestra los dos lados, el teléfono del cliente y la vista del equipo.
 */
export function Stage({
  stage,
  dark = false,
  description,
  phone,
  team,
}: {
  stage: StageApi;
  dark?: boolean;
  /** Lo que muestra la animación, para lectores de pantalla. */
  description: string;
  phone: ReactNode;
  team: ReactNode;
}) {
  const label = cn("mb-3 text-[12px] leading-none", dark ? "text-ink-muted" : "text-muted");
  return (
    <div
      ref={stage.ref}
      {...stage.hoverProps}
      className={cn(
        "relative rounded-stage px-4 pb-14 pt-6 sm:px-8 sm:pt-8 lg:p-10 xl:p-12",
        dark ? "border border-ink-line bg-ink-raised" : "bg-paper",
      )}
    >
      <p className="sr-only">{description}</p>
      <div
        aria-hidden
        className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-10 xl:gap-14"
      >
        <div className="shrink-0">
          <p className={label}>{demo.sides.client}</p>
          {phone}
        </div>
        <div className="w-full min-w-0 lg:max-w-[820px] lg:flex-1">
          <p className={label}>{demo.sides.team}</p>
          {team}
        </div>
      </div>
      {!stage.still && (
        <StageControl
          paused={stage.paused}
          onToggle={stage.toggle}
          dark={dark}
          className="absolute bottom-3 right-3 lg:bottom-2.5 lg:right-2.5"
        />
      )}
    </div>
  );
}
