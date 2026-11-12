/**
 * El caso de muestra: María Rivas, ficticia, y su I-589.
 *
 * Los textos de las secciones vienen de material/textos/landings_aprobadas.md.
 * Los datos del caso vienen de material/textos/ (copiados acá como JSON) y las
 * zonas de cada foto, de scripts/regiones_documentos.py.
 */
import script from "./guion_conversacion.json";
import regions from "./regionesDocumentos.json";

export const demo = {
  title: "Watch a case get prepared",
  intro:
    "One client and one form, start to finish. María answers in her own language and is applying for asylum on Form I-589. Every form your team prepares goes through the same three steps: the documents, the interview, and the filing package.",
  claim: "Nothing here is invented: every field traces back to a document or to something the client said.",
  sample: "Sample case. María Rivas is fictional and every document is fabricated.",
  sides: { client: "Client’s phone", team: "Your team’s view" },
  windowTitle: "Rivas, María · I-589",
  controls: { pause: "Pause the animation", play: "Play the animation" },
  steps: {
    documents: {
      number: "1",
      title: "The client uploads from a phone",
      text: "A photo of each document is enough. Casepace reads them and fills every field they support, with the source next to each value.",
      description:
        "Animation. The client photographs five documents on a phone. Each one appears in the team’s view, where Casepace fills the form fields it supports and marks on the photo where each value came from.",
    },
    interview: {
      number: "2",
      title: "The interview, in the client’s language",
      text: "On their own time, across as many sittings as they need. Casepace asks for the detail the form requires and writes the declaration in English for your team.",
      description:
        "Animation. Casepace interviews the client in Spanish on her phone. In the team’s view, the Political opinion box is checked and the declaration is written in English, one sentence at a time.",
    },
    filing: {
      number: "3",
      title: "Your team gets the filing package",
      text: "The official form, current edition, filled and checked, with continuation sheets where the account runs long. Every blank is marked N/A, and every answer shows where it came from.",
      more: "The form arrives as the official USCIS PDF with every field editable, so your paralegals can make changes directly. The documents the client uploaded come with it, attached to the case.",
    },
  },
};

/* ───────────────────────── Paso 1 · Documents ───────────────────────── */

export type SourceBox = { x: number; y: number; w: number; h: number };

export type CaseField = {
  /** Clave del campo en caso_muestra.json. */
  id: string;
  /** Parte y número de ítem en el I-589. */
  ref: string;
  label: string;
  /** Del lado del estudio, siempre en inglés. */
  value: string;
  /** Dónde está el dato en la foto, en % de la foto. */
  source: SourceBox;
};

export type CaseDocument = {
  id: keyof typeof regions;
  /** Como lo ve el cliente en el teléfono. */
  phoneName: string;
  /** Como lo ve el equipo. */
  teamName: string;
  /** Etiqueta de origen al lado de cada valor. */
  tag: string;
  issuer: string;
  fields: CaseField[];
};

type FieldSeed = [id: string, ref: string, label: string, value: string];

function fields(doc: keyof typeof regions, seeds: FieldSeed[]): CaseField[] {
  const boxes = regions[doc] as Record<string, SourceBox>;
  return seeds.map(([id, ref, label, value]) => ({ id, ref, label, value, source: boxes[id] }));
}

