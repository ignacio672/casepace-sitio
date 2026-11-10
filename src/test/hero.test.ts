import { describe, expect, it } from "vitest";
import { heroSaid, heroSheet } from "@/content/sampleCase";
import { HERO_END, HERO_EVENTS, HERO_MARKS, heroState } from "@/lib/demo/hero";
import { isSorted } from "@/lib/timeline";

describe("el inicio: lo que dijo el cliente y lo que va al formulario", () => {
  it("las marcas están ordenadas y la vuelta dura unos 8 s", () => {
    expect(isSorted(HERO_MARKS)).toBe(true);
    expect(HERO_END).toBeGreaterThan(HERO_MARKS[HERO_MARKS.length - 1] + 3000);
    expect(HERO_END).toBeLessThan(9000);
  });

  it("nunca arranca vacío: la primera frase del cliente ya está a la vista", () => {
    expect(heroState(0)).toEqual({ said: 1, typing: false, sources: 0, sentences: 0 });
  });

  it("primero se marca el origen y enseguida aparece la frase en el formulario", () => {
    expect(heroState(1)).toMatchObject({ sources: 1, sentences: 0 });
    expect(heroState(2)).toMatchObject({ sources: 1, sentences: 1 });
    const source = HERO_EVENTS.find((e) => e.kind === "source-1")!.at;
    const sentence = HERO_EVENTS.find((e) => e.kind === "sentence-1")!.at;
    expect(sentence - source).toBeLessThanOrEqual(300);
  });

  it("al final están las dos frases, cada una con su origen", () => {
    expect(heroState(HERO_MARKS.length)).toEqual({ said: 2, typing: false, sources: 2, sentences: 2 });
  });

  it("hay una frase del formulario por cada frase del cliente", () => {
    expect(heroSaid).toHaveLength(2);
    expect(heroSheet.sentences).toHaveLength(2);
    expect(heroSaid[0].es).toMatch(/^de civil\. cuatro\./);
    expect(heroSaid[1].es).toMatch(/^al SEBIN/);
  });
});
