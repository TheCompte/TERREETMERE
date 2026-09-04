import { useCallback, useEffect, useRef, useState } from "react";
import { galleryItems, restaurant, type ImageKey } from "../data/restaurant";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  Overline,
  Reveal,
  useBodyLock,
} from "./ui";

const sizeClasses: Record<(typeof galleryItems)[number]["size"], string> = {
  large: "col-span-2 row-span-2",
  tall: "row-span-2",
  wide: "col-span-2",
  small: "",
};

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  useBodyLock(lightbox !== null);

  const count = galleryItems.length;

  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + count) % count)),
    [count]
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % count)),
    [count]
  );

  /* Clavier : Échap + flèches */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  const current = lightbox !== null ? galleryItems[lightbox] : null;
  const currentImg = current
    ? restaurant.images[current.image as ImageKey]
    : null;

  return (
    <section id="galerie" className="bg-marine-900 py-24 text-ivory-50 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* En-tête */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Reveal>
              <Overline className="text-champagne-300">Galerie</Overline>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl leading-[1.02] font-light md:text-7xl">
                Instantanés <em className="italic text-champagne-300">d'ici.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-xs text-sm leading-relaxed text-marine-200 md:pb-3 md:text-right">
              Le port, la salle, le feu, l'assiette — cliquer sur une image
              pour l'agrandir.
            </p>
          </Reveal>
        </div>

        {/* Mosaïque asymétrique */}
        <div className="mt-14 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[185px] md:mt-16 md:grid-cols-4 md:auto-rows-[215px] md:gap-4">
          {galleryItems.map((item, i) => {
            const img = restaurant.images[item.image as ImageKey];
            return (
              <Reveal
                key={`${item.image}-${i}`}
                delay={(i % 4) * 80}
                className={sizeClasses[item.size]}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative block h-full w-full overflow-hidden bg-marine-950 text-left"
                  aria-label={`Agrandir : ${item.caption}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-marine-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute top-4 left-4 font-display text-sm italic text-ivory-50/0 transition-all duration-500 group-hover:text-ivory-50/90">
                    0{i + 1}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 translate-y-4 p-4 pt-10 font-display text-base italic text-ivory-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:text-lg">
                    {item.caption}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-marine-300">
          Photographies d'ambiance provisoires
        </p>
      </div>

      {/* Lightbox plein écran */}
      {lightbox !== null && current && currentImg && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-marine-950/[0.985] text-ivory-50"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo : ${current.caption}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null);
          }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) (dx > 0 ? prev : next)();
            touchX.current = null;
          }}
        >
          {/* Barre supérieure */}
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <p className="font-display text-lg italic text-champagne-300">
              {String(lightbox + 1).padStart(2, "0")}{" "}
              <span className="text-ivory-50/50">/ {String(count).padStart(2, "0")}</span>
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => setLightbox(null)}
              aria-label="Fermer la galerie"
              className="inline-flex h-12 w-12 items-center justify-center border border-ivory-50/25 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Image */}
          <div
            className="flex flex-1 items-center justify-center px-4 md:px-16"
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightbox(null);
            }}
          >
            <img
              key={lightbox}
              src={currentImg.src}
              alt={currentImg.alt}
              className="notice-in max-h-[72vh] max-w-full object-contain shadow-2xl shadow-marine-950"
            />
          </div>

          {/* Barre inférieure */}
          <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-8">
            <p className="font-display text-lg italic text-ivory-100 md:text-xl">
              {current.caption}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Photo précédente"
                className="inline-flex h-12 w-12 items-center justify-center border border-ivory-50/25 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Photo suivante"
                className="inline-flex h-12 w-12 items-center justify-center border border-ivory-50/25 transition-colors duration-300 hover:border-champagne-300 hover:text-champagne-300"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
