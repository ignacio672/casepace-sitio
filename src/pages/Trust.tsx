import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Pending } from "@/components/site/Pending";
import { articles, articleText, trust, type Filter } from "@/content/trust";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { readingLabel } from "@/lib/readingTime";
import { contactSpan } from "@/lib/trustGrid";
import { cn } from "@/lib/utils";

// Las clases van escritas enteras para que Tailwind las encuentre.
const SPAN_SM = ["", "sm:col-span-1", "sm:col-span-2"];
const SPAN_LG = ["", "lg:col-span-1", "lg:col-span-2", "lg:col-span-3"];

export default function Trust() {
  useDocumentTitle(trust.title);
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? articles : articles.filter((article) => article.topic === filter);

  return (
    <div className="wrap pb-24 pt-16 lg:pb-36 lg:pt-24">
      <h1 className="font-serif text-[clamp(2.5rem,1.3rem+4.2vw,4.75rem)] leading-[1.03] tracking-[-0.02em]">
        {trust.title}
      </h1>
      <p className="mt-6 max-w-[38rem] text-[20px] leading-[1.5] text-ink/75">{trust.line}</p>

      <div
        role="group"
        aria-label={trust.filterLabel}
        className="mt-12 flex flex-wrap gap-1.5 border-b border-line pb-5 lg:mt-16"
      >
        {trust.filters.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
            className={cn(
              "h-10 rounded-control px-4 text-[15px] font-medium transition-colors duration-200",
              filter === name ? "bg-ink text-paper" : "text-ink/75 hover:bg-paper hover:text-ink",
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <ul key={filter} className="mt-8 grid animate-fade-in gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {shown.map((article) => (
          <li key={article.slug} className="flex">
            <Link
              to={`/trust/${article.slug}`}
              className="group flex min-h-[236px] w-full flex-col rounded-window bg-paper p-6 transition-colors duration-200 hover:bg-paper-deep lg:p-7"
            >
              <span className="text-[14px] leading-none text-muted">{article.topic}</span>
              <span className="mt-4 font-serif text-[27px] leading-[1.14] tracking-[-0.01em]">{article.title}</span>
              <span className="mt-3 text-[16px] leading-[1.5] text-ink/75">{article.summary}</span>
              <span className="mt-auto flex items-center justify-between pt-7 text-[14px] leading-none text-muted">
                {readingLabel(articleText(article))}
                <ArrowRight
                  size={18}
                  strokeWidth={1.75}
                  className="text-ink transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </span>
            </Link>
          </li>
        ))}
        <li
          className={cn(
            "flex min-h-[120px] flex-col justify-end rounded-window border border-line p-6 lg:p-7",
            SPAN_SM[contactSpan(shown.length, 2)],
            SPAN_LG[contactSpan(shown.length, 3)],
          )}
        >
          <p className="text-[17px] leading-[1.5]">
            {trust.contactLabel}{" "}
            <span className="font-mono text-[15.5px]">
              {trust.contactUser}
              <Pending>{trust.contactDomainPending}</Pending>
            </span>
          </p>
        </li>
      </ul>
    </div>
  );
}
