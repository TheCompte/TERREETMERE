import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { reservationHref, restaurant } from "../data/restaurant";
import { menuData, type MenuItem } from "../data/menu";
import { ArrowRightIcon, Overline, Reveal, TideLine, Wordmark } from "./ui";
import MenuItemDetail from "./MenuItemDetail";
import Footer from "./Footer";
import Nav from "./Nav";

export default function CartePage() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Scroll to category when clicking on category nav
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Track active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const category of menuData) {
        const element = document.getElementById(category.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ivory-50 text-marine-900">
      {/* Grain ambiant */}
      <div className="noise-overlay" aria-hidden="true" />

      <Nav />

      {/* Hero éditorial */}
      <section className="relative overflow-hidden bg-marine-950 pb-24 pt-32 text-ivory-50 md:pb-32 md:pt-40">
        {/* Filigrane */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-10 font-display text-[20rem] leading-none font-light italic text-marine-800/30 select-none md:text-[30rem]"
        >
          &amp;
        </span>

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <Overline className="text-champagne-300">Carte</Overline>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] font-light tracking-wide md:text-7xl lg:text-8xl">
              Carte
              <br />
              <em className="italic text-champagne-300">Terre &amp; Mer</em>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-xl font-display text-xl leading-snug font-light italic text-marine-200 md:text-2xl">
              Une cuisine généreuse entre terre, mer et Méditerranée.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <TideLine className="mt-10 text-champagne-400/50" />
          </Reveal>
        </div>
      </section>

      {/* Navigation par catégorie */}
      <nav className="sticky top-[72px] z-30 border-b border-marine-900/10 bg-ivory-50/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex gap-6 overflow-x-auto py-4 scrollbar-hide">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                  activeCategory === category.id
                    ? "text-terra-500"
                    : "text-marine-800 hover:text-terra-500"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenu de la carte */}
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        {menuData.map((category, categoryIndex) => (
          <section
            key={category.id}
            id={category.id}
            className="mb-24 last:mb-0"
          >
            {/* En-tête de catégorie */}
            <Reveal>
              <div className="mb-12 flex items-baseline gap-5 md:mb-16">
                <span className="font-display text-sm italic text-terra-500">
                  0{categoryIndex + 1}
                </span>
                <h2 className="font-display text-3xl font-light tracking-wide text-marine-950 md:text-4xl">
                  {category.name}
                </h2>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-marine-900/15"
                />
              </div>
            </Reveal>

            {/* Grille de plats - composition asymétrique */}
            <div className="grid gap-12 md:gap-16 lg:grid-cols-12">
              {category.items.map((item, itemIndex) => {
                // Composition asymétrique : alternance de tailles et positions
                const isLarge = itemIndex % 3 === 0;
                const isOffset = itemIndex % 3 === 1;
                
                const colSpan = isLarge
                  ? "lg:col-span-8"
                  : isOffset
                    ? "lg:col-span-7 lg:col-start-5"
                    : "lg:col-span-7 lg:col-start-3";

                return (
                  <Reveal
                    key={item.id}
                    delay={itemIndex * 80}
                    className={`group ${colSpan}`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="block w-full text-left"
                      aria-label={`Voir le détail : ${item.name}`}
                    >
                      {/* Image (si disponible) */}
                      {item.image && (
                        <div className="img-breathe relative mb-5 overflow-hidden bg-marine-900">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                              isLarge ? "aspect-[16/10]" : "aspect-[4/3]"
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-marine-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          
                          {/* Numéro */}
                          <span className="absolute top-5 left-5 font-display text-sm italic text-ivory-50/0 transition-all duration-500 group-hover:text-ivory-50/90">
                            0{itemIndex + 1}
                          </span>
                        </div>
                      )}

                      {/* Infos du plat */}
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="font-display text-xl leading-snug font-light text-marine-950 transition-colors duration-300 group-hover:text-terra-500 md:text-2xl">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="mt-2 text-sm leading-relaxed text-marine-800/80 md:text-base">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 font-display text-xl font-light text-marine-900 md:text-2xl">
                          {item.price.toFixed(2).replace(".", ",")} €
                        </span>
                      </div>

                      {/* Ligne fine */}
                      <span className="mt-3 block h-px w-0 bg-terra-500/60 transition-all duration-500 group-hover:w-full" />
                    </button>
                  </Reveal>
                );
              })}
            </div>

            {/* Note pour la catégorie viandes */}
            {category.id === "meats" && (
              <Reveal delay={200}>
                <p className="mt-8 font-display text-sm italic text-marine-700/80">
                  Accompagnements : frites maison, salade, légumes, pâtes ou riz noir.
                </p>
              </Reveal>
            )}
          </section>
        ))}
      </main>

      {/* Note de fin */}
      <section className="bg-ivory-100 py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <Wordmark className="text-lg text-marine-900" ampClassName="text-terra-500" />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 font-display text-2xl leading-snug font-light italic text-marine-800 md:text-3xl">
              Produits frais, cuissons sur pierre de lave,
              <br className="hidden md:block" />
              saveurs de la Méditerranée.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA Réservation */}
      <section className="bg-marine-950 py-20 text-ivory-50 md:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <Reveal>
            <Overline className="justify-center text-champagne-300">
              Réservation
            </Overline>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] font-light md:text-6xl">
              Votre table vous
              <br />
              <em className="italic text-champagne-300">attend.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-lg mx-auto text-base leading-relaxed text-marine-200 md:text-lg">
              Réservez votre table au cœur du Vieux-Port de Marseille.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <a
              href={reservationHref}
              className="group inline-flex items-center gap-3 bg-champagne-400 px-9 py-4 text-xs font-bold uppercase tracking-[0.26em] text-marine-950 transition-colors duration-300 hover:bg-champagne-300"
            >
              Réserver une table
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href={restaurant.phone.href}
              className="inline-flex items-center gap-3 border border-ivory-50/35 px-8 py-4 text-xs font-bold uppercase tracking-[0.26em] text-ivory-50 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300"
            >
              {restaurant.phone.display}
            </a>
          </Reveal>
          <Reveal delay={350}>
            <p className="mt-10 text-sm text-marine-300">
              {restaurant.address.street}, {restaurant.address.zip}{" "}
              {restaurant.address.city}
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />

      {/* Modal de détail d'un plat */}
      <MenuItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
