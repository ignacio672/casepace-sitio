import { Check } from "lucide-react";
import { AppWindow } from "@/components/demo/AppWindow";
import { StageControl } from "@/components/demo/StageControl";
import { demo, reviewRows, reviewUi } from "@/content/sampleCase";
import { useStage } from "@/hooks/useStage";
import { useTimeline } from "@/hooks/useTimeline";
import { reviewTimeline } from "@/lib/demo/review";
import { cn } from "@/lib/utils";

const TIMELINE = reviewTimeline(reviewRows.length);

/**
 * El inicio: la pantalla con la que el estudio revisa el caso.
 *
 * Cinco campos, no la planilla entera: cada uno se completa con calma y
 * muestra de dónde salió, un documento o la entrevista. La última fila es lo
 * que contó la clienta, que es de lo que se trata todo.
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

  return (
    <div ref={stage.ref} {...stage.hoverProps} className={cn("relative", className)}>
      <p className="sr-only">{reviewUi.description}</p>
      <AppWindow aria-hidden title={demo.windowTitle}>
        <div key={lap} className="animate-fade-in px-5 pb-4 pt-4 sm:px-7 sm:pt-5">
          <div className="flex items-center justify-between pb-2 text-[12.5px] leading-none text-muted">
            <span>{reviewUi.field}</span>
            <span>{reviewUi.source}</span>
          </div>
          <ul>
            {reviewRows.map((row, i) => {
              const done = i < step;
              return (
                <li
                  key={`${row.ref}-${i}`}
                  className="flex items-center gap-4 border-t border-line py-4 sm:gap-6 sm:py-[18px]"
                >
                  <span className="w-[56px] shrink-0 font-mono text-[11.5px] leading-none text-muted">{row.ref}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] leading-none text-muted">{row.label}</span>
                    <span className="mt-[7px] block h-[25px] truncate text-[17px] font-semibold leading-[25px] sm:text-[18.5px]">
                      {done && <span className="mark-pass">{row.value}</span>}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 text-[12.5px] leading-none text-muted transition-opacity duration-500 ease-out",
                      done ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Check size={13} strokeWidth={3} className="text-ink" />
                    <span className="hidden sm:inline">{row.source}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </AppWindow>
      {!stage.still && (
        <StageControl
          paused={stage.paused}
          onToggle={stage.toggle}
          dark
          className="absolute -bottom-2 right-0 translate-y-full"
        />
      )}
    </div>
  );
}
