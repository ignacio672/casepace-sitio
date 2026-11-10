import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { shared } from "@/content/landings";
import { ANCHORS } from "@/content/site";

/** Las preguntas: las tres a la vista, sin acordeón. */
export function Questions() {
  const { questions } = shared;
  return (
    <section id={ANCHORS.questions} aria-labelledby="questions-title" className="wrap pb-24 lg:pb-36">
      <div className="grid gap-x-12 gap-y-10 border-t border-line pt-20 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2
              id="questions-title"
              className="max-w-[13ch] font-serif text-[clamp(2.25rem,1.3rem+3.2vw,4rem)] leading-[1.05] tracking-[-0.02em]"
            >
              {questions.title}
            </h2>
            <Link
              to="/trust"
              className="group mt-8 inline-flex items-center gap-1.5 rounded-[6px] text-[16px] font-medium underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
            >
              {questions.trustLink}
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
        <dl className="lg:col-span-6 lg:col-start-7">
          {questions.items.map((item, i) => (
            <div key={item.question} className={i === 0 ? "pb-10" : "border-t border-line py-10 last:pb-0"}>
              <dt className="font-serif text-[28px] leading-[1.2] tracking-[-0.01em]">{item.question}</dt>
              <dd className="mt-4 space-y-4 text-[17.5px] leading-[1.6] text-ink/75">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
