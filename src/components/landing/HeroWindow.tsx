import { Check } from "lucide-react";
import { AppWindow } from "@/components/demo/AppWindow";
import { StageControl } from "@/components/demo/StageControl";
import { demo, reviewParts, reviewRows, reviewUi } from "@/content/sampleCase";
import { useStage } from "@/hooks/useStage";
import { useTimeline } from "@/hooks/useTimeline";
import { partsDone, reviewTimeline } from "@/lib/demo/review";
import { cn } from "@/lib/utils";

const TIMELINE = reviewTimeline(reviewRows.length);
const PARTS = reviewRows.map((row) => row.part);

/**
 * El inicio: la pantalla con la que el estudio revisa el caso.
 *
 * Las filas del formulario se completan de a una y cada una muestra de dónde
 * salió: un documento o la entrevista. Es el producto, no una imagen.
 */
export function HeroWindow({ className }: { className?: string }) {
  const stage = useStage(0.2);
  const { step, lap } = useTimeline({
    marks: TIMELINE.marks,
    start: TIMELINE.loopStart,
    end: TIMELINE.end,
    playing: stage.playing,
    still: stage.still,
  });
  const partes = partsDone(PARTS, step);

  return (
    <div ref={stage.ref} {...stage.hoverProps} className={cn("relative", className)}>
      <p className="sr-only">{reviewUi.description}</p>
      <AppWindow aria-hidden title={demo.windowTitle} className="h-[422px]">
        <div key={lap} className="flex h-full animate-fade-in flex-col">
          <div className="flex min-h-0 flex-1">
            <aside className="hidden w-[228px] shrink-0 flex-col border-r border-line p-4 sm:flex xl:w-[252px]">
              <p className="text-[12px] leading-none text-muted">{reviewUi.parts}</p>
              <ul className="mt-3.5 space-y-2.5">
                {reviewParts.map((part, i) => {
                  const done = i < partes;
                  return (
                    <li
                      key={part}
                      className={cn(
                        "flex items-center gap-2 text-[13.5px] leading-[1.3] transition-colors duration-200",
                        done ? "text-ink" : "text-muted",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-[15px] w-[15px] shrink-0 place-items-center rounded-[3px] border",
                          done ? "border-ink" : "border-line-strong",
                        )}
                      >
                        {done && <Check size={11} strokeWidth={3.25} className="animate-fade-in" />}
                      </span>
                      {part}
                    </li>
                  );
                })}
              </ul>
              <dl className="mt-auto space-y-2 pt-6">
                {reviewUi.counts.map((count) => {
                  const [cifra, ...resto] = count.split(" ");
                  return (
                    <div key={count} className="flex items-baseline gap-2">
                      <dd className="font-mono text-[15px] leading-none tabular text-ink">{cifra}</dd>
                      <dt className="text-[12px] leading-none text-muted">{resto.join(" ")}</dt>
                    </div>
                  );
                })}
              </dl>
            </aside>

            <div className="min-w-0 flex-1 overflow-hidden px-4 pb-2 pt-3 sm:px-5">
              <div className="flex items-center justify-between pb-1.5 text-[12px] leading-none text-muted">
                <span>{reviewUi.field}</span>
                <span className="hidden sm:block">{reviewUi.source}</span>
              </div>
              <ul>
                {reviewRows.map((row, i) => {
                  const done = i < step;
                  return (
                    <li key={`${row.ref}-${row.label}-${i}`} className="flex h-[42px] items-center gap-3 border-t border-line">
                      <span className="w-[54px] shrink-0 font-mono text-[11px] leading-none text-muted">{row.ref}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] leading-none text-muted">{row.label}</span>
                        <span className="mt-[3px] block h-[19px] truncate text-[15px] font-semibold leading-[20px]">
                          {done && <span className="mark-pass">{row.value}</span>}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "flex shrink-0 items-center gap-1 text-[12px] leading-none text-muted transition-opacity duration-200",
                          done ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <Check size={12} strokeWidth={3} className="text-ink" />
                        {row.source}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </AppWindow>
      {!stage.still && (
        <StageControl
          paused={stage.paused}
          onToggle={stage.toggle}
          dark
          className="absolute -bottom-1 right-0 translate-y-full"
        />
      )}
    </div>
  );
}
