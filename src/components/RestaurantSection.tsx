import { restaurant } from "../data/restaurant";
import {
  AnchorIcon,
  ArrowRightIcon,
  Overline,
  PhoneIcon,
  PinIcon,
  Reveal,
  StarIcon,
  TideLine,
  Wordmark,
} from "./ui";

/* ------------------------------------------------------------
   Carte stylisée du Vieux-Port — dessin original (SVG)
   ------------------------------------------------------------ */
function PortMap() {
  return (
    <svg
      viewBox="0 0 560 420"
      className="h-auto w-full"
      role="img"
      aria-label="Plan stylisé du Vieux-Port de Marseille situant Terre & Mer au 214 Quai du Port"
    >
      {/* Fond */}
      <rect width="560" height="420" fill="#122836" />

      {/* Eau du Vieux-Port */}
      <path
        d="M0 252 C 90 238, 170 260, 260 250 C 350 240, 470 258, 560 246 L 560 420 L 0 420 Z"
        fill="#173242"
      />
      <path
        d="M0 252 C 90 238, 170 260, 260 250 C 350 240, 470 258, 560 246"
        stroke="#d6b678"
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />

      {/* Rides d'eau */}
      {[286, 316, 350, 384].map((y, i) => (
        <path
          key={y}
          d={`M${20 + i * 14} ${y} c 30 -7, 60 -7, 90 0 s 60 7, 90 0`}
          stroke="#48718a"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          opacity="0.55"
        />
      ))}

      {/* Ruelles du Panier */}
      <g stroke="#f4edda" strokeWidth="1.1" opacity="0.16">
        <path d="M30 40 L150 90 M60 20 L180 74 M20 80 L130 128 M90 16 L210 60 M40 120 L160 168 M120 100 L230 140" />
        <path d="M150 10 L40 96 M190 40 L70 140 M220 80 L110 176" />
      </g>
      <text x="34" y="200" fill="#8fadb9" fontSize="11" letterSpacing="3" fontFamily="Archivo, sans-serif" fontWeight="600">
        LE PANIER
      </text>

      {/* Mucem */}
      <g opacity="0.85">
        <rect x="30" y="218" width="66" height="44" fill="none" stroke="#8fadb9" strokeWidth="1.2" />
        <path d="M30 218 l66 44 M96 218 l-66 44 M30 240 h66 M63 218 v44" stroke="#8fadb9" strokeWidth="0.8" opacity="0.6" />
        <text x="30" y="280" fill="#8fadb9" fontSize="10" letterSpacing="2.5" fontFamily="Archivo, sans-serif" fontWeight="600">
          MUCEM
        </text>
      </g>

      {/* Hôtel de Ville */}
      <g>
        <rect x="222" y="204" width="44" height="30" fill="none" stroke="#8fadb9" strokeWidth="1.2" opacity="0.85" />
        <text x="214" y="196" fill="#8fadb9" fontSize="10" letterSpacing="2" fontFamily="Archivo, sans-serif" fontWeight="600">
          HÔTEL DE VILLE
        </text>
      </g>

      {/* Quais */}
      <text x="130" y="242" fill="#dccfae" fontSize="10.5" letterSpacing="3" fontFamily="Archivo, sans-serif" fontWeight="600" transform="rotate(-2 130 242)">
        QUAI DU PORT
      </text>
      <text x="120" y="398" fill="#8fadb9" fontSize="10" letterSpacing="3" fontFamily="Archivo, sans-serif" fontWeight="600">
        QUAI DE RIVE NEUVE
      </text>
      <text x="330" y="330" fill="#8fadb9" fontSize="13" letterSpacing="6" fontFamily="Fraunces, serif" fontStyle="italic">
        Vieux-Port
      </text>

      {/* Bateaux */}
      <g stroke="#b9cdd4" strokeWidth="1.3" fill="none" opacity="0.75" strokeLinecap="round">
        <path d="M150 300 h26 l-5 8 h-16 z M163 300 v-14" />
        <path d="M420 292 h24 l-4.5 7.5 h-15 z M432 292 v-13" />
        <path d="M480 342 h22 l-4 7 h-14 z M491 342 v-12" />
      </g>

      {/* Rose des vents */}
      <g transform="translate(516 44)" stroke="#d6b678" strokeWidth="1.2" opacity="0.9">
        <circle r="16" fill="none" />
        <path d="M0 -16 L4 0 L0 16 L-4 0 Z" fill="#d6b678" stroke="none" opacity="0.9" />
        <text y="-24" textAnchor="middle" fill="#d6b678" fontSize="11" fontFamily="Archivo, sans-serif" fontWeight="700" stroke="none">
          N
        </text>
      </g>

      {/* Repère Terre & Mer */}
      <g transform="translate(330 246)">
        <circle r="7" fill="#d6b678" className="pin-pulse" opacity="0.8" />
        <circle r="13" fill="none" stroke="#d6b678" strokeWidth="1.4" opacity="0.9" />
        <circle r="5" fill="#d6b678" />
        <path d="M0 13 L0 30" stroke="#d6b678" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.8" />
        <g transform="translate(14 34)">
          <rect x="-6" y="0" width="118" height="30" fill="#f4edda" />
          <text x="8" y="20" fill="#0f2029" fontSize="12.5" fontFamily="Fraunces, serif" fontStyle="italic">
            Terre &amp; Mer — n° 214
          </text>
        </g>
      </g>

      {/* Échelle */}
      <g transform="translate(36 404)" stroke="#8fadb9" strokeWidth="1.2">
        <path d="M0 0 h60 M0 -4 v8 M60 -4 v8" />
        <text x="70" y="4" fill="#8fadb9" fontSize="9.5" fontFamily="Archivo, sans-serif" letterSpacing="1.5" stroke="none">
          ≈ 100 M
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------
   Section Le restaurant : histoire + situation
   ------------------------------------------------------------ */
export default function RestaurantSection() {
  return (
    <section id="restaurant" className="bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Récit */}
        <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Overline className="text-terra-500">Le restaurant</Overline>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-6 font-display text-6xl leading-[0.98] font-light text-marine-900 md:text-7xl">
                  Terre
                  <br />
                  <em className="italic text-terra-500">&amp;</em>{" "}
                  <span className="text-marine-600">Mer</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <TideLine className="mt-8 text-marine-600/60" />
                <p className="mt-6 max-w-sm font-display text-xl leading-snug font-light italic text-marine-800">
                  Un nom comme une adresse : d'un côté la Provence, de l'autre
                  la Méditerranée — et au milieu, une table.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <div className="mt-10 max-w-sm border border-marine-900/15 bg-ivory-50 p-6">
                  <Wordmark className="text-sm text-marine-900" ampClassName="text-terra-500" />
                  <address className="mt-4 text-sm leading-relaxed text-marine-800/90 not-italic">
                    {restaurant.address.street}
                    <br />
                    {restaurant.address.zip} {restaurant.address.city},{" "}
                    {restaurant.address.country}
                  </address>
                  <a
                    href={restaurant.phone.href}
                    className="mt-3 inline-flex items-center gap-2.5 text-sm font-semibold text-marine-900 transition-colors hover:text-terra-500"
                  >
                    <PhoneIcon className="h-4 w-4 text-terra-500" />
                    {restaurant.phone.display}
                  </a>
                  <p className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-marine-600">
                    <StarIcon className="h-3.5 w-3.5 text-champagne-500" />
                    4,9 / 5 · 96 avis Google
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="max-w-2xl">
            <Reveal>
              <p className="text-lg leading-relaxed text-marine-900/90 md:text-xl">
                Terre &amp; Mer porte son nom comme une évidence. D'un côté,
                les étals du matin, les légumes du soleil, l'huile d'olive et
                les herbes de Provence ; de l'autre, la Méditerranée qui dépose
                chaque jour poissons et coquillages au pied du Vieux-Port.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <blockquote className="my-10 border-l-2 border-champagne-500 pl-7">
                <p className="font-display text-3xl leading-snug font-light italic text-marine-900 md:text-4xl">
                  La terre donne, la mer offre,
                  <br />
                  le feu réunit.
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-base leading-relaxed text-marine-800/90 md:text-lg">
                Tout commence au marché et finit au feu. Les produits arrivent
                frais, se travaillent simplement et se cuisent sur pierre de
                lave — cette roche volcanique qui saisit, parfume et respecte
                la matière.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-base leading-relaxed text-marine-800/90 md:text-lg">
                Sur le quai, la salle respire l'hospitalité marseillaise : des
                assiettes généreuses, des tables que l'on partage, un accueil
                qui ne compte pas son temps. On vient pour manger ; on reste
                pour l'instant.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="img-breathe mt-12 max-w-md overflow-hidden">
                <img
                  src={restaurant.images.interior.src}
                  alt={restaurant.images.interior.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Situation */}
        <div className="mt-24 grid items-center gap-12 lg:mt-32 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -translate-x-3 translate-y-3 border border-terra-400/40 lg:-inset-4"
            />
            <div className="relative overflow-hidden">
              <PortMap />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Overline className="text-marine-600">Où nous trouver</Overline>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="mt-6 font-display text-4xl leading-[1.03] font-light text-marine-900 md:text-6xl">
                Au cœur du
                <br />
                <em className="italic text-marine-600">Vieux-Port.</em>
              </h3>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-marine-800/90">
                La table est posée sur le quai, entre l'Hôtel de Ville et les
                bateaux — à deux pas du Panier et du Mucem. On y vient à pied
                en flânant, on en repart face au large.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <ul className="mt-9 space-y-5">
                <li className="flex items-start gap-4">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-terra-500" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-marine-900">
                      Adresse
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-marine-800/85">
                      {restaurant.address.street}, {restaurant.address.zip}{" "}
                      {restaurant.address.city}, {restaurant.address.country}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-terra-500" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-marine-900">
                      Téléphone
                    </p>
                    <a
                      href={restaurant.phone.href}
                      className="mt-1 inline-block text-sm text-marine-800/85 transition-colors hover:text-terra-500"
                    >
                      {restaurant.phone.display}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <AnchorIcon className="mt-0.5 h-5 w-5 shrink-0 text-terra-500" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-marine-900">
                      Repères
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-marine-800/85">
                      Métro Vieux-Port — Hôtel de Ville · Parking Mucem à
                      proximité
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={320} className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={restaurant.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-marine-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-ivory-50 transition-colors duration-300 hover:bg-marine-700"
              >
                Itinéraire
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
              <a
                href={restaurant.phone.href}
                className="border-b border-terra-500/60 pb-1 text-xs font-bold uppercase tracking-[0.24em] text-terra-600 transition-colors hover:border-terra-500 hover:text-terra-500"
              >
                Appeler le restaurant
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
