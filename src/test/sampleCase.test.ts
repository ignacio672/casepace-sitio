import { describe, expect, it } from "vitest";
import caso from "@/content/caso_muestra.json";
import { documents, filing, interviewUi, VALUE_TRANSLATIONS } from "@/content/sampleCase";
import { cropAround, cropContains } from "@/lib/crop";

const original = caso as Record<string, string>;

describe("el caso de muestra: nada se inventa", () => {
  it("cada valor que se muestra sale del archivo del caso", () => {
    for (const doc of documents) {
      for (const field of doc.fields) {
        const stored = original[field.id];
        expect(stored, `campo ${field.id}`).toBeTruthy();
        expect(field.value).toBe(VALUE_TRANSLATIONS[stored] ?? stored);
      }
    }
  });

  it("del lado del estudio los valores van en inglés", () => {
    const values = documents.flatMap((doc) => doc.fields.map((field) => field.value));
    expect(values).toContain("Married");
    expect(values).toContain("Humanitarian parole");
    expect(values).toContain("Venezuelan");
    for (const value of values) {
      expect(value).not.toMatch(/casad|Venezolan|Parole humanitario|femenino|masculino|solter/i);
    }
  });

  it("los documentos van en el orden pedido", () => {
    expect(documents.map((doc) => doc.phoneName)).toEqual([
      "Passport",
      "Marriage certificate",
      "Birth certificate",
      "Birth certificate",
      "I-94 record",
    ]);
  });

  it("cada dato tiene marcada la zona de la foto de donde sale", () => {
    for (const doc of documents) {
      for (const field of doc.fields) {
        const { x, y, w, h } = field.source;
        expect(w).toBeGreaterThan(0);
        expect(h).toBeGreaterThan(0);
        expect(x).toBeGreaterThanOrEqual(0);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(x + w).toBeLessThanOrEqual(100);
        expect(y + h).toBeLessThanOrEqual(100);
      }
    }
  });

  it("la franja de la foto contiene todas las zonas del documento, en escritorio y en teléfono", () => {
    for (const doc of documents) {
      const boxes = doc.fields.map((field) => field.source);
      for (const aspect of [3.1, 2]) {
        const crop = cropAround(boxes, { aspect });
        expect(cropContains(crop, boxes), `${doc.id} a ${aspect}`).toBe(true);
        expect(crop.x).toBeGreaterThanOrEqual(0);
        expect(crop.y).toBeGreaterThanOrEqual(0);
        expect(crop.x + crop.w).toBeLessThanOrEqual(100.001);
        expect(crop.y + crop.h).toBeLessThanOrEqual(100.001);
        // La franja mantiene la proporción pedida.
        expect((crop.w / crop.h) * (4 / 3)).toBeCloseTo(aspect);
      }
    }
  });

  it("las frases de la declaración coinciden con el relato del caso", () => {
    // El relato original está en español; se comprueban los datos duros.
    expect(original["157.2"]).toContain("El 11 de marzo de 2019, cuatro hombres de civil");
    expect(interviewUi.team.sentences[1]).toContain("March 11, 2019");
    expect(original["158.2"]).toContain("me detengan en el aeropuerto");
    expect(interviewUi.team.sentences[2]).toContain("at the airport");
  });

  it("la tarjeta de entrega lleva las cifras reales del PDF", () => {
    expect(filing.lines).toEqual([
      "Form I-589, current edition · 12 pages",
      "Continuation sheets · 5 pages",
      "Part B account, written in English from the interview",
      "202 answers · 53 checkboxes · 109 blanks marked N/A",
    ]);
    expect(filing.pages).toBe(7);
  });
});
