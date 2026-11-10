import { describe, expect, it } from "vitest";
import { INTERVIEW_TURN_NUMBERS, interviewTurns, interviewUi } from "@/content/sampleCase";
import { INTERVIEW_TIMING, interviewState, interviewTimeline, readingTime } from "@/lib/demo/interview";
import { isSorted, stepAt } from "@/lib/timeline";

const timeline = interviewTimeline(interviewTurns.map((turn) => turn.es));

describe("paso 2 · Interview: tiempos", () => {
  it("muestra los turnos 4, 7, 10, 11, 28 y 29, en ese orden", () => {
    expect([...INTERVIEW_TURN_NUMBERS]).toEqual([4, 7, 10, 11, 28, 29]);
    expect(interviewTurns.map((turn) => turn.de)).toEqual([
      "asistente",
      "solicitante",
      "asistente",
      "solicitante",
      "asistente",
      "solicitante",
    ]);
  });

  it("cada mensaje queda 30 ms por carácter, entre 1,2 s y 2,4 s", () => {
    expect(readingTime("a".repeat(10))).toBe(1200);
    expect(readingTime("a".repeat(50))).toBe(1500);
    expect(readingTime("a".repeat(500))).toBe(2400);
  });

  it("los tres puntos duran 300 ms antes de cada mensaje", () => {
    interviewTurns.forEach((_, turn) => {
      const typing = timeline.events.find((e) => e.kind === "typing" && e.turn === turn)!;
      const message = timeline.events.find((e) => e.kind === "message" && e.turn === turn)!;
      expect(message.at - typing.at).toBe(300);
    });
  });

  it("la vuelta dura unos 14 s y queda quieta 3 s al final", () => {
    const moving = timeline.end - INTERVIEW_TIMING.hold;
    expect(moving).toBeGreaterThan(12500);
    expect(moving).toBeLessThan(15500);
    expect(isSorted(timeline.marks)).toBe(true);
  });

  it("la traducción aparece enseguida, sin fundidos largos", () => {
    expect(INTERVIEW_TIMING.translation).toBeLessThanOrEqual(300);
  });
});

describe("paso 2 · Interview: lo que se ve", () => {
  it("nunca arranca vacío: el primer mensaje ya está a la vista con su traducción", () => {
    const state = interviewState(timeline.events, stepAt(timeline.marks, timeline.loopStart));
    expect(state.shown).toBe(1);
    expect(state.translated).toBe(1);
  });

  it("Political opinion se tilda en el turno 7", () => {
    const turn = interviewTurns.find((t) => t.checksPoliticalOpinion)!;
    expect(turn.number).toBe(7);
    expect(interviewTurns.filter((t) => t.checksPoliticalOpinion)).toHaveLength(1);
  });

  it("la declaración suma una frase en los turnos 7, 11 y 29", () => {
    const withSentence = interviewTurns.filter((t) => t.sentence !== undefined);
    expect(withSentence.map((t) => t.number)).toEqual([7, 11, 29]);
    expect(withSentence.map((t) => t.sentence)).toEqual([0, 1, 2]);
    expect(interviewUi.team.sentences).toHaveLength(3);
  });

  it("la parte marcada en citrón es texto que el cliente dijo en ese turno", () => {
    interviewTurns
      .filter((turn) => turn.source)
      .forEach((turn) => {
        expect(turn.de).toBe("solicitante");
        expect(turn.es).toContain(turn.source);
      });
  });

  it("al final se ven los seis mensajes con su traducción", () => {
    const state = interviewState(timeline.events, timeline.events.length);
    expect(state).toEqual({ shown: 6, translated: 6, typing: false });
  });
});
