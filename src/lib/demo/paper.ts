/**
 * El momento vivo del inicio: sobre la foto del I-589 real, el producto marca
 * la casilla de la Convención contra la Tortura con lo que dijo la clienta.
 *
 * Es el turno 18 del guion: cuenta que la golpearon y Casepace tilda la
 * casilla. El mismo gesto que el paso Interview, sobre el papel de verdad.
 */
export const PAPER_EVENTS = [
  { at: 600, kind: "said" }, // aparece lo que dijo la clienta
  { at: 1350, kind: "mark" }, // el resaltador pasa sobre la parte que importa
  { at: 2150, kind: "check" }, // la casilla queda tildada
] as const;

export const PAPER_MARKS: readonly number[] = PAPER_EVENTS.map((e) => e.at);
export const PAPER_END = 8600;

export type PaperState = { said: boolean; marked: boolean; checked: boolean };

export function paperState(step: number): PaperState {
  return { said: step >= 1, marked: step >= 2, checked: step >= 3 };
}
