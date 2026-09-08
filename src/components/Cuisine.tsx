import { cuisineRows, restaurant, type ImageKey } from "../data/restaurant";
import {
  FishIcon,
  FlameIcon,
  LeafIcon,
  Overline,
  Reveal,
  TideLine,
} from "./ui";

const rowIcons = [FishIcon, LeafIcon, FlameIcon];

export default function Cuisine() {
  return (
    <section id="cuisine" className="bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* En-tête */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Overline className="text-marine-600">La cuisine</Overline>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl leading-[1.02] font-light text-marine-900 md:text-7xl">
                Le frais, le feu,
                <br />
                <em className="italic text-terra-500">le geste.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-sm leading-relaxed text-marine-800/85 md:pb-3 md:text-right">
              Une cuisine méditerranéenne de produits — pêchés, cueillis,
              grillés — servie sans chichis, dans la générosité du Sud.
            </p>
          </Reveal>
        </div>

        {/* Trois mouvements, en alternance */}
        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {cuisineRows.map((row, i) => {
            const Icon = rowIcons[i];
            const img = restaurant.images[row.image as ImageKey];
            const flipped = i % 2 === 1;
            return (
              <div
                key={row.index}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                {/* Image */}
                <Reveal
                  className={`relative lg:col-span-6 ${
                    flipped ? "lg:order-2 lg:col-start-7" : ""
                  }`}
                >
                  <div className="img-breathe relative overflow-hidden bg-marine-900">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className={`absolute -top-8 font-display text-[7rem] leading-none font-light italic text-marine-900/12 md:text-[9rem] ${
                      flipped ? "-right-2 md:-right-4" : "-left-2 md:-left-4"
                    }`}
                  >
                    {row.index}
                  </span>
                </Reveal>

                {/* Texte */}
                <Reveal
                  delay={120}
                  className={`lg:col-span-5 ${
                    flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"
                  }`}
                >
                  <div className="flex items-center gap-4 text-terra-500">
                    <Icon className="h-7 w-7" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-marine-600">
                      Chapitre {row.index}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-4xl font-light text-marine-950 md:text-5xl">
                    {row.title === "Le feu" ? (
                      <>
                        Le <em className="italic text-terra-500">feu</em>
                      </>
                    ) : row.title === "La mer" ? (
                      <>
                        La <em className="italic text-marine-600">mer</em>
                      </>
                    ) : (
                      <>
                        La <em className="italic text-olive-500">terre</em>
                      </>
                    )}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-marine-800/85">
                    {row.text}
                  </p>
                  <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {row.tags.map((tag, t) => (
                      <li
                        key={tag}
                        className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-marine-700"
                      >
                        {t > 0 && (
                          <svg
                            viewBox="0 0 22 6"
                            className="h-1.5 w-5 text-champagne-500"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M1 3c3.5-3 7-3 10 0s6.5 3 10 0"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Note de fin */}
        <Reveal className="mt-20 max-w-2xl md:mt-24">
          <TideLine className="text-terra-400/70" />
          <p className="mt-6 font-display text-2xl leading-snug font-light italic text-marine-800 md:text-[1.7rem]">
            La carte suit les arrivages et les saisons — chaque assiette est
            composée le jour même, selon ce que le port et le marché ont
            offert.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
