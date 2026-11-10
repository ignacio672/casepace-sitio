import { describe, expect, it } from "vitest";
import { articles, articleText, trust } from "@/content/trust";
import { minutesToRead, readingLabel } from "@/lib/readingTime";
import { contactSpan } from "@/lib/trustGrid";

describe("/trust", () => {
  it("tiene las siete tarjetas pedidas, con su tema", () => {
    expect(articles.map((a) => [a.topic, a.title])).toEqual([
      ["Security", "How we protect client data"],
      ["Security", "Report a vulnerability"],
      ["Privacy", "What data we process"],
      ["Privacy", "Retention and deletion"],
      ["Privacy", "Subprocessors"],
      ["AI", "How we use AI"],
      ["AI", "Your data and model training"],
    ]);
    expect([...trust.filters]).toEqual(["All", "Security", "Privacy", "AI"]);
  });

  it("cada artículo tiene una dirección propia", () => {
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z-]+$/));
  });

  it("no afirma lo que todavía no se puede afirmar", () => {
    for (const article of articles) {
      // Solo se revisa lo que se afirma: ni los títulos ni los marcadores "Pending" cuentan.
      const claims = article.body
        .map((block) => {
          if (block.type === "p") return block.text;
          if (block.type === "term") return `${block.term} ${block.text}`;
          if (block.type === "table") return block.rows.flat().join(" ");
          return "";
        })
        .join(" ");
      expect(claims).not.toMatch(/https|TLS|SSL|encrypt/i);
      expect(claims).not.toMatch(/backup/i);
      expect(claims).not.toMatch(/SOC ?2|ISO ?27001|HIPAA|certif|complian/i);
      expect(claims).not.toMatch(/upload/i);
    }
  });

  it("nombra a OpenAI y a nadie más", () => {
    const all = articles.map(articleText).join(" ");
    expect(all).toContain("OpenAI");
    expect(all).not.toMatch(/Anthropic|Claude|LangSmith|Gemini/);
  });

  it("calcula el tiempo de lectura, con un minuto como mínimo", () => {
    expect(minutesToRead("")).toBe(1);
    expect(minutesToRead("word ".repeat(220))).toBe(1);
    expect(minutesToRead("word ".repeat(660))).toBe(3);
    expect(readingLabel("word ".repeat(440))).toBe("2 min read");
  });

  it("la celda de contacto completa la última fila de la grilla", () => {
    // Todas (7), Security (2), Privacy (3) y AI (2), a tres y a dos columnas.
    expect(contactSpan(7, 3)).toBe(2);
    expect(contactSpan(2, 3)).toBe(1);
    expect(contactSpan(3, 3)).toBe(3);
    expect(contactSpan(7, 2)).toBe(1);
    expect(contactSpan(2, 2)).toBe(2);
    expect(contactSpan(3, 2)).toBe(1);
    expect(contactSpan(5, 1)).toBe(1);
  });
});
