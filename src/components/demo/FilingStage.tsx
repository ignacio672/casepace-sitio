import { useRef } from "react";
import { Check } from "lucide-react";
import { formPages } from "@/assets/images";
import { buttonClass } from "@/components/ui/button";
import { HashLink } from "@/components/site/HashLink";
import { filing } from "@/content/sampleCase";
import { ANCHORS } from "@/content/site";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { filingTimeline } from "@/lib/demo/filing";
import { fan, type FanOptions } from "@/lib/fan";
import { cn } from "@/lib/utils";

/**
 * Geometría del abanico. Las pruebas comprueban que con estas medidas las siete
 * páginas entran enteras en su panel, sin tocar los bordes.
 */
export const FAN: FanOptions = { pages: filing.pages, boxRatio: 0.64, pageWidth: 34, step: 3.2, radius: 110 };

const LEAVES = fan(FAN);
const TIMING = filingTimeline(filing.pages);

/** Parte "a · b" en sus dos lados. */
function split(line: string): [string, string | null] {
  const [left, right] = line.split(" · ");
  return [left, right ?? null];
}

function DeliveryCard() {
  const [form, sheets, account, counts] = filing.lines;
  return (
    <>
      <div className="flex items-center gap-2.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-white">
          <Check size={14} strokeWidth={3} />
        </span>
        <p className="text-[18px] font-semibold leading-tight">{filing.ready}</p>
      </div>
      <dl className="mt-5 text-[15px] leading-[1.4]">
        {[form, sheets].map((line) => {
          const [label, figure] = split(line);
          return (
            <div key={line} className="flex items-baseline justify-between gap-4 border-t border-line py-2.5">
              <dt>{label}</dt>
              <dd className="shrink-0 font-mono text-[13px] text-muted">{figure}</dd>
            </div>
          );
        })}
        <div className="border-t border-line py-2.5">
          <dt>{account}</dt>
        </div>
        <div className="flex gap-5 border-t border-line pt-3">
          {counts.split(" · ").map((count) => {
            const [figure, ...label] = count.split(" ");
            return (
              <div key={count}>
                <dd className="font-mono text-[19px] font-medium leading-none tabular">{figure}</dd>
                <dt className="mt-1.5 text-[12px] leading-[1.25] text-muted">{label.join(" ")}</dt>
              </div>
            );
          })}
        </div>
      </dl>
      <HashLink to={`#${ANCHORS.download}`} className={buttonClass({ variant: "ink", className: "mt-6 w-full" })}>
        {filing.download}
      </HashLink>
    </>
  );
}

/**
 * Paso 3: la entrega. Las siete páginas llegan desde abajo y quedan en abanico;
 * después entra la tarjeta. Pasa una sola vez, cuando la sección entra en pantalla.
 */
export function FilingStage() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { amount: 0.35, once: true });
  const still = usePrefersReducedMotion();
  const arrived = seen || still;
  const moving = arrived && !still;

  return (
    <div
      ref={ref}
      className="grid items-center gap-8 rounded-stage bg-paper px-4 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:gap-10 lg:p-10 xl:gap-14 xl:p-12"
    >
      <div className="relative w-full" style={{ aspectRatio: `1 / ${FAN.boxRatio}` }}>
        {LEAVES.map((leaf, i) => {
          // La página 1 queda arriba de todo, así que es la última en llegar.
          const order = filing.pages - 1 - i;
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${leaf.left}%`, top: `${leaf.top}%`, width: `${FAN.pageWidth}%`, zIndex: filing.pages - i }}
            >
              <div
                className={cn(!arrived && "opacity-0", moving && "animate-page-in")}
                style={
                  {
                    "--giro": `${leaf.rotation}deg`,
                    transform: `rotate(${leaf.rotation}deg)`,
                    animationDelay: moving ? `${TIMING.pageDelays[order]}ms` : undefined,
                  } as React.CSSProperties
                }
              >
                <img
                  src={formPages[i]}
                  alt={filing.pageAlt(i + 1)}
                  width={612}
                  height={792}
                  loading="lazy"
                  className="block w-full rounded-paper border border-line-strong bg-white shadow-page transition-transform duration-200 ease-out hover:-translate-y-1.5"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={cn(
          "rounded-window border border-line bg-white p-6 shadow-window",
          !arrived && "opacity-0",
          moving && "animate-card-in",
        )}
        style={{ animationDelay: moving ? `${TIMING.cardDelay}ms` : undefined }}
      >
        <DeliveryCard />
      </div>
    </div>
  );
}
