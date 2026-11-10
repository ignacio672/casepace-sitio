/**
 * Contenido de /trust.
 *
 * Los títulos y las bajadas de las tarjetas van tal cual. Cada artículo dice
 * solo lo que hoy es cierto según INSTRUCCIONES.md. Lo que todavía no se puede
 * afirmar queda como bloque "pending", que se muestra como marcador visible.
 * No se nombra ninguna certificación.
 */
export type Topic = "Security" | "Privacy" | "AI";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "term"; term: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "pending"; text: string };

export type Article = {
  slug: string;
  topic: Topic;
  title: string;
  summary: string;
  body: Block[];
};

export const trust = {
  title: "Trust at Casepace",
  line: "Your clients’ files are some of the most sensitive documents a person has. Here is how we handle them.",
  filters: ["All", "Security", "Privacy", "AI"] as const,
  filterLabel: "Filter by topic",
  /** "security@[dominio]": el dominio queda como marcador. */
  contactLabel: "Security questions:",
  contactUser: "security@",
  contactDomainPending: "domain",
  back: "Trust at Casepace",
  next: "Next",
};

export type Filter = (typeof trust.filters)[number];

export const articles: Article[] = [
  {
    slug: "how-we-protect-client-data",
    topic: "Security",
    title: "How we protect client data",
    summary: "Encryption, access by role, and where the data is stored.",
    body: [
      { type: "p", text: "These are the controls in place in Casepace today." },
      { type: "h2", text: "Sign-in and identity" },
      {
        type: "p",
        text: "The identity of the person making a request comes from the session held on our server. It is never taken from a value the browser sends.",
      },
      { type: "h2", text: "Completed forms" },
      {
        type: "p",
        text: "The forms Casepace generates are kept in private storage. A form can only be downloaded from a signed-in session.",
      },
      { type: "h2", text: "Separation between accounts" },
      { type: "p", text: "Each account has its own history, kept separate from every other account." },
      { type: "h2", text: "Administration" },
      { type: "p", text: "The administration panel is not served at a publicly known address." },
      { type: "h2", text: "Encryption" },
      { type: "pending", text: "Pending: encryption in transit across the application, and encryption at rest." },
      { type: "h2", text: "Access by role" },
      { type: "pending", text: "Pending: the roles inside a firm’s account and what each one can see." },
      { type: "h2", text: "Where the data is stored" },
      { type: "pending", text: "Pending: hosting provider, region, and backups." },
    ],
  },
  {
    slug: "report-a-vulnerability",
    topic: "Security",
    title: "Report a vulnerability",
    summary: "How to reach us, and what we do when you write.",
    body: [
      {
        type: "p",
        text: "If you believe you have found a security problem in Casepace, we want to hear about it.",
      },
      { type: "h2", text: "How to reach us" },
      { type: "pending", text: "Pending: the security mailbox, security@ followed by our domain." },
      { type: "h2", text: "What to send" },
      {
        type: "p",
        text: "Tell us what you found, where you found it, and the steps to reproduce it. Leave real client information out of the report.",
      },
      { type: "h2", text: "What we do when you write" },
      {
        type: "pending",
        text: "Pending: how soon we acknowledge a report, how we keep you informed, and our position on good-faith research.",
      },
    ],
  },
  {
    slug: "what-data-we-process",
    topic: "Privacy",
    title: "What data we process",
    summary: "The data in a case, who can see it, and why we need it.",
    body: [
      { type: "p", text: "A case in Casepace holds the information needed to prepare one filing." },
      { type: "h2", text: "The data in a case" },
      {
        type: "p",
        text: "The client’s answers to the interview, in their own language. The form and the declaration prepared from those answers, in English.",
      },
      {
        type: "pending",
        text: "Pending: the documents a client uploads. Add once document upload is live in the product.",
      },
      { type: "pending", text: "Pending: account data for the people on your team." },
      { type: "h2", text: "Who can see it" },
      {
        type: "p",
        text: "Each account has its own history, kept separate from every other account. Completed forms are kept in private storage and can only be downloaded from a signed-in session.",
      },
      {
        type: "p",
        text: "The conversation with the client passes through OpenAI’s language models in order to work.",
      },
      { type: "pending", text: "Pending: who at Human Migrate can open a case, and under what conditions." },
      { type: "h2", text: "Why we need it" },
      {
        type: "p",
        text: "We use the data in a case to prepare that case: to run the interview, complete the form and write the declaration your team reviews.",
      },
      { type: "pending", text: "Pending: any other use of case data, such as support or product analytics." },
    ],
  },
  {
    slug: "retention-and-deletion",
    topic: "Privacy",
    title: "Retention and deletion",
    summary: "How long a case is kept and how a firm deletes it.",
    body: [
      { type: "p", text: "A firm should know how long a case stays in Casepace and how to remove it." },
      { type: "h2", text: "How long a case is kept" },
      { type: "pending", text: "Pending: the retention period for a case and for its completed forms." },
      { type: "h2", text: "How a firm deletes a case" },
      { type: "pending", text: "Pending: the steps to delete a case, and what is removed when it is deleted." },
      { type: "h2", text: "Copies held by providers" },
      {
        type: "pending",
        text: "Pending: how long OpenAI retains what passes through its commercial API, and how long backups are kept.",
      },
    ],
  },
  {
    slug: "subprocessors",
    topic: "Privacy",
    title: "Subprocessors",
    summary: "Every company that processes data on our behalf, and for what.",
    body: [
      { type: "p", text: "A subprocessor is a company that processes data on our behalf." },
      {
        type: "table",
        head: ["Company", "What it does for us"],
        rows: [["OpenAI", "Language models, used through its commercial API"]],
      },
      {
        type: "p",
        text: "Under OpenAI’s commercial API terms, your data is not used to train their models.",
      },
      {
        type: "pending",
        text: "Pending: every other company that processes case data, such as hosting, storage, email and monitoring, with the location of each.",
      },
    ],
  },
  {
    slug: "how-we-use-ai",
    topic: "AI",
    title: "How we use AI",
    summary: "The models we use, what they see, and what they never decide.",
    body: [
      {
        type: "p",
        text: "Casepace was designed around AI from the first line of code. The language models come from OpenAI, used through its commercial API. Under those terms, your data is not used to train their models. Everything around the models is ours.",
      },
      { type: "h2", text: "What the models see" },
      { type: "p", text: "The conversation with the client passes through the language models in order to work." },
      { type: "pending", text: "Pending: OpenAI’s retention period for what passes through its commercial API." },
      { type: "h2", text: "What is ours" },
      {
        type: "term",
        term: "The form engine.",
        text: "Each answer is mapped to its exact field, checkbox and continuation sheet by rules we wrote from the form instructions. The model never decides where a value goes.",
      },
      {
        type: "term",
        term: "The checks.",
        text: "Dates, names, and the consistency between documents and the interview are verified before anything reaches the form. If something does not match, your team sees it.",
      },
      {
        type: "term",
        term: "The continuation sheets.",
        text: "Where an account runs longer than its box, the rest goes onto a continuation sheet, placed by the same engine.",
      },
      {
        type: "term",
        term: "Your review.",
        text: "Nothing is filed without a person on your team reading and approving it. Casepace prepares; your attorney or accredited representative decides.",
      },
    ],
  },
  {
    slug: "your-data-and-model-training",
    topic: "AI",
    title: "Your data and model training",
    summary: "Why your clients’ files are never used to train a model.",
    body: [
      {
        type: "p",
        text: "The language models Casepace uses come from OpenAI, through its commercial API. Under those terms, your data is not used to train their models.",
      },
      {
        type: "p",
        text: "Everything around the models is ours: the form engine, the date and consistency checks, the continuation sheets and the review.",
      },
      {
        type: "pending",
        text: "Pending: confirm in writing that Human Migrate does not train or fine-tune any model on client data.",
      },
      { type: "pending", text: "Pending: link to OpenAI’s commercial terms." },
    ],
  },
];

/** El texto de un artículo, para calcular el tiempo de lectura. */
export function articleText(article: Article): string {
  return article.body
    .map((block) => {
      if (block.type === "table") return [...block.head, ...block.rows.flat()].join(" ");
      if (block.type === "term") return `${block.term} ${block.text}`;
      return block.text;
    })
    .join(" ");
}
