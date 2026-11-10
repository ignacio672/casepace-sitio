import { describe, expect, it } from "vitest";
import { landings, shared } from "@/content/landings";
import { demo, documentsUi, downloadForm, filing, interviewUi } from "@/content/sampleCase";
import { footer, legalPages, nav, notFound } from "@/content/site";
import { articles, trust } from "@/content/trust";

/** Todos los textos en inglés del sitio, como una sola lista de cadenas. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (typeof value === "function") return [String((value as (n: number) => string)(2026))];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const all = strings([
  landings,
  shared,
  demo,
  documentsUi,
  downloadForm,
  filing,
  interviewUi,
  footer,
  legalPages,
  nav,
  notFound,
  trust,
  articles,
]);

describe("cómo se escribe", () => {
  it("no hay signos de exclamación", () => {
    all.forEach((text) => expect(text).not.toContain("!"));
  });

  it("no hay palabras de folleto", () => {
    const banned = /revolution|AI-powered|effortless|transform your|seamless|unleash|next-gen|game.chang|cutting.edge/i;
    all.forEach((text) => expect(text).not.toMatch(banned));
  });

  it("no hay palabras de hoja de ruta", () => {
    all.forEach((text) => expect(text).not.toMatch(/coming soon|available today|roadmap|\bbeta\b/i));
  });

  it("no se nombra a Anthropic ni a Claude", () => {
    all.forEach((text) => expect(text).not.toMatch(/Anthropic|Claude/));
  });

  it("el pie legal va tal cual, con el año calculado", () => {
    expect(footer.trademark(2027)).toBe(
      "Casepace™ is a trademark of Human Migrate LLC. © 2027 Human Migrate LLC. All rights reserved.",
    );
    expect(footer.address).toBe("5442 Ventura Blvd., Ste 201-1625, Sherman Oaks, CA 91403, United States");
  });

  it("las dos landings tienen los mismos bloques con textos distintos", () => {
    expect(Object.keys(landings.firms)).toEqual(Object.keys(landings.organizations));
    expect(landings.firms.hero.title.join(" ")).toBe("Your client does the intake. Your paralegal reviews it.");
    expect(landings.organizations.hero.title.join(" ")).toBe("File more cases with the team you already have.");
  });
});
