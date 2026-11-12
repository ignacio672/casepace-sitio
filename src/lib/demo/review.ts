/**
 * El inicio: la pantalla con la que el estudio revisa el caso.
 *
 * Las filas se completan de a una, cada una con su origen al lado. El ritmo es
 * lento a propósito: no es una demostración de velocidad, es alguien leyendo.
 */
export const REVIEW_TIMING = {
  /** Entre una fila y la siguiente. */
  row: 950,
  /** Antes de la primera fila de cada vuelta. */
  lead: 700,
  /** Quieto al final, antes de volver a empezar. */
  hold: 3800,
} as const;

export type ReviewTimeline = {
  marks: number[];
  /** La vuelta arranca con la primera fila ya completa: nunca se ve vacía. */
  loopStart: number;
  end: number;
};

export function reviewTimeline(rows: number, filled = 1): ReviewTimeline {
  const T = REVIEW_TIMING;
  const marks = Array.from({ length: rows }, (_, i) => T.lead + i * T.row);
  return {
    marks,
    loopStart: marks[Math.min(filled, rows) - 1] ?? 0,
    end: marks[rows - 1] + T.hold,
  };
}
