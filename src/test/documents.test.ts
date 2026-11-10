import { describe, expect, it } from "vitest";
import { documents } from "@/content/sampleCase";
import { DOCS_TIMING, documentsState, documentsTimeline } from "@/lib/demo/documents";
import { isSorted, stepAt } from "@/lib/timeline";

const counts = documents.map((doc) => doc.fields.length);
const timeline = documentsTimeline(counts);
const at = (kind: string, doc: number) => timeline.events.find((e) => e.kind === kind && e.doc === doc)!.at;

describe("paso 1 · Documents: tiempos", () => {
  it("las marcas están ordenadas", () => {
    expect(isSorted(timeline.marks)).toBe(true);
  });

  it("cada documento tarda unos 1,1 s en el teléfono", () => {
    for (let doc = 1; doc < counts.length; doc += 1) {
      expect(at("camera", doc) - at("camera", doc - 1)).toBe(1100);
    }
    // Visor, destello de 120 ms, "Uploading" y "Done", todo dentro de ese tiempo.
    expect(at("uploading", 0) - at("flash", 0)).toBe(120);
    expect(at("done", 0) - at("camera", 0)).toBeLessThanOrEqual(DOCS_TIMING.perDocument);
  });

  it("el documento entra en la vista del equipo 150 ms después del Done del teléfono", () => {
    counts.forEach((_, doc) => expect(at("listed", doc) - at("done", doc)).toBe(150));
  });

  it("los campos se completan cada 80 ms, después del fundido de 200 ms", () => {
    counts.forEach((count, doc) => {
      const fields = timeline.events.filter((e) => e.kind === "field" && e.doc === doc);
      expect(fields).toHaveLength(count);
      expect(fields[0].at - at("listed", doc)).toBe(200);
      fields.slice(1).forEach((field, i) => expect(field.at - fields[i].at).toBe(80));
    });
  });

  it("cada documento muestra entre 3 y 6 campos", () => {
    counts.forEach((count) => {
      expect(count).toBeGreaterThanOrEqual(3);
      expect(count).toBeLessThanOrEqual(6);
    });
  });

  it("la vuelta dura unos 6 s y queda quieta 2 s al final", () => {
    const moving = timeline.end - DOCS_TIMING.hold;
    expect(moving).toBeGreaterThan(5000);
    expect(moving).toBeLessThan(7000);
    expect(timeline.end - timeline.events[timeline.events.length - 1].at).toBe(2000);
  });

  it("ninguna transición pasa de 300 ms", () => {
    expect(DOCS_TIMING.swap).toBeLessThanOrEqual(300);
    expect(DOCS_TIMING.highlight).toBeLessThanOrEqual(300);
    expect(DOCS_TIMING.uploading).toBeLessThanOrEqual(300);
  });
});

describe("paso 1 · Documents: lo que se ve", () => {
  it("nunca arranca vacío: el primer documento ya está subido y sus campos, a medio completar", () => {
    const state = documentsState(timeline.events, stepAt(timeline.marks, timeline.loopStart));
    expect(state.phone[0]).toBe("done");
    expect(state.team[0]).toBe("reading");
    expect(state.active).toBe(0);
    expect(state.filled).toBeGreaterThan(0);
    expect(state.filled).toBeLessThan(counts[0]);
  });

  it("mientras se lee un documento, solo se muestran sus campos", () => {
    for (let step = 0; step <= timeline.events.length; step += 1) {
      const state = documentsState(timeline.events, step);
      if (state.active !== null) expect(state.filled).toBeLessThanOrEqual(counts[state.active]);
    }
  });

  it("al final están los cinco documentos leídos y el último con todos sus campos", () => {
    const state = documentsState(timeline.events, timeline.events.length);
    expect(state.phone).toEqual(Array(5).fill("done"));
    expect(state.team).toEqual(Array(5).fill("done"));
    expect(state.camera).toBeNull();
    expect(state.active).toBe(4);
    expect(state.filled).toBe(counts[4]);
  });
});
