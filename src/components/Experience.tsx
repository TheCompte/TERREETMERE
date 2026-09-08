import { useEffect, useState } from "react";
import { experienceItems, restaurant, type ImageKey } from "../data/restaurant";
import { Overline, Reveal, TideLine, useReducedMotion } from "./ui";

export default function Experience() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  /* Défilement lent automatique des thèmes, jusqu'à interaction */
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % experienceItems.length),
      4200
    );
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  return (
    <section id="experience" className="bg-ivory-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* En-tête éditorial */}
        <div className="max-w-3xl">
          <Reveal>
            <Overline className="text-terra-500">L'expérience</Overline>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] font-light text-marine-900 md:text-7xl">
              Entre <em className="italic text-terra-500">Terre</em>{" "}
              <em className="italic text-marine-600">&amp;</em>{" "}
              <em className="italic text-marine-600">Mer</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-marine-800/85 md:text-lg">
              Six chapitres racontent la table du 214 Quai du Port : ce que la
              Méditerranée dépose le matin, ce que la Provence fait pousser, et
              ce que le feu en fait à midi comme au soir.
            </p>
          </Reveal>
        </div>

        <div
          className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16"
          onMouseEnter={() => setPaused(true)}
        >
          {/* Image vivante, collée au défilement */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="lg:sticky lg:top-28">
              <div
                aria-hidden="true"
                className="absolute -inset-3 border border-champagne-500/45 lg:-inset-4"
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-marine-900">
                {experienceItems.map((item, i) => {
                  const img = restaurant.images[item.image as ImageKey];
                  return (
                    <img
                      key={item.id}
                      src={img.src}
                      alt={i === active ? img.alt : ""}
                      aria-hidden={i !== active}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                        i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                      }`}
                    />
                  );
                })}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-marine-950/85 to-transparent p-5 pt-14">
                  <p className="font-display text-xl italic text-ivory-50">
                    {experienceItems[active].title}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Liste des chapitres */}
          <div className="order-1 lg:order-2">
            {experienceItems.map((item, i) => {
              const isActive = i === active;
              return (
                <Reveal key={item.id} delay={i * 70}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    onFocus={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-current={isActive}
                    className={`group block w-full border-t border-marine-900/12 py-6 text-left transition-colors duration-300 last:border-b md:py-7 ${
                      isActive ? "bg-transparent" : "hover:bg-marine-900/[0.03]"
                    }`}
                  >
                    <div className="flex items-baseline gap-5 md:gap-7">
                      <span
                        className={`font-display text-sm italic transition-colors duration-300 ${
                          isActive ? "text-terra-500" : "text-marine-800/40"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`font-display text-2xl font-light tracking-wide transition-all duration-300 md:text-3xl ${
                            isActive
                              ? "translate-x-0 text-marine-950"
                              : "text-marine-900/75 group-hover:translate-x-1.5"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-2.5 max-w-md text-sm leading-relaxed transition-all duration-500 ${
                            isActive
                              ? "text-marine-800/90 opacity-100"
                              : "text-marine-800/55 opacity-70"
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`hidden h-px w-12 self-center transition-all duration-500 md:block ${
                          isActive ? "bg-terra-500" : "bg-marine-900/15"
                        }`}
                      />
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <TideLine className="mt-20 text-marine-600/50 md:mt-24" />
      </div>
    </section>
  );
}
