/**
 * Textos y enlaces comunes a todo el sitio: barra superior y pie.
 */
export type Audience = "firms" | "organizations";

export const ROUTES: Record<Audience, string> = {
  firms: "/for-firms",
  organizations: "/for-organizations",
};

/** Mismo destino que el botón del sitio publicado. */
export const WALKTHROUGH_HREF = "mailto:hola@casepace.co?subject=Walkthrough%20request";
export const CONTACT_HREF = "mailto:hola@casepace.co";

/** El PDF del caso de muestra, servido desde public/. */
export const SAMPLE_PDF = "/caso_muestra_i589_en.pdf";

/** Anclas de la landing. Coinciden con las del sitio publicado. */
export const ANCHORS = {
  demo: "demo",
  download: "demo-download",
  who: "who",
  whoWeAre: "who-we-are",
  questions: "questions",
} as const;

export const nav = {
  whoItsFor: "Who it’s for",
  seeTheDemo: "See the demo",
  trust: "Trust",
  forFirms: "For firms",
  forOrganizations: "For organizations",
  walkthrough: "Book a walkthrough",
  menu: "Menu",
  close: "Close",
  skip: "Skip to content",
};

export const footer = {
  columns: {
    product: "Product",
    company: "Company",
    legal: "Legal",
  },
  links: {
    forFirms: "For firms",
    forOrganizations: "For organizations",
    demo: "Demo",
    whoWeAre: "Who we are",
    trust: "Trust",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
  },
  /** Cierre legal. Va tal cual; el año se calcula solo. */
  trademark: (year: number) =>
    `Casepace™ is a trademark of Human Migrate LLC. © ${year} Human Migrate LLC. All rights reserved.`,
  address: "5442 Ventura Blvd., Ste 201-1625, Sherman Oaks, CA 91403, United States",
  notLawFirm: "Casepace prepares immigration forms. It is not a law firm and does not provide legal advice.",
  sampleCase:
    "Sample case figures come from a fictional applicant. No real client file is used in any demonstration.",
};

export const legalPages = {
  privacy: {
    title: "Privacy",
    pending: "Pending: privacy policy, to be provided by Human Migrate LLC.",
  },
  terms: {
    title: "Terms",
    pending: "Pending: terms of service, to be provided by Human Migrate LLC.",
  },
};

export const notFound = {
  title: "This page does not exist.",
  back: "Back to Casepace",
};
