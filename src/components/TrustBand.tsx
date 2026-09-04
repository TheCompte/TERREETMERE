import { restaurant } from "../data/restaurant";
import { ArrowRightIcon, Stars, useCountUp, useReveal } from "./ui";

export default function TrustBand() {
  const [ref, inView] = useReveal<HTMLElement>(0.3);
  const note = useCountUp(restaurant.rating.value, inView, { decimals: 1 });
  const avis = useCountUp(restaurant.rating.count, inView);

  return (
    <section
      ref={ref}
      aria-label="Note et avis clients"
      className="border-y border-champagne-400/15 bg-marine-900 text-ivory-50"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-[auto_1fr_auto] md:gap-14 md:px-8 md:py-16">
        {/* La note */}
        <div className="flex items-end gap-4 md:border-r md:border-ivory-50/12 md:pr-14">
          <p className="font-display text-7xl leading-none font-light text-champagne-300 md:text-8xl">
            {note}
          </p>
          <p className="pb-2 font-display text-2xl italic text-marine-200/80">/ 5</p>
        </div>

        {/* Détail */}
        <div className="md:pr-10">
          <Stars value={restaurant.rating.value} starClass="h-6 w-6" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-marine-200">
            Note moyenne attribuée par{" "}
            <strong className="font-semibold text-ivory-50">{avis} clients</strong>{" "}
            sur {restaurant.rating.source} — la régularité d'une maison du
            Vieux-Port qui tient ses promesses.
          </p>
        </div>

        {/* Accès aux avis */}
        <a
          href="#avis"
          className="group inline-flex w-fit items-center gap-3 border border-ivory-50/25 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-ivory-50 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300"
        >
          Lire les avis
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </a>
      </div>
    </section>
  );
}
