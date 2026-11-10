/**
 * El elemento vivo del inicio: lo que dijo el cliente, a la izquierda, y lo que
 * va al formulario, a la derecha. Dos frases, una vuelta de unos ocho segundos.
 */
export const HERO_EVENTS = [
  { at: 350, kind: "source-1" }, // se marca la primera frase del cliente
  { at: 600, kind: "sentence-1" }, // aparece su frase en el formulario
  { at: 3700, kind: "typing" }, // el cliente escribe la segunda
  { at: 4000, kind: "said-2" },
  { at: 4200, kind: "source-2" },
  { at: 4450, kind: "sentence-2" },
] as const;

export const HERO_MARKS: readonly number[] = HERO_EVENTS.map((e) => e.at);
export const HERO_END = 8200;

export type HeroState = {
  /** Frases del cliente a la vista (1 o 2). */
  said: 1 | 2;
  typing: boolean;
  /** Frases del cliente ya marcadas como origen. */
  sources: 0 | 1 | 2;
  /** Frases escritas en el formulario. */
  sentences: 0 | 1 | 2;
};

export function heroState(step: number): HeroState {
  return {
    said: step >= 4 ? 2 : 1,
    typing: step === 3,
    sources: step >= 5 ? 2 : step >= 1 ? 1 : 0,
    sentences: step >= 6 ? 2 : step >= 2 ? 1 : 0,
  };
}
