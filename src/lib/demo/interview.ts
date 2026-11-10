/**
 * Paso 2 del caso de muestra: la entrevista. Es el que se lee, así que cada
 * mensaje queda en pantalla según su largo.
 *
 * Tiempos de material/pedidos_anteriores/07_demo_rapido_y_entrega.md.
 */
export const INTERVIEW_TIMING = {
  /** Los tres puntos de "escribiendo". */
  typing: 300,
  /** Lectura: milisegundos por carácter, con piso y techo. */
  perChar: 30,
  min: 1200,
  max: 2400,
  /** La traducción aparece un momento después del mensaje. */
  translation: 200,
  /** Quieto al final, antes de volver a empezar. */
  hold: 3000,
} as const;

/** Cuánto queda en pantalla un mensaje antes de que empiece el siguiente. */
export function readingTime(text: string): number {
  const T = INTERVIEW_TIMING;
  return Math.min(T.max, Math.max(T.min, text.length * T.perChar));
}

export type InterviewEvent = { at: number; turn: number; kind: "typing" | "message" | "translation" };

export type InterviewTimeline = {
  events: InterviewEvent[];
  marks: number[];
  /** La vuelta arranca con el primer mensaje ya a la vista. */
  loopStart: number;
  end: number;
};

export function interviewTimeline(messages: readonly string[]): InterviewTimeline {
  const T = INTERVIEW_TIMING;
  const events: InterviewEvent[] = [];
  let at = 0;

  messages.forEach((text, turn) => {
    events.push(
      { at, turn, kind: "typing" },
      { at: at + T.typing, turn, kind: "message" },
      { at: at + T.typing + T.translation, turn, kind: "translation" },
    );
    at += T.typing + readingTime(text);
  });

  const loopStart = events.find((e) => e.kind === "translation" && e.turn === 0)?.at ?? 0;
  return { events, marks: events.map((e) => e.at), loopStart, end: at + T.hold };
}

export type InterviewState = {
  /** Cuántos mensajes hay a la vista. */
  shown: number;
  /** Cuántos ya tienen su traducción. */
  translated: number;
  /** Si el próximo mensaje se está escribiendo. */
  typing: boolean;
};

export function interviewState(events: readonly InterviewEvent[], step: number): InterviewState {
  const state: InterviewState = { shown: 0, translated: 0, typing: false };
  for (const event of events.slice(0, step)) {
    if (event.kind === "typing") state.typing = true;
    if (event.kind === "message") {
      state.typing = false;
      state.shown = event.turn + 1;
    }
    if (event.kind === "translation") state.translated = event.turn + 1;
  }
  return state;
}
