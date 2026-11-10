import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTimeline } from "@/hooks/useTimeline";

const marks = [100, 200, 300];

describe("useTimeline", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "performance", "Date"] });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms));

  it("avanza un paso por cada marca", () => {
    const { result } = renderHook(() => useTimeline({ marks, end: 500, playing: true }));
    expect(result.current.step).toBe(0);
    advance(100);
    expect(result.current.step).toBe(1);
    advance(200);
    expect(result.current.step).toBe(3);
  });

  it("al terminar vuelve a empezar desde el inicio de la vuelta", () => {
    const { result } = renderHook(() => useTimeline({ marks, start: 150, end: 500, playing: true }));
    expect(result.current).toEqual({ step: 1, lap: 0 });
    advance(350);
    expect(result.current).toEqual({ step: 1, lap: 1 });
    advance(50);
    expect(result.current.step).toBe(2);
  });

  it("fuera de pantalla se pausa y después retoma donde estaba", () => {
    const { result, rerender } = renderHook(({ playing }) => useTimeline({ marks, end: 500, playing }), {
      initialProps: { playing: true },
    });
    advance(150);
    expect(result.current.step).toBe(1);
    rerender({ playing: false });
    advance(5000);
    expect(result.current.step).toBe(1);
    rerender({ playing: true });
    advance(49);
    expect(result.current.step).toBe(1);
    advance(1);
    expect(result.current.step).toBe(2);
  });

  it("sin bucle, se queda en el estado final", () => {
    const { result } = renderHook(() => useTimeline({ marks, end: 500, loop: false, playing: true }));
    advance(2000);
    expect(result.current).toEqual({ step: 3, lap: 0 });
  });

  it("con movimiento reducido muestra el estado final y no programa nada", () => {
    const { result } = renderHook(() => useTimeline({ marks, end: 500, playing: true, still: true }));
    expect(result.current).toEqual({ step: 3, lap: 0 });
    expect(vi.getTimerCount()).toBe(0);
  });
});
