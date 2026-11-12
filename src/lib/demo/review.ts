/**
 * El inicio: la pantalla de revisión del estudio.
 *
 * Las filas del formulario se completan de a una, cada una con su origen al
 * lado. Es lo que promete el título: el cliente hace la carga, el paralegal
 * revisa.
 */
export const REVIEW_TIMING = {
  /** Entre una fila y la siguiente. */
  row: 420,
  /** Antes de la primera fila de cada vuelta. */
  lead: 500,
  /** Quieto al final, antes de volver a empezar. */
  hold: 3200,
} as const;

export type ReviewTimeline = {
  marks: number[];
  /** La vuelta arranca con las primeras filas ya completas: nunca se ve vacía. */
  loopStart: number;
  end: number;
};

export function reviewTimeline(rows: number, filled = 2): ReviewTimeline {
  const T = REVIEW_TIMING;
  const marks = Array.from({ length: rows }, (_, i) => T.lead + i * T.row);
  return {
    marks,
    loopStart: marks[Math.min(filled, rows) - 1] ?? 0,
    end: marks[rows - 1] + T.hold,
  };
}

/** Cuántas partes del formulario están completas con `step` filas hechas. */
export function partsDone(rowParts: readonly number[], step: number): number {
  const done = new Set(rowParts.slice(0, step));
  return done.size;
}
