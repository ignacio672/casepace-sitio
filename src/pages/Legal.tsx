import { PendingBlock } from "@/components/site/Pending";
import { legalPages } from "@/content/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/** Privacy y Terms: el contenido es legal y lo entrega Human Migrate. Queda el marcador. */
export default function Legal({ page }: { page: keyof typeof legalPages }) {
  const content = legalPages[page];
  useDocumentTitle(`${content.title} · Casepace`);
  return (
    <div className="wrap pb-24 pt-16 lg:pb-36 lg:pt-24">
      <div className="mx-auto max-w-[44rem]">
        <h1 className="font-serif text-[clamp(2.5rem,1.3rem+4.2vw,4.75rem)] leading-[1.03] tracking-[-0.02em]">
          {content.title}
        </h1>
        <PendingBlock className="mt-10">{content.pending}</PendingBlock>
      </div>
    </div>
  );
}
