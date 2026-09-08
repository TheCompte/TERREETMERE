import { Link } from "react-router-dom";
import { restaurant } from "../data/restaurant";
import { ArrowRightIcon, Overline, Reveal } from "./ui";

const marqueeWords = [
  "Poissons du jour",
  "Crustacés",
  "Coquillages",
  "Viandes grillées",
  "Pierre de lave",
  "Légumes du soleil",
  "Huile d'olive",
  "Vieux-Port",
];

function MarqueeContent({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeWords.map((word) => (
        <span key={word} className="flex items-center">
          <span className="px-6 font-display text-2xl font-light italic text-ivory-100/80 md:px-10 md:text-3xl">
            {word}
          </span>
          <svg
            viewBox="0 0 26 8"
            className="h-2 w-7 text-champagne-400"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 4c4-4.5 8-4.5 12 0s8 4.5 12 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function CarteSection() {
  const img = restaurant.images.fish;

  return (
    <section
      id="carte"
      className="relative overflow-hidden bg-marine-950 py-24 text-ivory-50 md:py-32"
    >
      {/* Filigrane */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-16 font-display text-[26rem] leading-none font-light italic text-marine-800/45 select-none md:text-[36rem]"
      >
        &amp;
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Texte + accès menu */}
          <div>
            <Reveal>
              <Overline className="text-champagne-300">La carte</Overline>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl leading-[1.03] font-light md:text-6xl xl:text-7xl">
                Une carte vivante,
                <br />
                <em className="italic text-champagne-300">écrite chaque matin.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-marine-200">
                Poissons entiers, plateaux de la mer, viandes passées sur
                pierre de lave, légumes du marché : la carte se compose au gré
                des arrivages et des saisons, avec ce que la Méditerranée et la
                Provence offrent de meilleur le jour même.
              </p>
            </Reveal>
            <Reveal delay={300} className="mt-10">
              <Link
                to="/carte"
                className="group inline-flex items-center gap-3 bg-champagne-400 px-9 py-4.5 text-xs font-bold uppercase tracking-[0.26em] text-marine-950 transition-colors duration-300 hover:bg-champagne-300"
              >
                Voir la carte
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <p className="mt-5 max-w-md font-display text-sm italic text-marine-300">
                La carte complète sera intégrée ici dès sa mise en ligne — les
                suggestions du jour se découvrent sur place ou au{" "}
                <a
                  href={restaurant.phone.href}
                  className="text-champagne-300 underline-offset-4 hover:underline"
                >
                  {restaurant.phone.display}
                </a>
                .
              </p>
            </Reveal>
          </div>

          {/* Visuel encadré */}
          <Reveal delay={200} className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 translate-x-4 translate-y-4 border border-champagne-400/35 lg:-inset-4"
            />
            <div className="img-breathe relative overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-marine-950/90 to-transparent p-5 pt-16">
                <p className="font-display text-lg italic text-ivory-50">
                  Suggestions du jour
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-champagne-300">
                  Au gré des arrivages
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bandeau défilant */}
      <div className="relative mt-20 overflow-hidden border-y border-ivory-50/10 py-6 md:mt-24">
        <div className="marquee-track">
          <MarqueeContent />
          <MarqueeContent hidden />
        </div>
      </div>
    </section>
  );
}
