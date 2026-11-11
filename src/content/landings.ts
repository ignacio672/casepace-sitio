/**
 * Textos de las dos landings. Vienen de material/textos/landings_aprobadas.md
 * y de INSTRUCCIONES.md, y van tal cual. Acá solo se ordenan.
 *
 * Un párrafo es una lista de tramos. Cada tramo puede ir:
 *   - strong:  en negrita, como en el texto aprobado;
 *   - mark:    con el resaltador citrón (uno solo en todo el texto corrido);
 *   - pending: como marcador visible, porque falta confirmarlo.
 */
import type { Audience } from "./site";

export type Span = { text: string; strong?: boolean; mark?: boolean; pending?: boolean };
export type Paragraph = Span[];

export type LandingContent = {
  documentTitle: string;
  hero: {
    label: string;
    /** Cada elemento es una línea del título. */
    title: string[];
    text: string;
    note: string;
  };
  problem: {
    title: string;
    paragraphs: [Paragraph, Paragraph];
    closing: string;
  };
  closing: {
    title: string;
    text: string;
  };
};

const problemFirst: Paragraph = [
  {
    text: "The documents arrive late, or in pieces. The client cannot take a call during office hours. Each case costs three or four follow-ups before anyone can start drafting. ",
  },
  { text: "The hours go into chasing, and the file sits still.", strong: true },
];

export const landings: Record<Audience, LandingContent> = {
  firms: {
    documentTitle: "Casepace for immigration attorneys",
    hero: {
      label: "for immigration attorneys",
      title: ["Your client does the intake.", "Your paralegal reviews it."],
      text: "Casepace interviews the client in their own language, reads the documents they upload, and produces a drafted declaration with a completed USCIS form for your team to check and sign.",
      note: "Prepared forms only. You remain counsel of record, and nothing is filed without your signature.",
    },
    problem: {
      title: "The file stalls on the client, not on you.",
      paragraphs: [
        problemFirst,
        [
          { text: "Casepace does the chasing.", strong: true, mark: true },
          {
            text: " Your client answers at eleven at night, from a phone, in their own language, across as many sittings as they need. Your paralegal opens a file that is already complete and spends the time on the work that needs a lawyer.",
          },
        ],
      ],
      closing: "What limits the next case is rarely demand.",
    },
    closing: {
      title: "See a complete case before you talk to anyone.",
      text: "A fictional client, fabricated documents, and the finished I-589 you can download. Nothing to install.",
    },
  },
  organizations: {
    documentTitle: "Casepace for DOJ-recognized organizations",
    hero: {
      label: "for DOJ-recognized organizations",
      title: ["File more cases with the team you already have."],
      text: "Your client tells their story to Casepace, in their own language, at their own pace. Your accredited representative receives a drafted declaration and a completed USCIS form to review and sign.",
      note: "Built for the 947 organizations on the DOJ roster, where the median team has three accredited representatives.",
    },
    problem: {
      title: "The case stalls on the client, not on your team.",
      paragraphs: [
        problemFirst,
        [
          { text: "Casepace does the chasing.", strong: true, mark: true },
          {
            text: " Your client answers at eleven at night, from a phone, in their own language, across as many sittings as they need. Your paralegal opens a file that is already complete and spends the time on ",
          },
          // Pendiente de corregir: las organizaciones trabajan con
          // representantes acreditados, no con abogados.
          { text: "the work that needs a lawyer", pending: true },
          { text: "." },
        ],
      ],
      closing: "Every file that moves faster is another person you can take on.",
    },
    closing: {
      title: "Watch an I-589 get prepared, start to finish.",
      text: "A fictional case, fabricated documents, and the real form at the end. Five minutes, and nothing to sign up for.",
    },
  },
};

