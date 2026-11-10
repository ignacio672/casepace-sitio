/**
 * Paso 3 del caso de muestra: la entrega. Pasa una sola vez, en menos de 1,5 s.
 *
 * Tiempos de material/pedidos_anteriores/07_demo_rapido_y_entrega.md.
 */
import type { FanOptions } from "@/lib/fan";

export const FILING_TIMING = {
  /** Lo que tarda cada página en llegar. */
  page: 300,
  /** Entre una página y la siguiente. */
  stagger: 60,
  /** Entre la última página y la tarjeta de entrega. */
  cardDelay: 300,
  /** Lo que tarda la tarjeta en entrar. */
  card: 240,
} as const;

/**
 * Geometría del abanico. Las pruebas comprueban que con estas medidas las
 * páginas entran enteras en su panel, sin tocar los bordes.
 */
export const FILING_FAN: FanOptions = { pages: 7, boxRatio: 0.64, pageWidth: 34, step: 3.2, radius: 110 };

export type FilingTimeline = {
  /** Retraso de cada página, en el orden en que llegan. */
  pageDelays: number[];
  cardDelay: number;
  total: number;
};

export function filingTimeline(pages: number): FilingTimeline {
  const T = FILING_TIMING;
  const pageDelays = Array.from({ length: pages }, (_, i) => i * T.stagger);
  const lastPageLands = (pages - 1) * T.stagger + T.page;
  const cardDelay = lastPageLands + T.cardDelay;
  return { pageDelays, cardDelay, total: cardDelay + T.card };
}
