/**
 * En /trust, la celda de contacto cierra la grilla: ocupa las columnas que
 * dejan libres las tarjetas en la última fila, así nunca queda un hueco.
 */
export function contactSpan(cards: number, columns: number): number {
  if (columns <= 1) return 1;
  const used = cards % columns;
  return used === 0 ? columns : columns - used;
}
