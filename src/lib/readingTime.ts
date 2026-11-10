/** Minutos de lectura de un texto, a ritmo de lectura atenta. Nunca menos de uno. */
export function minutesToRead(text: string, wordsPerMinute = 220): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

export function readingLabel(text: string): string {
  return `${minutesToRead(text)} min read`;
}
