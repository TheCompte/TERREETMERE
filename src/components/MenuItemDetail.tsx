import { useEffect } from "react";
import type { MenuItem } from "../data/menu";
import { CloseIcon } from "./ui";

interface MenuItemDetailProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuItemDetail({ item, onClose }: MenuItemDetailProps) {
  useEffect(() => {
    if (!item) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-marine-950/90 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <div
        className="notice-in relative max-h-[90vh] w-full max-w-4xl overflow-hidden bg-ivory-50 shadow-2xl md:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center bg-marine-900/80 text-ivory-50 backdrop-blur-sm transition-colors hover:bg-marine-900 md:top-6 md:right-6"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="flex h-full flex-col overflow-y-auto md:flex-row">
          {/* Image */}
          {item.image ? (
            <div className="relative aspect-square w-full shrink-0 bg-marine-900 md:aspect-auto md:w-1/2">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="relative flex aspect-square w-full shrink-0 items-center justify-center bg-marine-900 md:aspect-auto md:w-1/2">
              <div className="text-center">
                <p className="font-display text-6xl font-light italic text-champagne-400/30 md:text-8xl">
                  &amp;
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-ivory-50/50">
                  Photographie à venir
                </p>
              </div>
            </div>
          )}

          {/* Contenu */}
          <div className="flex flex-1 flex-col justify-center p-8 md:p-12 lg:p-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-terra-500">
              Terre & Mer
            </p>

            <h2 className="mt-4 font-display text-3xl leading-tight font-light text-marine-950 md:text-4xl lg:text-5xl">
              {item.name}
            </h2>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-4xl font-light text-marine-900 md:text-5xl">
                {item.price.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-lg text-marine-700">€</span>
            </div>

            {item.description && (
              <p className="mt-6 text-base leading-relaxed text-marine-800/90 md:text-lg">
                {item.description}
              </p>
            )}

            {/* Ligne décorative */}
            <div className="mt-8">
              <svg
                viewBox="0 0 320 22"
                fill="none"
                className="h-5 w-48 max-w-full text-terra-400/60"
                aria-hidden="true"
              >
                <path
                  d="M2 11c16-8 32-8 48 0s32 8 48 0 32-8 48 0 32 8 48 0 32-8 48 0 32 8 48 0 24-6 28-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="mt-6 font-display text-sm italic text-marine-700/80">
              Photographie d'ambiance — visuel provisoire
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
