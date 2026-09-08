import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navItems, restaurant } from "../data/restaurant";
import {
  ActionLink,
  ArrowUpIcon,
  CloseIcon,
  PhoneIcon,
  PinIcon,
  StarIcon,
  useBodyLock,
  Wordmark,
} from "./ui";

type LegalPage = "mentions" | "confidentialite" | null;

const legalCopy: Record<Exclude<LegalPage, null>, { title: string; body: string }> = {
  mentions: {
    title: "Mentions légales",
    body: "Page en cours de rédaction. Éditeur du site : Terre & Mer — 214 Quai du Port, 13002 Marseille, France. Téléphone : 04 96 17 60 58. Les informations légales complètes (raison sociale, immatriculation, hébergement) seront publiées ici dès leur confirmation.",
  },
  confidentialite: {
    title: "Politique de confidentialité",
    body: "Page en cours de rédaction. Ce site vitrine ne collecte aucune donnée personnelle en l'état. Les modalités détaillées de traitement des données (réservation, cookies) seront publiées ici dès leur mise en place.",
  },
};

export default function Footer() {
  const [legal, setLegal] = useState<LegalPage>(null);
  useBodyLock(legal !== null);

  useEffect(() => {
    if (!legal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLegal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [legal]);

  return (
    <footer className="border-t border-ivory-50/10 bg-[#060f16] text-ivory-50">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1.2fr]">
          {/* Marque */}
          <div>
            <Wordmark className="text-2xl text-ivory-50" ampClassName="text-champagne-400" />
            <p className="mt-4 max-w-xs font-display text-lg font-light italic text-marine-200">
              {restaurant.tagline}
            </p>
            <address className="mt-7 flex items-start gap-3 text-sm leading-relaxed text-marine-200 not-italic">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-champagne-400" />
              <span>
                {restaurant.address.street}
                <br />
                {restaurant.address.zip} {restaurant.address.city},{" "}
                {restaurant.address.country}
              </span>
            </address>
            <a
              href={restaurant.phone.href}
              className="mt-4 inline-flex items-center gap-3 text-sm font-semibold text-ivory-50 transition-colors hover:text-champagne-300"
            >
              <PhoneIcon className="h-4 w-4 text-champagne-400" />
              {restaurant.phone.display}
            </a>
            <p className="mt-4 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-marine-300">
              <StarIcon className="h-3.5 w-3.5 text-champagne-400" />
              4,9 / 5 · 99 avis Google
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation pied de page">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-champagne-400">
              Navigation
            </p>
            <ul className="mt-6 space-y-3">
              {navItems.map((item) => {
                const isSection = item.href.startsWith("/#");
                const isPage = item.href === "/carte";
                
                const linkContent = (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-champagne-400 transition-all duration-300 group-hover:w-4"
                    />
                    {item.label}
                  </>
                );
                const linkClass = "group inline-flex items-center gap-2 text-sm text-marine-200 transition-all duration-300 hover:translate-x-1 hover:text-ivory-50";

                if (isPage) {
                  // Lien vers une page (/carte)
                  return (
                    <li key={item.href}>
                      <Link to={item.href} className={linkClass}>
                        {linkContent}
                      </Link>
                    </li>
                  );
                }

                if (isSection) {
                  // Lien vers une section de la homepage
                  return (
                    <li key={item.href}>
                      <Link 
                        to="/" 
                        className={linkClass}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = item.href;
                        }}
                      >
                        {linkContent}
                      </Link>
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </nav>

          {/* Informations */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-champagne-400">
              Informations
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-marine-200 transition-colors hover:text-ivory-50"
                >
                  Itinéraire — Google Maps
                </a>
              </li>
              <li>
                <ActionLink
                  url={restaurant.links.googleReviewsUrl}
                  className="text-marine-200 transition-colors hover:text-ivory-50"
                >
                  Avis Google
                </ActionLink>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegal("mentions")}
                  className="text-marine-200 transition-colors hover:text-ivory-50"
                >
                  Mentions légales
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegal("confidentialite")}
                  className="text-marine-200 transition-colors hover:text-ivory-50"
                >
                  Politique de confidentialité
                </button>
              </li>
            </ul>
            <p className="mt-8 max-w-xs text-xs leading-relaxed text-marine-300/80">
              Réservation conseillée — appelez le{" "}
              <a
                href={restaurant.phone.href}
                className="font-semibold text-champagne-300 hover:underline"
              >
                {restaurant.phone.display}
              </a>
              .
            </p>
          </div>
        </div>

        {/* Barre finale */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-ivory-50/10 pt-8">
          <p className="text-xs text-marine-300">
            © 2026 Terre &amp; Mer — {restaurant.address.street},{" "}
            {restaurant.address.zip} {restaurant.address.city}. Tous droits
            réservés.
          </p>
          <p className="text-[11px] text-marine-300/70">
            Photographies d'ambiance provisoires — ne représentent pas
            l'établissement.
          </p>
          <a
            href="#accueil"
            aria-label="Retour en haut de page"
            className="group inline-flex h-11 w-11 items-center justify-center border border-ivory-50/20 text-ivory-50 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300"
          >
            <ArrowUpIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>

      {/* Fenêtre légale */}
      {legal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-marine-950/85 p-5"
          role="dialog"
          aria-modal="true"
          aria-label={legalCopy[legal].title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLegal(null);
          }}
        >
          <div className="notice-in relative w-full max-w-lg bg-ivory-50 p-8 text-marine-900 shadow-2xl md:p-10">
            <button
              type="button"
              autoFocus
              onClick={() => setLegal(null)}
              aria-label="Fermer"
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center text-marine-900 transition-colors hover:text-terra-500"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-terra-500">
              Terre &amp; Mer
            </p>
            <h3 className="mt-3 font-display text-3xl font-light">
              {legalCopy[legal].title}
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-marine-800/90">
              {legalCopy[legal].body}
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
