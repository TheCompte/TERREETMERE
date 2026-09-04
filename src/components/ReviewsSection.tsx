import { restaurant } from "../data/restaurant";
import {
  ActionLink,
  ArrowRightIcon,
  Overline,
  Reveal,
  Stars,
  TideLine,
  useCountUp,
  useReveal,
} from "./ui";

export default function ReviewsSection() {
  const [ref, inView] = useReveal<HTMLDivElement>(0.35);
  const note = useCountUp(restaurant.rating.value, inView, { decimals: 1 });
  const avis = useCountUp(restaurant.rating.count, inView, { duration: 1800 });

  return (
    <section id="avis" className="relative overflow-hidden bg-ivory-50 py-24 md:py-32">
      {/* Filigrane */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-10 font-display text-[20rem] leading-none font-light italic text-marine-900/[0.05] select-none md:text-[28rem]"
      >
        4,9
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Texte */}
          <div>
            <Reveal>
              <Overline className="text-terra-500">Ils parlent de Terre &amp; Mer</Overline>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl leading-[1.02] font-light text-marine-900 md:text-7xl">
                Une table qui
                <br />
                <em className="italic text-terra-500">tient ses promesses.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-marine-800/90 md:text-lg">
                Produits frais, cuissons sur pierre de lave, accueil chaleureux
                : ce sont les clients qui le disent, avis après avis. La plus
                belle des cartes de visite pour une maison du quai.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-10">
                <ActionLink
                  url={restaurant.links.googleReviewsUrl}
                  className="group inline-flex items-center gap-3 border border-marine-900/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-marine-900 transition-colors duration-300 hover:border-marine-900 hover:bg-marine-900 hover:text-ivory-50"
                  noticeClassName="text-marine-800"
                >
                  Lire les avis Google
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </ActionLink>
              </div>
            </Reveal>
          </div>

          {/* Bloc note */}
          <Reveal delay={150}>
            <div
              ref={ref}
              className="relative border border-champagne-400/25 bg-marine-900 px-8 py-12 text-ivory-50 md:px-14 md:py-16"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-3 translate-x-3 -translate-y-3 border border-terra-400/35"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-champagne-300">
                Note moyenne — Google
              </p>
              <div className="mt-6 flex items-end gap-4">
                <p className="font-display text-8xl leading-none font-light text-champagne-300 md:text-9xl">
                  {note}
                </p>
                <p className="pb-3 font-display text-3xl italic text-marine-200/80">/ 5</p>
              </div>
              <Stars value={restaurant.rating.value} className="mt-7" starClass="h-7 w-7" />
              <TideLine className="mt-9 text-champagne-400/50" />
              <p className="mt-7 text-base leading-relaxed text-marine-200">
                <strong className="font-display text-3xl font-light text-ivory-50">
                  {avis}
                </strong>{" "}
                avis Google laissés par les clients du restaurant — une
                constance qui se mérite, service après service.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
