import { Pause, Play } from "lucide-react";
import { demo } from "@/content/sampleCase";
import { cn } from "@/lib/utils";

/**
 * Botón de pausa de un escenario. Lo que se mueve solo durante más de cinco
 * segundos tiene que poder detenerse también con el teclado.
 */
export function StageControl({
  paused,
  onToggle,
  dark = false,
  className,
}: {
  paused: boolean;
  onToggle: () => void;
  dark?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? demo.controls.play : demo.controls.pause}
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-200",
        dark
          ? "border-ink-line text-ink-muted hover:border-paper/50 hover:text-paper"
          : "border-line-strong text-muted hover:border-ink hover:text-ink",
        className,
      )}
    >
      {paused ? <Play size={13} strokeWidth={2} className="ml-px" /> : <Pause size={13} strokeWidth={2} />}
    </button>
  );
}
