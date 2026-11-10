import { founderPhotos } from "@/assets/images";
import { Pending, PendingBlock } from "@/components/site/Pending";
import { shared } from "@/content/landings";
import { ANCHORS } from "@/content/site";

/**
 * Quiénes somos. Las dos fotos van con el mismo recorte y el mismo tratamiento
 * en blanco y negro. El nombre y la biografía de cada fundador se muestran
 * como marcador visible hasta que Human Migrate los confirme.
 */
export function WhoWeAre() {
  const { whoWeAre } = shared;
  return (
    <section id={ANCHORS.whoWeAre} aria-labelledby="who-we-are-title" className="wrap py-24 lg:py-36">
      <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2
            id="who-we-are-title"
            className="font-serif text-[clamp(2.25rem,1.3rem+3.2vw,4rem)] leading-[1.05] tracking-[-0.02em]"
          >
            {whoWeAre.title}
          </h2>
          <div className="mt-8 space-y-5 text-[19px] leading-[1.6] text-ink/75">
            {whoWeAre.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:gap-x-8">
          {whoWeAre.founders.map((founder) => (
            <li key={founder.id}>
              <img
                src={founderPhotos[founder.id]}
                alt=""
                width={720}
                height={900}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-paper bg-paper object-cover contrast-[1.04] grayscale"
              />
              <h3 className="mt-5 text-[19px] font-semibold leading-[1.3]">
                <Pending>{founder.name}</Pending>
              </h3>
              <p className="mt-1 text-[15px] leading-[1.4] text-muted">{founder.role}</p>
              <PendingBlock className="mt-3.5 px-3 py-2.5 text-[15.5px] leading-[1.55] text-ink/80">
                {founder.bio}
              </PendingBlock>
            </li>
          ))}
        </ul>
      </div>
      {whoWeAre.videoSrc && (
        <video src={whoWeAre.videoSrc} controls preload="none" className="mt-16 aspect-video w-full rounded-window" />
      )}
    </section>
  );
}
