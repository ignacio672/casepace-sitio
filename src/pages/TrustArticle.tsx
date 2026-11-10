import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Pending, PendingBlock } from "@/components/site/Pending";
import { articles, articleText, trust, type Block } from "@/content/trust";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { readingLabel } from "@/lib/readingTime";
import NotFound from "./NotFound";

function Body({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="pt-6 font-serif text-[28px] leading-[1.2] tracking-[-0.01em]">{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "term":
      return (
        <p>
          <strong className="font-semibold text-ink">{block.term}</strong> {block.text}
        </p>
      );
    case "pending":
      return <PendingBlock>{block.text}</PendingBlock>;
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[16px]">
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col" className="border-b border-ink py-2.5 pr-6 text-[14px] font-medium text-muted">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join()}>
                  {row.map((cell, i) => (
                    <td key={cell} className={i === 0 ? "border-b border-line py-3 pr-6 font-semibold text-ink" : "border-b border-line py-3 pr-6"}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function TrustArticle() {
  const { slug } = useParams();
  const index = articles.findIndex((article) => article.slug === slug);
  const article = articles[index];
  useDocumentTitle(article ? `${article.title} · ${trust.title}` : trust.title);
  if (!article) return <NotFound />;
  const next = articles[(index + 1) % articles.length];

  return (
    <article className="wrap pb-24 pt-12 lg:pb-36 lg:pt-16">
      <div className="mx-auto max-w-[44rem]">
        <Link
          to="/trust"
          className="group inline-flex items-center gap-1.5 rounded-[6px] text-[15px] text-muted transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft
            size={16}
            strokeWidth={2}
            className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
          />
          {trust.back}
        </Link>
        <p className="mt-12 text-[15px] leading-none text-muted">
          {article.topic}
          <span className="mx-2.5 inline-block h-3 w-px translate-y-[1px] bg-line-strong" aria-hidden />
          {readingLabel(articleText(article))}
        </p>
        <h1 className="mt-5 font-serif text-[clamp(2.25rem,1.3rem+3.2vw,4rem)] leading-[1.05] tracking-[-0.02em]">
          {article.title}
        </h1>
        <p className="mt-5 text-[20px] leading-[1.5] text-ink/75">{article.summary}</p>

        <div className="mt-10 space-y-5 border-t border-line pt-10 text-[18px] leading-[1.65] text-ink/80">
          {article.body.map((block, i) => (
            <Body key={i} block={block} />
          ))}
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
          <p className="text-[16px] leading-[1.5]">
            {trust.contactLabel}{" "}
            <span className="font-mono text-[14.5px]">
              {trust.contactUser}
              <Pending>{trust.contactDomainPending}</Pending>
            </span>
          </p>
          <Link to={`/trust/${next.slug}`} className="group rounded-[6px] sm:text-right">
            <span className="block text-[14px] leading-none text-muted">{trust.next}</span>
            <span className="mt-2 inline-flex items-center gap-1.5 font-serif text-[22px] leading-[1.2]">
              {next.title}
              <ArrowRight
                size={18}
                strokeWidth={1.75}
                className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
