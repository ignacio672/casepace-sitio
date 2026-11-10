/**
 * Línea de tiempo de un escenario: una lista ordenada de instantes (en ms) en
 * los que pasa algo. Todo lo demás se deduce de cuántos ya pasaron.
 */

/** Cuántas marcas ya pasaron en el instante `t`. */
export function stepAt(marks: readonly number[], t: number): number {
  let n = 0;
  while (n < marks.length && marks[n] <= t) n += 1;
  return n;
}

/** La próxima marca después de `t`, o `null` si no queda ninguna. */
export function nextMark(marks: readonly number[], t: number): number | null {
  for (const mark of marks) {
    if (mark > t) return mark;
  }
  return null;
}

export function isSorted(marks: readonly number[]): boolean {
  return marks.every((mark, i) => i === 0 || marks[i - 1] <= mark);
}
