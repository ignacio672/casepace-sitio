import { buttonClass } from "@/components/ui/button";
import { HashLink } from "@/components/site/HashLink";
import { shared, type LandingContent } from "@/content/landings";
import { ANCHORS, nav, WALKTHROUGH_HREF } from "@/content/site";

/** El cierre: los mismos dos llamados del inicio, sobre el negro que sigue en el pie. */
export function Closing({ content }: { content: LandingContent["closing"] }) {
  return (
    <section className="on-dark">
      <div className="wrap grid gap-x-12 gap-y-10 py-24 lg:grid-cols-12 lg:py-36">
        <h2 className="font-serif text-[clamp(2.25rem,1.2rem+3.9vw,4.5rem)] leading-[1.04] tracking-[-0.02em] lg:col-span-7">
          {content.title}
        </h2>
        <div className="lg:col-span-5 lg:pt-3">
          <p className="text-[19px] leading-[1.55] text-paper">{content.text}</p>
          <p className="mt-4 text-[17px] leading-[1.6] text-paper/70">{shared.closing.get}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <HashLink to={`#${ANCHORS.download}`} className={buttonClass({ variant: "paper" })}>
              {shared.closing.open}
            </HashLink>
            <a href={WALKTHROUGH_HREF} className={buttonClass({ variant: "ghostDark" })}>
              {nav.walkthrough}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
