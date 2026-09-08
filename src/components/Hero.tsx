import { reservationHref, restaurant } from "../data/restaurant";
import { ArrowRightIcon, PhoneIcon, Reveal, StarIcon } from "./ui";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-marine-950 text-ivory-50"
    >
      {/* Visuel plein écran */}
      <div className="absolute inset-0">
        <img
          src={restaurant.images.hero.src}
          alt={restaurant.images.hero.alt}
          className="kenburns h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-950/85 via-marine-950/35 to-marine-950/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-marine-950/95 via-marine-950/20 to-marine-950/40" />
      </div>

      {/* Mention verticale, côté droit */}
      <p
        className="absolute right-7 bottom-44 z-10 hidden text-[10px] font-semibold uppercase tracking-[0.55em] text-ivory-50/55 xl:block"
        style={{ writingMode: "vertical-rl" }}
      >
        Marseille — Vieux-Port — Méditerranée
      </p>

      {/* Contenu */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-40 pb-24 md:px-8 md:pb-28">
        <Reveal className="mb-7 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-champagne-300">
          <span aria-hidden="true" className="h-px w-12 bg-champagne-300/70" />
          214 Quai du Port — Marseille, Vieux-Port
        </Reveal>

        <h1 className="font-display font-light leading-[0.95] tracking-[0.02em]">
          <span className="line-mask text-[clamp(3.4rem,13vw,9.5rem)]">
            <span style={{ animationDelay: "0.25s" }}>TERRE</span>
          </span>
          <span className="line-mask text-[clamp(3.4rem,13vw,9.5rem)]">
            <span style={{ animationDelay: "0.42s" }}>
              <em className="italic font-light text-champagne-300">&amp;</em> MER
            </span>
          </span>
        </h1>

        <Reveal delay={250} className="mt-7 max-w-xl">
          <p className="font-display text-xl font-light italic text-ivory-100/90 md:text-2xl">
            {restaurant.tagline}
          </p>
        </Reveal>

        <Reveal delay={400} className="mt-10 flex flex-wrap items-center gap-4 md:gap-6">
          <a
            href={reservationHref}
            className="group inline-flex items-center gap-3 bg-champagne-400 px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-marine-950 transition-colors duration-300 hover:bg-champagne-300"
          >
            Réserver une table
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
          <a
            href={restaurant.links.menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border-b border-ivory-50/40 pb-1.5 text-xs font-bold uppercase tracking-[0.24em] text-ivory-50 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300"
          >
            Découvrir la carte
            <ArrowRightIcon className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
          {/* Appel direct, surtout mobile */}
          <a
            href={restaurant.phone.href}
            className="inline-flex items-center gap-2.5 border border-ivory-50/35 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.24em] text-ivory-50 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300 sm:ml-2 lg:hidden"
          >
            <PhoneIcon className="h-4 w-4" />
            Appeler
          </a>
        </Reveal>
      </div>

      {/* Pied de hero : invitation au défilement + preuve sociale */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-5 pb-7 md:px-8">
        <a
          href="#experience"
          className="group inline-flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory-50/70 transition-colors hover:text-ivory-50"
        >
          <span className="float-y text-champagne-300">
            <svg viewBox="0 0 26 44" className="h-9 w-6" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="24" height="42" rx="12" stroke="currentColor" strokeWidth="1.4" />
              <path d="M13 11v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          Défiler
        </a>

        <a
          href="#avis"
          className="inline-flex items-center gap-2.5 border border-ivory-50/25 bg-marine-950/45 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory-50/90 transition-colors duration-300 hover:border-champagne-300/70 hover:text-champagne-300"
        >
          <StarIcon className="h-3.5 w-3.5 text-champagne-300" />
          4,9 / 5 — 99 avis Google
        </a>
      </div>
    </section>
  );
}
