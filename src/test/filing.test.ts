import { describe, expect, it } from "vitest";
import { filing } from "@/content/sampleCase";
import { FILING_FAN, FILING_TIMING, filingTimeline } from "@/lib/demo/filing";
import { fan, fanBounds, fanFits } from "@/lib/fan";

describe("paso 3 · Filing package: tiempos", () => {
  const timeline = filingTimeline(filing.pages);

  it("las 7 páginas llegan de a una, cada 60 ms, y cada una tarda 300 ms", () => {
    expect(timeline.pageDelays).toEqual([0, 60, 120, 180, 240, 300, 360]);
    expect(FILING_TIMING.page).toBe(300);
  });

  it("la tarjeta entra 300 ms después de la última página", () => {
    expect(timeline.cardDelay).toBe(360 + 300 + 300);
  });

  it("todo pasa en menos de 1,5 s", () => {
    expect(timeline.total).toBeLessThan(1500);
  });
});

describe("paso 3 · Filing package: el abanico", () => {
  it("tiene una hoja por página y es simétrico", () => {
    const leaves = fan(FILING_FAN);
    expect(leaves).toHaveLength(filing.pages);
    expect(leaves[0].rotation).toBeCloseTo(-leaves[6].rotation);
    expect(leaves[3].rotation).toBeCloseTo(0);
    expect(leaves[0].left + leaves[6].left).toBeCloseTo(100);
  });

  it("entra entero en su panel, sin tocar los bordes", () => {
    // Al menos 5 % libre en cada borde, a cualquier ancho: todo va en porcentaje.
    expect(fanFits(FILING_FAN, 5)).toBe(true);
    const bounds = fanBounds(FILING_FAN);
    expect(bounds.left).toBeGreaterThan(5);
    expect(bounds.right).toBeLessThan(95);
    expect(bounds.top).toBeGreaterThan(5);
    expect(bounds.bottom).toBeLessThan(95);
  });

  it("avisa cuando un abanico no entra", () => {
    expect(fanFits({ ...FILING_FAN, pageWidth: 60 }, 5)).toBe(false);
    expect(fanFits({ ...FILING_FAN, boxRatio: 0.3 }, 5)).toBe(false);
  });
});