export const documents: CaseDocument[] = [
  {
    id: "pasaporte",
    phoneName: "Passport",
    teamName: "Passport",
    tag: "Passport",
    issuer: "República Bolivariana de Venezuela",
    fields: fields("pasaporte", [
      ["4", "A.I 4", "Last name", "Rivas Montero"],
      ["5", "A.I 5", "First name", "Maria"],
      ["6", "A.I 6", "Middle name", "Alejandra"],
      ["23", "A.I 12", "Date of birth", "04/18/1991"],
      ["25", "A.I 14", "Present nationality", "Venezuelan"],
      ["36.1", "A.I 21", "Passport number", "148392756"],
    ]),
  },
  {
    id: "matrimonio",
    phoneName: "Marriage certificate",
    teamName: "Marriage certificate",
    tag: "Marriage certificate",
    issuer: "Registro Civil de Maracaibo, Zulia",
    fields: fields("matrimonio", [
      ["22", "A.I 11", "Marital status", "Married"],
      ["46", "A.II 5", "Spouse’s last name", "Fernandez Soto"],
      ["47", "A.II 6", "Spouse’s first name", "Carlos"],
      ["48", "A.II 7", "Spouse’s middle name", "Eduardo"],
      ["50", "A.II 9", "Date of marriage", "08/22/2013"],
    ]),
  },
  {
    id: "nac_santiago",
    phoneName: "Birth certificate",
    teamName: "Birth certificate (Santiago)",
    tag: "Birth certificate",
    issuer: "Registro Civil de Maracaibo, Zulia",
    fields: fields("nac_santiago", [
      ["71.1", "A.II 5", "Child’s last name", "Fernandez Rivas"],
      ["72.1", "A.II 6", "Child’s first name", "Santiago"],
      ["74.1", "A.II 8", "Date of birth", "06/09/2015"],
      ["75.1", "A.II 9", "City and country of birth", "Maracaibo, Venezuela"],
    ]),
  },
  {
    id: "nac_valentina",
    phoneName: "Birth certificate",
    teamName: "Birth certificate (Valentina)",
    tag: "Birth certificate",
    issuer: "Registro Civil de Maracaibo, Zulia",
    fields: fields("nac_valentina", [
      ["71.2", "A.II 5", "Child’s last name", "Fernandez Rivas"],
      ["72.2", "A.II 6", "Child’s first name", "Valentina"],
      ["74.2", "A.II 8", "Date of birth", "01/23/2019"],
      ["75.2", "A.II 9", "City and country of birth", "Maracaibo, Venezuela"],
    ]),
  },
  {
    id: "i94",
    phoneName: "I-94 record",
    teamName: "I-94 arrival record",
    tag: "I-94 record",
    issuer: "U.S. Customs and Border Protection",
    fields: fields("i94", [
      ["32.1.1", "A.I 19c", "Date of entry", "03/15/2026"],
      ["32.1.2", "A.I 19c", "Place of entry", "Eagle Pass, Texas"],
      ["32.1.3", "A.I 19c", "Status at entry", "Humanitarian parole"],
    ]),
  },
];

/** Cómo se traducen al inglés los valores que el caso guarda en español. */
export const VALUE_TRANSLATIONS: Record<string, string> = {
  casado: "Married",
  Venezolana: "Venezuelan",
  "Parole humanitario": "Humanitarian parole",
};

export const documentsUi = {
  phone: { title: "Your documents", takePhoto: "Take a photo", uploading: "Uploading", done: "Done" },
  team: { list: "Documents", reading: "Reading", done: "Done" },
};

/* ───────────────────────── Paso 2 · Interview ───────────────────────── */

export type Turn = { de: "asistente" | "solicitante"; es: string; en: string };

const allTurns = script.turnos as Turn[];

/** Los seis turnos del guion que se muestran, por su número en el guion de 34. */
export const INTERVIEW_TURN_NUMBERS = [4, 7, 10, 11, 28, 29] as const;

export type InterviewTurn = Turn & {
  number: number;
  /** La parte del mensaje de donde sale lo que se escribe en el formulario. */
  source?: string;
  /** Qué frase de la declaración suma este turno. */
  sentence?: number;
  /** Si este turno tilda la casilla Political opinion. */
  checksPoliticalOpinion?: boolean;
};

const effects: Record<number, Pick<InterviewTurn, "source" | "sentence" | "checksPoliticalOpinion">> = {
  7: {
    source: "nos paramos en la puerta del hospital con carteles. éramos como quince enfermeras. yo hablé con la prensa",
    sentence: 0,
    checksPoliticalOpinion: true,
  },
  11: {
    source: "de civil. cuatro. salía del turno de noche. no me mostraron ninguna orden",
    sentence: 1,
  },
  29: {
    source: "me agarran en el aeropuerto y esa vez no salgo",
    sentence: 2,
  },
};

