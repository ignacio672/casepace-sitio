import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** Qué parte del elemento tiene que verse, de 0 a 1. */
  amount?: number;
  /** Si queda en verdadero para siempre después de la primera vez. */
  once?: boolean;
};

/** Si el elemento está en pantalla. Sirve para pausar lo que no se ve. */
export function useInView(ref: RefObject<Element>, { amount = 0.25, once = false }: Options = {}): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold: amount },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, amount, once]);

  return inView;
}
