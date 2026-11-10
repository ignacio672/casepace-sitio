import type { Paragraph } from "@/content/landings";
import { Pending } from "./Pending";

/** Un párrafo de los textos aprobados, con sus negritas, su resaltado y sus marcadores. */
export function Rich({ paragraph }: { paragraph: Paragraph }) {
  return (
    <>
      {paragraph.map((span, i) => {
        if (span.pending) return <Pending key={i}>{span.text}</Pending>;
        const text = span.mark ? <span className="mark">{span.text}</span> : span.text;
        return span.strong ? (
          <strong key={i} className="font-semibold text-ink">
            {text}
          </strong>
        ) : (
          <span key={i}>{text}</span>
        );
      })}
    </>
  );
}
