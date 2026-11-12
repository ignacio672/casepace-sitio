import { describe, expect, it } from "vitest";
import caso from "@/content/caso_muestra.json";
import { interviewUi, reviewParts, reviewRows, VALUE_TRANSLATIONS } from "@/content/sampleCase";
import { partsDone, REVIEW_TIMING, reviewTimeline } from "@/lib/demo/review";
import { isSorted, stepAt } from "@/lib/timeline";

const original = caso as Record<string, string>;
const timeline = reviewTimeline(reviewRows.length);

describe("el inicio: la pantalla de revisión", () => {
  it("las marcas están ordenadas y hay una por fila", () => {
    expect(isSorted(timeline.marks)).toBe(true);
    expect(timeline.marks).toHaveLength(reviewRows.length);
  });

  it("nunca arranca vacía: la vuelta empieza con filas ya completas", () => {
    const step = stepAt(timeline.marks, timeline.loopStart);
    expect(step).toBe(2);
    expect(step).toBeLessThan(reviewRows.length);
  });

  it("la vuelta dura unos 7 s y queda quieta al final", () => {
    expect(timeline.end).toBeGreaterThan(5000);
    expect(timeline.end).toBeLessThan(9000);
    expect(timeline.end - timeline.marks[timeline.marks.length - 1]).toBe(REVIEW_TIMING.hold);
  });

  it("cada fila muestra de dónde salió", () => {
    for (const row of reviewRows) {
      expect(row.source).toBeTruthy();
      expect(row.ref).toMatch(/^[AB]\b|^B\./);
      expect(row.value).toBeTruthy();
    }
  });

  it("los valores de documentos salen del archivo del caso", () => {
    const delCaso = Object.values(original);
    const traducidos = delCaso.map((v) => VALUE_TRANSLATIONS[v] ?? v);
    for (const row of reviewRows.filter((r) => r.source !== interviewUi.team.tag)) {
      expect(traducidos, `fila ${row.ref}`).toContain(row.value);
    }
  });

  it("la frase de la entrevista es la misma que escribe el paso Interview", () => {
    expect(reviewRows.at(-1)!.value).toBe(interviewUi.team.sentences[0]);
  });

  it("las partes se van completando con las filas", () => {
    expect(partsDone(reviewRows.map((r) => r.part), 0)).toBe(0);
    expect(partsDone(reviewRows.map((r) => r.part), 1)).toBe(1);
    expect(partsDone(reviewRows.map((r) => r.part), reviewRows.length)).toBe(reviewParts.length);
  });
});
