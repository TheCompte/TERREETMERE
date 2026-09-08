import { useEffect, useState } from "react";
import { navItems, reservationHref, restaurant } from "../data/restaurant";
import {
  BurgerIcon,
  CloseIcon,
  PhoneIcon,
  StarIcon,
  useBodyLock,
  Wordmark,
} from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#accueil");

  useBodyLock(open);

  /* Fond du header après le hero */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Section active (scroll-spy) */
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Échap pour fermer le menu mobile */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "border-b border-marine-900/10 bg-ivory-50/95 py-0 shadow-[0_10px_40px_-18px_rgba(8,20,28,0.35)] backdrop-blur-sm"
            : "bg-transparent py-2"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <a
            href="#accueil"
            className={`transition-colors duration-300 ${
              light ? "text-ivory-50" : "text-marine-900"
            }`}
            aria-label="Terre & Mer — retour à l'accueil"
            onClick={() => setOpen(false)}
          >
            <Wordmark
              className="text-lg md:text-xl"
              ampClassName={light ? "text-champagne-300" : "text-terra-500"}
            />
          </a>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative text-[11.5px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                  active === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                } ${
                  light
                    ? active === item.href
                      ? "text-champagne-300"
                      : "text-ivory-50/85 hover:text-ivory-50"
                    : active === item.href
                      ? "text-terra-500"
                      : "text-marine-800 hover:text-marine-950"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={reservationHref}
              className={`hidden items-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] transition-all duration-300 sm:inline-flex ${
                light
                  ? "bg-champagne-400 text-marine-950 hover:bg-champagne-300"
                  : "bg-marine-900 text-ivory-50 hover:bg-marine-800"
              }`}
            >
              Réserver
            </a>

            {/* Bouton menu mobile */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className={`inline-flex h-11 w-11 items-center justify-center transition-colors duration-300 lg:hidden ${
                light ? "text-ivory-50" : "text-marine-900"
              }`}
            >
              {open ? <CloseIcon /> : <BurgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Tiroir mobile */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col bg-marine-950 text-ivory-50 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav
          className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8 pt-24 pb-8"
          aria-label="Navigation mobile"
        >
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ animationDelay: open ? `${0.08 + i * 0.06}s` : "0s" }}
              className={`drawer-link group flex items-baseline gap-4 border-b border-ivory-50/10 py-3.5 ${
                active === item.href ? "text-champagne-300" : "text-ivory-50"
              }`}
            >
              <span className="font-display text-xs italic text-champagne-400/70">
                0{i + 1}
              </span>
              <span className="font-display text-3xl font-light tracking-wide transition-transform duration-300 group-hover:translate-x-2">
                {item.label}
              </span>
            </a>
          ))}

          <a
            href={reservationHref}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            style={{ animationDelay: open ? "0.55s" : "0s" }}
            className="drawer-link mt-8 inline-flex w-fit items-center gap-3 bg-champagne-400 px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-marine-950"
          >
            Réserver une table
          </a>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-ivory-50/70"
            style={{ animationDelay: open ? "0.62s" : "0s" }}
          >
            <a
              href={restaurant.phone.href}
              tabIndex={open ? 0 : -1}
              className="inline-flex items-center gap-2.5 hover:text-champagne-300"
            >
              <PhoneIcon className="h-4 w-4" />
              {restaurant.phone.display}
            </a>
            <span className="inline-flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-champagne-400" />
              4,9 / 5 · 99 avis Google
            </span>
          </div>
        </nav>
      </div>
    </>
  );
}
