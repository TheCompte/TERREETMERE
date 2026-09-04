import { restaurant } from "../data/restaurant";
import { ActionLink, ArrowRightIcon, Overline, PhoneIcon, Reveal } from "./ui";

export default function ReservationSection() {
  return (
    <section
      id="contact"
      className="relative bg-marine-950 text-ivory-50"
      aria-label="Réservation et contact"
    >
      <div className="grid lg:grid-cols-[7fr_5fr]">
        {/* Contenu */}
        <div className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32 lg:px-14 xl:px-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-10 font-display text-[18rem] leading-none font-light italic text-marine-800/40 select-none"
          >
            &amp;
          </span>

          <div className="relative max-w-2xl">
            <Reveal>
              <Overline className="text-champagne-300">Réservation</Overline>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl leading-[1.02] font-light md:text-7xl">
                Votre table vous
                <br />
                <em className="italic text-champagne-300">attend.</em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-marine-200 md:text-lg">
                Un appel, quelques mots, et votre table est dressée face au
                port. Pour déjeuner comme pour dîner, la réservation est
                conseillée — surtout lorsque Marseille s'attarde en terrasse.
              </p>
            </Reveal>

            {/* Numéro en majesté */}
            <Reveal delay={260}>
              <a
                href={restaurant.phone.href}
                className="group mt-12 inline-flex items-center gap-5"
              >
                <span className="flex h-14 w-14 items-center justify-center border border-champagne-400/50 text-champagne-300 transition-colors duration-300 group-hover:bg-champagne-400 group-hover:text-marine-950">
                  <PhoneIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-marine-300">
                    Par téléphone
                  </span>
                  <span className="font-display text-3xl font-light tracking-wide text-ivory-50 transition-colors duration-300 group-hover:text-champagne-300 md:text-5xl">
                    {restaurant.phone.display}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={320} className="mt-12 flex flex-wrap items-center gap-5">
              <ActionLink
                url={restaurant.links.reservationUrl}
                className="group inline-flex items-center gap-3 bg-champagne-400 px-9 py-4.5 text-xs font-bold uppercase tracking-[0.26em] text-marine-950 transition-colors duration-300 hover:bg-champagne-300"
                noticeClassName="text-marine-200"
              >
                Réserver une table
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </ActionLink>
              <a
                href={restaurant.phone.href}
                className="inline-flex items-center gap-3 border border-ivory-50/35 px-8 py-4.5 text-xs font-bold uppercase tracking-[0.26em] text-ivory-50 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300"
              >
                <PhoneIcon className="h-4 w-4" />
                Appeler
              </a>
            </Reveal>

            <Reveal delay={380}>
              <p className="mt-12 max-w-md border-t border-ivory-50/12 pt-6 text-sm leading-relaxed text-marine-300">
                {restaurant.address.street}, {restaurant.address.zip}{" "}
                {restaurant.address.city} — au cœur du Vieux-Port. La
                réservation en ligne sera proposée ici dès l'ouverture du
                module ; le téléphone reste le chemin le plus court.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Visuel */}
        <div className="relative min-h-[46vh] lg:min-h-full">
          <img
            src={restaurant.images.terrace.src}
            alt={restaurant.images.terrace.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-950/70 via-transparent to-marine-950/25 lg:bg-gradient-to-r lg:from-marine-950/40" />
          <p className="absolute bottom-6 left-6 font-display text-lg italic text-ivory-50/95">
            Côté quai, à la tombée du jour
          </p>
        </div>
      </div>
    </section>
  );
}
