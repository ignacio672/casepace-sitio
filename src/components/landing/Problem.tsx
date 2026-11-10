import { Rich } from "@/components/site/Rich";
import type { LandingContent } from "@/content/landings";

/** El problema: título grande y los dos párrafos en dos columnas, como una página de diario. */
export function Problem({ content }: { content: LandingContent["problem"] }) {
  return (
    <section className="wrap py-24 lg:py-36">
      <h2 className="max-w-[18ch] font-serif text-[clamp(2.25rem,1.3rem+3.2vw,4rem)] leading-[1.05] tracking-[-0.02em]">
        {content.title}
      </h2>
      <div className="mt-10 grid gap-x-12 gap-y-6 text-[19px] leading-[1.6] text-ink/75 lg:mt-16 lg:grid-cols-12">
        <p className="lg:col-span-5">
          <Rich paragraph={content.paragraphs[0]} />
        </p>
        <p className="lg:col-span-6 lg:col-start-7">
          <Rich paragraph={content.paragraphs[1]} />
        </p>
      </div>
      <p className="mt-14 border-t border-ink pt-6 font-serif text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-[1.2] tracking-[-0.01em] lg:mt-20">
        {content.closing}
      </p>
    </section>
  );
}
