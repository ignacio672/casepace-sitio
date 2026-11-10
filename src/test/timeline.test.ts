import { describe, expect, it } from "vitest";
import { isSorted, nextMark, stepAt } from "@/lib/timeline";

describe("línea de tiempo", () => {
  const marks = [0, 100, 100, 250];

  it("cuenta las marcas que ya pasaron", () => {
    expect(stepAt(marks, -1)).toBe(0);
    expect(stepAt(marks, 0)).toBe(1);
    expect(stepAt(marks, 99)).toBe(1);
    expect(stepAt(marks, 100)).toBe(3);
    expect(stepAt(marks, 1000)).toBe(4);
  });

  it("da la próxima marca, o null al final", () => {
    expect(nextMark(marks, 0)).toBe(100);
    expect(nextMark(marks, 100)).toBe(250);
    expect(nextMark(marks, 250)).toBeNull();
  });

  it("reconoce si las marcas están ordenadas", () => {
    expect(isSorted(marks)).toBe(true);
    expect(isSorted([10, 5])).toBe(false);
  });
});