/** Lo que comparten las dos landings. */
export const shared = {
  hero: {
    seeCase: "See a case prepared",
    photoAlt:
      "A close photograph of Form I-589, Application for Asylum and for Withholding of Removal, lying on a dark desk.",
    /** Lo que muestra la animación del inicio, para lectores de pantalla. */
    paperDescription:
      "Animation. On the photographed Form I-589, the client's answer about being beaten is highlighted, and Casepace checks the box for withholding of removal under the Convention Against Torture.",
    said: "What the client said",
    form: "What goes on the form",
    caption: "Every sentence traces back to something the client said.",
    /** Para lectores de pantalla: qué muestra la animación. */
    description:
      "Animation. The client writes two messages in Spanish about being detained. Each one becomes a sentence in English in Part B of Form I-589, and a highlighter marks the words it came from.",
  },
  ai: {
    title: "AI-native, with our own engine",
    intro:
      "Casepace was designed around AI from the first line of code. The language models come from OpenAI, used through its commercial API. Under those terms, your data is not used to train their models. Everything around the models is ours.",
    blocks: [
      {
        term: "The form engine.",
        text: "Each answer is mapped to its exact field, checkbox and continuation sheet by rules we wrote from the form instructions. The model never decides where a value goes.",
      },
      {
        term: "The checks.",
        text: "Dates, names, and the consistency between documents and the interview are verified before anything reaches the form. If something does not match, your team sees it.",
      },
      {
        term: "Your review.",
        text: "Nothing is filed without a person on your team reading and approving it. Casepace prepares; your attorney or accredited representative decides.",
      },
    ],
  },
  who: {
    title: "Who this is for",
    statement: "Firms and organizations carrying USCIS filings for clients who are not comfortable in English.",
    few: "If you take a handful of filings a year, this will probably not pay for itself.",
    many: "If you take several a month, the arithmetic works on its own.",
  },
  whoWeAre: {
    title: "Who we are",
    paragraphs: [
      "Casepace is built by Human Migrate LLC. We work on one problem: the hours a legal team spends turning a client’s story and documents into a complete, accurate immigration form.",
      "Our team combines immigration practice with software engineering. Every rule in the product, from how a date is written to when a field reads “N/A”, comes from the form instructions and from how attorneys review a filing.",
    ],
    /** El nombre y la biografía van como marcador visible: los completa Human Migrate. */
    founders: [
      {
        id: "ignacio",
        name: "Ignacio Pérez Maraggi",
        role: "Co-founder",
        bio: "Lawyer admitted in Argentina. Leads legal operations and the form content: what each question asks and how the answers must be written.",
      },
      {
        id: "francisco",
        name: "Francisco De Castro",
        role: "Co-founder",
        bio: "Software engineer. Leads the platform: the form engine, the integrations and the security of client data.",
      },
    ],
    /** Lugar previsto para un video de 60 a 90 segundos. Vacío: no se muestra. */
    videoSrc: "",
  },
  questions: {
    title: "The questions attorneys put to us first.",
    items: [
      {
        question: "Does it invent anything?",
        answer: [
          "No, and it is built not to. Casepace is forbidden from adding a detail, a date or a feeling the client did not express. If the account comes out short because the client gave no more, it stays short.",
          "A false detail in a sworn declaration destroys the credibility of the whole case, so we would rather hand you something brief and faithful. When the client does not remember something, it records that they do not remember.",
        ],
      },
      {
        question: "Does it give my client legal advice?",
        answer: [
          "No. Casepace collects and orders information. It does not assess eligibility, comment on the case, suggest strategy, or tell your client what to declare.",
          "When a client asks for legal advice, it answers that this is a conversation to have with you.",
          "It does not file anything. Your accredited representative or attorney reviews, signs and files. It does not promise outcomes, and it never will.",
        ],
      },
      {
        question: "What about confidentiality?",
        answer: [
          "That is the right question. The conversation passes through AI providers in order to work, each with its own retention periods. We tell you exactly which ones before you sign, so you can weigh it against your professional obligations.",
          "We will not tell you it is impossible for a third party to ever see anything, because that would not be true.",
        ],
      },
    ],
    trustLink: "Trust at Casepace",
  },
  closing: {
    get: "You get the official I-589, current edition, and everything around it: the drafted declaration, the continuation sheets where the account runs long, a list of what is still missing, and where every answer came from.",
    open: "Open the sample case",
  },
};
