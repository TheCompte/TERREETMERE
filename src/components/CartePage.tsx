import { useState, useEffect } from "react";
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
      const offset = 100;
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

  // Helper to render category with editorial layout
  const renderCategory = (category: typeof menuData[0], index: number) => {
    const items = category.items;
    
    return (
      <section
        key={category.id}
        id={category.id}
        className="relative mb-32 last:mb-0 md:mb-48"
      >
        {/* Category Header */}
        <Reveal>
          <div className="mb-16 md:mb-24">
            <div className="flex items-baseline gap-6 md:gap-8">
              <span className="font-display text-sm italic text-terra-500 md:text-base">
                0{index + 1}
              </span>
              <h2 className="font-display text-4xl font-light tracking-wide text-marine-950 md:text-6xl lg:text-7xl">
                {category.name}
              </h2>
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-marine-900/20 via-marine-900/10 to-transparent" />
          </div>
        </Reveal>

        {/* Clean Grid Layout - Image | Content | Price */}
        <div className="space-y-8">
          {items.map((item, itemIndex) => {
            // First item gets featured treatment
            const isFeatured = itemIndex === 0;
            
            if (isFeatured) {
              // Featured dish - large, cinematic
              return (
                <Reveal key={item.id} delay={itemIndex * 100}>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="group block w-full text-left"
                    aria-label={`Voir le détail : ${item.name}`}
                  >
                    <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                      {/* Large Image */}
                      <div className="md:col-span-7">
                        <div className="relative overflow-hidden rounded-lg bg-marine-100 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-marine-100 to-marine-200">
                              <span className="font-display text-6xl font-light italic text-champagne-400/30">
                                &amp;
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-marine-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          
                          {/* Featured badge */}
                          <div className="absolute top-6 left-6">
                            <span className="inline-block bg-champagne-400/95 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-marine-950 backdrop-blur-sm">
                              Signature
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col justify-center md:col-span-5">
                        <h3 className="font-display text-3xl leading-tight font-light text-marine-950 transition-colors duration-300 group-hover:text-terra-500 md:text-4xl">
                          {item.name}
                        </h3>
                        
                        {item.description && (
                          <p className="mt-4 text-base leading-relaxed text-marine-800/85">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="mt-6 flex items-baseline gap-3">
                          <span className="font-display text-4xl font-light text-marine-900">
                            {item.price.toFixed(2).replace(".", ",")}
                          </span>
                          <span className="text-xl text-marine-700">€</span>
                        </div>
                        
                        <div className="mt-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-terra-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span>Voir le détail</span>
                          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            }

            // Standard dish - clean grid: Image | Content | Price
            return (
              <Reveal key={item.id} delay={itemIndex * 100}>
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="group block w-full text-left"
                  aria-label={`Voir le détail : ${item.name}`}
                >
                  <div className="grid items-center gap-6 rounded-lg border border-marine-900/5 bg-white p-6 transition-all duration-300 hover:border-champagne-400/30 hover:shadow-md md:grid-cols-[200px_1fr_auto] md:gap-8 md:p-8">
                    {/* Image */}
                    <div className="shrink-0">
                      <div className="relative overflow-hidden rounded-lg bg-marine-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                          />
                        ) : (
                          <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-marine-100 to-marine-200">
                            <span className="font-display text-3xl font-light italic text-champagne-400/30">
                              &amp;
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <h3 className="font-display text-xl leading-tight font-light text-marine-950 transition-colors duration-300 group-hover:text-terra-500 md:text-2xl">
                        {item.name}
                      </h3>
                      
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-marine-800/75">
                          {item.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-2 md:flex-col md:items-end md:gap-1">
                      <span className="font-display text-2xl font-light text-marine-900 md:text-3xl">
                        {item.price.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-base text-marine-700">€</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Category note for meats */}
        {category.id === "meats" && (
          <Reveal delay={200}>
            <div className="mt-16 border-l-2 border-champagne-400/40 pl-6 md:mt-20">
              <p className="font-display text-base italic text-marine-700/90 md:text-lg">
                Accompagnements au choix : frites maison, salade, légumes de saison, pâtes ou riz noir.
              </p>
            </div>
          </Reveal>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-marine-900">
      {/* Grain ambiant */}
      <div className="noise-overlay" aria-hidden="true" />

      <Nav />

      {/* Hero éditorial - Cinematic */}
      <section className="relative overflow-hidden bg-marine-950 pb-32 pt-40 text-ivory-50 md:pb-40 md:pt-48">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={restaurant.images.terrace.src}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-marine-950/80 via-marine-950/60 to-marine-950/90" />
        </div>

        {/* Filigrane */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-10 font-display text-[20rem] leading-none font-light italic text-marine-800/20 select-none md:text-[30rem]"
        >
          &amp;
        </span>

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <Overline className="text-champagne-300">Carte</Overline>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-8 font-display text-6xl leading-[0.9] font-light tracking-wide md:text-8xl lg:text-9xl">
              Carte
              <br />
              <em className="italic text-champagne-300">Terre &amp; Mer</em>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-10 max-w-2xl font-display text-2xl leading-snug font-light italic text-marine-200 md:text-3xl">
              Une cuisine généreuse entre terre, mer et Méditerranée.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <TideLine className="mt-12 text-champagne-400/50" />
          </Reveal>
        </div>
      </section>

      {/* Navigation par catégorie - Sticky */}
      <nav className="sticky top-[72px] z-30 border-b border-marine-900/10 bg-ivory-50/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex gap-8 overflow-x-auto py-5 scrollbar-hide md:gap-12">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`whitespace-nowrap font-display text-sm font-light tracking-wide transition-colors md:text-base ${
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

      {/* Contenu de la carte - Editorial Layout */}
      <main className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        {menuData.map((category, index) => renderCategory(category, index))}
      </main>

      {/* Quote / Philosophy */}
      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <Reveal>
            <Wordmark className="text-lg text-marine-900" ampClassName="text-terra-500" />
          </Reveal>
          <Reveal delay={100}>
            <blockquote className="mt-10 font-display text-3xl leading-snug font-light italic text-marine-800 md:text-4xl lg:text-5xl">
              Produits frais, cuissons sur pierre de lave,
              <br className="hidden md:block" />
              saveurs de la Méditerranée.
            </blockquote>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex justify-center">
              <TideLine className="text-terra-400/60" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Réservation - Premium */}
      <section className="relative overflow-hidden bg-marine-950 py-28 text-ivory-50 md:py-36">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d6b678' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
          <Reveal>
            <Overline className="justify-center text-champagne-300">
              Réservation
            </Overline>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-8 font-display text-5xl leading-[1.02] font-light md:text-7xl">
              Votre table vous
              <br />
              <em className="italic text-champagne-300">attend.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-marine-200 md:text-xl">
              Réservez votre table au cœur du Vieux-Port de Marseille.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <a
              href={reservationHref}
              className="group inline-flex items-center gap-3 bg-champagne-400 px-10 py-5 text-xs font-bold uppercase tracking-[0.26em] text-marine-950 transition-all duration-300 hover:bg-champagne-300 hover:shadow-[0_0_30px_rgba(214,182,120,0.3)]"
            >
              Réserver une table
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href={restaurant.phone.href}
              className="inline-flex items-center gap-3 border border-ivory-50/35 px-10 py-5 text-xs font-bold uppercase tracking-[0.26em] text-ivory-50 transition-all duration-300 hover:border-champagne-300 hover:text-champagne-300"
            >
              {restaurant.phone.display}
            </a>
          </Reveal>
          <Reveal delay={350}>
            <p className="mt-12 text-sm text-marine-300">
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
