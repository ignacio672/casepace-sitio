import { AiSection } from "@/components/landing/AiSection";
import { Closing } from "@/components/landing/Closing";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Questions } from "@/components/landing/Questions";
import { SampleCase } from "@/components/landing/SampleCase";
import { WhoFor } from "@/components/landing/WhoFor";
import { WhoWeAre } from "@/components/landing/WhoWeAre";
import { landings } from "@/content/landings";
import type { Audience } from "@/content/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/** Las dos landings son esta misma página con textos distintos. */
export default function Landing({ audience }: { audience: Audience }) {
  const content = landings[audience];
  useDocumentTitle(content.documentTitle);

  return (
    <>
      <Hero content={content.hero} />
      <Problem content={content.problem} />
      <SampleCase audience={audience} />
      <AiSection />
      <WhoFor />
      <WhoWeAre />
      <Questions />
      <Closing content={content.closing} />
    </>
  );
}
