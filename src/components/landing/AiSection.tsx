import { shared } from "@/content/landings";

/** Cómo usamos la IA: título, párrafo y los tres bloques en fila, separados por filetes. */
export function AiSection() {
  const { ai } = shared;
  return (
    <section className="wrap pb-24 lg:pb-36">
      <div className="border-t border-line pt-20 lg:pt-28">
        <h2 className="max-w-[16ch] font-serif text-[clamp(2.25rem,1.3rem+3.2vw,4rem)] leading-[1.05] tracking-[-0.02em]">
          {ai.title}
        </h2>
        <p className="mt-8 max-w-[44rem] text-[19px] leading-[1.6] text-ink/75">{ai.intro}</p>
        <dl className="mt-14 grid border-t border-ink md:grid-cols-3 lg:mt-20">
          {ai.blocks.map((block, i) => (
            <div
              key={block.term}
              className={
                i === 0
                  ? "py-7 md:pr-8 lg:pr-10"
                  : "border-t border-line py-7 md:border-l md:border-t-0 md:px-8 lg:px-10 md:last:pr-0"
              }
            >
              <dt className="font-serif text-[28px] leading-[1.15] tracking-[-0.01em]">{block.term}</dt>
              <dd className="mt-4 text-[17px] leading-[1.6] text-ink/75">{block.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
