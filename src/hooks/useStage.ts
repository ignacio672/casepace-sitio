import { useCallback, useRef, useState } from "react";
import { useInView } from "./useInView";
import { usePageVisible } from "./usePageVisible";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Lo que comparten los escenarios animados: corren solos mientras están en
 * pantalla y se pausan fuera de pantalla, con la pestaña oculta, con el mouse
 * encima o con su botón de pausa. Con movimiento reducido quedan quietos.
 */
export function useStage(amount = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount });
  const pageVisible = usePageVisible();
  const still = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);

  const onPointerEnter = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "mouse") setHovered(true);
  }, []);
  const onPointerLeave = useCallback(() => setHovered(false), []);
  const toggle = useCallback(() => setPaused((p) => !p), []);

  return {
    ref,
    still,
    paused,
    toggle,
    playing: inView && pageVisible && !hovered && !paused,
    hoverProps: { onPointerEnter, onPointerLeave },
  };
}
