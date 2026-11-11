import { coverPhoto } from "@/assets/images";
import { StageControl } from "@/components/demo/StageControl";
import { shared } from "@/content/landings";
import { paperTurn } from "@/content/sampleCase";
import { useStage } from "@/hooks/useStage";
import { useTimeline } from "@/hooks/useTimeline";
import { PAPER_END, PAPER_MARKS, paperState } from "@/lib/demo/paper";
import { cn } from "@/lib/utils";

/**
 * El formulario de verdad, y el producto escribiendo sobre él.
 *
 * Todo se mide en porcentaje de la foto, no de la pantalla: la foto se coloca
 * con un ancho conocido (`--foto`) y la franja la recorta, así la casilla cae
 * siempre en el mismo lugar del papel, a cualquier ancho.
 *
 * La casilla es la de la Convención contra la Tortura, medida esquina por
 * esquina sobre la foto. Como el papel está en perspectiva no alcanza con
 * girar: la marca se transforma con los dos ejes del plano del papel, para que
 * quede apoyada sobre la hoja y no pegada encima.
 */
const CASILLA = {
  /** Esquina izquierda de la casilla, en % de la foto. */
  x: 70.04,
  y: 51.95,
  /** Los dos ejes del papel ahí, en unidades de 1 % del ancho de la foto. */
  eje: { ax: 1.75, ay: -0.959, bx: 1.333, by: 1.417 },
} as const;

export function HeroPaper({ className }: { className?: string }) {
  const stage = useStage(0.2);
  const { step, lap } = useTimeline({
    marks: PAPER_MARKS,
    end: PAPER_END,
    playing: stage.playing,
    still: stage.still,
  });
  const state = paperState(step);
  const { ax, ay, bx, by } = CASILLA.eje;

  /** El cuadrado de 1 % que la matriz convierte en la casilla del papel. */
  const sobreLaCasilla = {
    left: `${CASILLA.x}%`,
    top: `${CASILLA.y}%`,
    width: "calc(var(--foto) * 0.01)",
    height: "calc(var(--foto) * 0.01)",
  } as const;

  return (
    <div ref={stage.ref} {...stage.hoverProps} className={cn("relative", className)}>
      <p className="sr-only">{shared.hero.paperDescription}</p>

      {/* Lo que dijo la clienta. En el teléfono va antes de la foto; de ahí para
          arriba se apoya sobre el negro de la hoja, alineado con el título. */}
      <div aria-hidden className="wrap pb-5 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-[5%] lg:z-10 lg:pb-0">
        <div
          key={lap}
          className={cn(
            "max-w-[26rem] transition-all duration-300 ease-out",
            state.said ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          <p className="mb-2 text-[12.5px] leading-none text-ink-muted">{shared.hero.said}</p>
          <div className="rounded-[14px] bg-ink-bubble px-4 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.6)]">
            <p lang="es" className="text-[15.5px] leading-[1.35] text-paper">
              <span className={cn("mark mark-sweep", !state.marked && "mark-off")}>{paperTurn.es}</span>
            </p>
            <p lang="en" className="mt-1.5 text-[13px] leading-[1.35] text-ink-muted">
              {paperTurn.en}
            </p>
          </div>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden [--alto:0.42] [--foto:150vw] [--izq:-18%] sm:[--alto:0.38] sm:[--foto:128vw] sm:[--izq:-12%] lg:[--alto:0.33] lg:[--foto:112vw] lg:[--izq:-6%] xl:[--alto:0.3] xl:[--foto:100vw] xl:[--izq:0%]"
        style={{ height: "calc(var(--foto) * var(--alto))" }}
      >
        <div
          aria-hidden
          className="absolute left-[var(--izq)] w-[var(--foto)]"
          style={{ top: "calc(var(--foto) * -0.1255)", aspectRatio: coverPhoto.width / coverPhoto.height }}
        >
          <img
            src={coverPhoto.large}
            srcSet={`${coverPhoto.small} 1200w, ${coverPhoto.large} 2400w`}
            sizes="(min-width: 1280px) 100vw, 150vw"
            alt={shared.hero.photoAlt}
            width={coverPhoto.width}
            height={coverPhoto.height}
            {...{ fetchpriority: "high" }}
            className="block h-full w-full select-none"
          />

          {/* La casilla, marcada sobre el plano del papel. El resaltador y el
              tilde van separados: el resaltador tiene que multiplicarse contra
              la foto, y un padre con transform le cortaría el fondo. */}
          <span
            key={`${lap}-resaltador`}
            className={cn(
              "absolute origin-top-left bg-citron mix-blend-multiply transition-opacity duration-[250ms] ease-out",
              state.checked ? "opacity-100" : "opacity-0",
            )}
            style={{ ...sobreLaCasilla, transform: `matrix(${ax}, ${ay}, ${bx}, ${by}, 0, 0)` }}
          />
          <svg
            key={`${lap}-tilde`}
            viewBox="0 0 10 10"
            className={cn(
              "absolute origin-top-left overflow-visible transition-opacity duration-200 ease-out",
              state.checked ? "opacity-100" : "opacity-0",
            )}
            style={{ ...sobreLaCasilla, transform: `matrix(${ax}, ${ay}, ${bx}, ${by}, 0, 0)` }}
          >
            <path
              d="M1.5 5.3 L3.9 7.9 L8.5 2.5"
              fill="none"
              stroke="#121212"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {!stage.still && (
          <StageControl paused={stage.paused} onToggle={stage.toggle} dark className="absolute bottom-3 right-3" />
        )}
      </div>
    </div>
  );
}