export const interviewTurns: InterviewTurn[] = INTERVIEW_TURN_NUMBERS.map((number) => ({
  ...allTurns[number - 1],
  number,
  ...effects[number],
}));

export const interviewUi = {
  phone: { title: "Casepace", subtitle: "Interview" },
  team: {
    basis: "Seeking asylum or withholding of removal based on",
    checkboxes: ["Political opinion", "Membership in a particular social group", "Torture Convention"],
    past: "Harm or mistreatment in the past",
    pastRef: "B.1.A",
    fear: "Fear of return",
    fearRef: "B.1.B",
    tag: "Interview",
    /** Pie de la ventana. Es la tercera línea de la tarjeta de entrega. */
    footer: "Part B account, written in English from the interview",
    /** Ya escrito cuando empieza la vuelta: viene de turnos anteriores del guion. */
    opening: "I am an intensive care nurse. I worked for twelve years at the University Hospital of Maracaibo.",
    /** Las tres frases que suma la entrevista. Coinciden con la página 5 del PDF. */
    sentences: [
      "In February 2019, the hospital ran out of basic supplies. Together with fourteen other nurses, we organized a protest in front of the hospital entrance. I was one of those who spoke to the press.",
      "On March 11, 2019, four plainclothes men detained me as I left the night shift. They did not show a warrant.",
      "I fear that if I return, they will detain me at the airport and this time not release me.",
    ],
  },
};

/* ───────────────────────── El inicio ───────────────────────── */

/** Las dos frases del cliente del inicio: turnos 11 y 13 del guion. */
export const heroSaid = [allTurns[10], allTurns[12]].map((turn) => ({ es: turn.es, en: turn.en }));

/** El recorte del I-589 del inicio. El texto es el de la página 5 del PDF de muestra. */
export const heroSheet = {
  part: "Part B. Information About Your Application",
  letter: "A.",
  question:
    "Have you, your family, or close friends or colleagues ever experienced harm or mistreatment or threats in the past by anyone?",
  no: "No",
  yes: "Yes",
  before: [
    "I am an intensive care nurse. I worked for twelve years at the University Hospital of Maracaibo.",
    "In February 2019, the hospital ran out of basic supplies. There were no gauzes, no antibiotics, and not enough oxygen. I saw three patients die in a week from preventable causes. Together with fourteen other nurses, we organized a protest in front of the hospital entrance. We carried signs with the list of missing items. I was one of those who spoke to the press.",
  ],
  /** Una por cada frase del cliente, en el mismo orden. */
  sentences: [
    "On March 11, 2019, four plainclothes men detained me as I left the night shift. They did not show a warrant.",
    "They took me to a SEBIN facility on Avenida 15. I was held for four days in a windowless room.",
  ],
  nextLetter: "B.",
  nextQuestion: "Do you fear harm or mistreatment if you return to your home country?",
};

/* ───────────────────────── Paso 3 · Filing package ───────────────────────── */

export const filing = {
  pages: 7,
  pageAlt: (n: number) => `Form I-589, completed, page ${n} of 12`,
  ready: "Filing package ready",
  lines: [
    "Form I-589, current edition · 12 pages",
    "Continuation sheets · 5 pages",
    "Part B account, written in English from the interview",
    "202 answers · 53 checkboxes · 109 blanks marked N/A",
  ],
  download: "Download the sample PDF",
};

export const downloadForm = {
  title: "Download the completed form",
  text: "Tell us where to send it and the PDF opens right here. We use it to follow up once, and for nothing else.",
  name: "Your name",
  email: "Work email",
  organization: "Organization or firm",
  optional: "optional",
  submit: "Get the PDF",
  note: "Your team reviews, signs and files. Casepace prepares; it does not represent anyone before USCIS.",
  walkthrough: "Book a walkthrough with us",
  ready: "The completed form is ready.",
  open: "Open the PDF",
};
