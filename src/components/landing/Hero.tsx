import { ArrowDown } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { HashLink } from "@/components/site/HashLink";
import { shared, type LandingContent } from "@/content/landings";
import { ANCHORS, nav, WALKTHROUGH_HREF } from "@/content/site";
import { HeroLive } from "./HeroLive";

/**
 * El inicio. En la primera pantalla: para quién es, qué es, qué recibe el
 * estudio, los dos llamados y el producto funcionando.
 */
export function Hero({ content }: { content: LandingContent["hero"] }) {
  return (
    <section className="on-dark overflow-hidden">
      <div className="wrap grid gap-x-12 gap-y-14 pb-16 pt-12 sm:pt-14 xl:grid-cols-12 xl:pb-20 xl:pt-[68px]">
        <div className="flex flex-col xl:col-span-7">
          <p className="animate-hero-in pb-0.5 font-serif text-[19px] italic leading-[1.3] text-paper/70 sm:text-[21px]">
            {content.label}
          </p>
          <h1 className="mt-4 animate-hero-in font-serif text-[clamp(1.7rem,7.5vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] xl:text-[clamp(3.25rem,4.4vw,3.6875rem)]">
            {content.title.map((line) => (
              <span key={line} className="block">
                {line}{" "}
              </span>
            ))}
          </h1>
          <p
            className="mt-7 max-w-[33rem] animate-hero-in text-[18px] leading-[1.55] text-paper/80 xl:mt-8 xl:text-[19px]"
            style={{ animationDelay: "70ms" }}
          >
            {content.text}
          </p>
          <div className="mt-8 flex animate-hero-in flex-wrap gap-3" style={{ animationDelay: "140ms" }}>
            <HashLink to={`#${ANCHORS.demo}`} className={buttonClass({ variant: "paper" })}>
              {shared.hero.seeCase}
              <ArrowDown size={17} strokeWidth={2} />
            </HashLink>
            <a href={WALKTHROUGH_HREF} className={buttonClass({ variant: "ghostDark" })}>
              {nav.walkthrough}
            </a>
          </div>
          <p
            className="mt-9 max-w-[29rem] animate-hero-in border-t border-ink-line pt-5 text-[14.5px] leading-[1.5] text-ink-muted xl:mt-auto"
            style={{ animationDelay: "210ms" }}
          >
            {content.note}
          </p>
        </div>
        <div className="animate-hero-in xl:col-span-5" style={{ animationDelay: "140ms" }}>
          <HeroLive className="mx-auto w-full max-w-[34rem] xl:mx-0 xl:max-w-none" />
        </div>
      </div>
    </section>
  );
}
