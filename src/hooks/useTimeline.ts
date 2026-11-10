import { useEffect, useRef, useState } from "react";
import { nextMark, stepAt } from "@/lib/timeline";

type Options = {
  /** Instantes, en ms y ordenados, en los que pasa algo. Tiene que ser estable entre renders. */
  marks: readonly number[];
  /** Dónde arranca cada vuelta. */
  start?: number;
  /** Dónde termina la vuelta. */
  end: number;
  loop?: boolean;
  /** En falso, el reloj se detiene y retoma donde estaba. */
  playing: boolean;
  /** Movimiento reducido: se muestra el estado final y no corre ningún reloj. */
  still?: boolean;
};

/**
 * Recorre una línea de tiempo. Devuelve cuántas marcas ya pasaron (`step`) y
 * cuántas vueltas completas hubo (`lap`). Solo actualiza el estado cuando se
 * cruza una marca, nunca en cada cuadro.
 */
export function useTimeline({ marks, start = 0, end, loop = true, playing, still = false }: Options) {
  const [state, setState] = useState(() => ({ step: stepAt(marks, start), lap: 0 }));
  const elapsed = useRef(start);

  useEffect(() => {
    if (still || !playing) return;
    if (!loop && elapsed.current >= end) return;

    let timer: ReturnType<typeof setTimeout>;
    let origin = performance.now() - elapsed.current;
    let done = false;

    const schedule = () => {
      const now = performance.now() - origin;
      const next = nextMark(marks, now);
      const target = next === null || next > end ? end : next;
      timer = setTimeout(tick, Math.max(0, target - now));
    };

    const tick = () => {
      const now = performance.now() - origin;
      if (now >= end) {
        if (!loop) {
          done = true;
          elapsed.current = end;
          setState((s) => (s.step === marks.length ? s : { ...s, step: marks.length }));
          return;
        }
        origin = performance.now() - start;
        elapsed.current = start;
        setState((s) => ({ step: stepAt(marks, start), lap: s.lap + 1 }));
      } else {
        elapsed.current = now;
        const step = stepAt(marks, now);
        setState((s) => (s.step === step ? s : { ...s, step }));
      }
      schedule();
    };

    schedule();
    return () => {
      clearTimeout(timer);
      if (!done) elapsed.current = Math.min(end, performance.now() - origin);
    };
  }, [marks, start, end, loop, playing, still]);

  if (still) return { step: marks.length, lap: 0 };
  return state;
}
