import type { ReactNode } from "react";
import { DocumentsStage } from "@/components/demo/DocumentsStage";
import { DownloadForm } from "@/components/demo/DownloadForm";
import { FilingStage } from "@/components/demo/FilingStage";
import { InterviewStage } from "@/components/demo/InterviewStage";
import { demo } from "@/content/sampleCase";
import { ANCHORS, type Audience } from "@/content/site";
import { cn } from "@/lib/utils";

function StepHeader({
  number,
  title,
  dark = false,
  children,
}: {
  number: string;
  title: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-end gap-x-12 gap-y-5 lg:grid-cols-12">
      <h3 className="font-serif text-[clamp(1.9rem,1.35rem+1.7vw,2.75rem)] leading-[1.1] tracking-[-0.015em] lg:col-span-7">
        <span className={cn("mr-3 font-normal", dark ? "text-ink-muted" : "text-muted")}>{number}</span>
        {title}
      </h3>
      <div
        className={cn(
          "max-w-[30rem] space-y-4 text-[18px] leading-[1.55] lg:col-span-5 lg:pb-1.5",
          dark ? "text-paper/75" : "text-ink/75",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Cómo funciona: el caso de muestra. La cabecera y los tres pasos, cada uno con
 * su texto y su escenario. El paso Interview va en la franja negra.
 */
export function SampleCase({ audience }: { audience: Audience }) {
  const { documents, interview, filing } = demo.steps;
  return (
    <section id={ANCHORS.demo} aria-labelledby="demo-title">
      <div className="wrap pb-20 lg:pb-28">
        <div>
          <h2
            id="demo-title"
            className="font-serif text-[clamp(2.25rem,1.3rem+3.2vw,4rem)] leading-[1.05] tracking-[-0.02em]"
          >
            {demo.title}
          </h2>
          <div className="mt-8 grid gap-x-12 gap-y-5 lg:grid-cols-12">
            <p className="text-[19px] leading-[1.6] text-ink/75 lg:col-span-6">{demo.intro}</p>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="font-serif text-[24px] leading-[1.3] tracking-[-0.005em]">{demo.claim}</p>
              <p className="mt-4 text-[14.5px] leading-[1.5] text-muted">{demo.sample}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <StepHeader number={documents.number} title={documents.title}>
            <p>{documents.text}</p>
          </StepHeader>
          <div className="mt-10 lg:mt-12">
            <DocumentsStage />
          </div>
        </div>
      </div>

      <div className="on-dark">
        <div className="wrap py-20 lg:py-28">
          <StepHeader number={interview.number} title={interview.title} dark>
            <p>{interview.text}</p>
          </StepHeader>
          <div className="mt-10 lg:mt-12">
            <InterviewStage />
          </div>
        </div>
      </div>

      <div className="wrap py-20 lg:py-28">
        <StepHeader number={filing.number} title={filing.title}>
          <p>{filing.text}</p>
        </StepHeader>
        <div className="mt-10 lg:mt-12">
          <FilingStage />
        </div>
        <p className="mt-10 max-w-[44rem] text-[19px] leading-[1.6] text-ink/75 lg:mt-12">{filing.more}</p>
        <div className="mt-16 border-t border-line pt-14 lg:mt-20 lg:pt-16">
          <DownloadForm audience={audience} />
        </div>
      </div>
    </section>
  );
}
