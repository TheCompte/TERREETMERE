import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/* ============================================================
   Hooks
   ============================================================ */

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export function useCountUp(
  target: number,
  started: boolean,
  opts?: { duration?: number; decimals?: number }
): string {
  const [val, setVal] = useState(0);
  const reduced = useReducedMotion();
  const decimals = opts?.decimals ?? 0;
  const duration = opts?.duration ?? 1500;

  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, reduced, duration]);

  return val.toFixed(decimals).replace(".", ",");
}

export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [locked]);
}

/* ============================================================
   Révélation au scroll
   ============================================================ */

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const [ref, inView] = useReveal<HTMLElement>();
  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref}
      style={style}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   Petits éléments de marque
   ============================================================ */

export function Wordmark({
  className = "",
  ampClassName = "text-champagne-400",
}: {
  className?: string;
  ampClassName?: string;
}) {
  return (
    <span
      className={`font-display tracking-[0.16em] whitespace-nowrap ${className}`}
    >
      TERRE <em className={`italic font-light ${ampClassName}`}>&amp;</em> MER
    </span>
  );
}

export function Overline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.34em] ${className}`}
    >
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
      {children}
    </p>
  );
}

/** Ligne de marée : vague SVG qui se dessine à l'apparition */
export function TideLine({ className = "" }: { className?: string }) {
  const [ref, inView] = useReveal<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`${inView ? "is-in" : ""} ${className}`}>
      <svg
        viewBox="0 0 320 22"
        fill="none"
        className="h-5 w-64 max-w-full"
        aria-hidden="true"
      >
        <path
          className="tide-path"
          d="M2 11c16-8 32-8 48 0s32 8 48 0 32-8 48 0 32 8 48 0 32-8 48 0 32 8 48 0 24-6 28-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ============================================================
   Étoiles de notation
   ============================================================ */

function StarRow({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className="h-5 w-5 shrink-0" />
      ))}
    </span>
  );
}

export function Stars({
  value = 5,
  className = "",
  starClass = "h-5 w-5",
}: {
  value?: number;
  className?: string;
  starClass?: string;
}) {
  const [ref, inView] = useReveal<HTMLDivElement>(0.4);
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));

  return (
    <div
      ref={ref}
      className={`relative inline-flex ${className}`}
      role="img"
      aria-label={`Note de ${String(value).replace(".", ",")} sur 5`}
    >
      <span className="flex items-center gap-1 text-marine-200/50">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} className={starClass} />
        ))}
      </span>
      <span
        className="stars-fill absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: inView ? `${pct}%` : "0%" }}
      >
        <span className="flex items-center gap-1 text-champagne-400">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} className={starClass} />
          ))}
        </span>
      </span>
    </div>
  );
}

/* ============================================================
   Lien intelligent : URL réelle, ou repli propre si vide
   ============================================================ */

export function ActionLink({
  url,
  className = "",
  children,
  noticeClassName = "",
  notice = "Lien en attente de confirmation par le restaurant.",
}: {
  url: string;
  className?: string;
  children: ReactNode;
  noticeClassName?: string;
  /** Message visible affiché tant que l'URL officielle n'est pas configurée */
  notice?: string;
}) {
  /* URL officielle configurée dans src/data/restaurant.ts : lien direct. */
  if (url && url.trim() !== "") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  /* URL non confirmée : le bouton n'effectue AUCUNE redirection
     (jamais vers le téléphone) et indique visiblement que le lien
     officiel est en attente. */
  return (
    <span className="inline-flex flex-col items-start gap-3">
      <button
        type="button"
        aria-disabled="true"
        onClick={(e) => e.preventDefault()}
        className={`${className} cursor-not-allowed opacity-80`}
      >
        {children}
      </button>
      <span
        role="status"
        className={`inline-flex max-w-sm items-center gap-2.5 text-sm font-normal normal-case tracking-normal leading-relaxed ${noticeClassName}`}
      >
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8 4.5V8l2.3 1.4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {notice}
      </span>
    </span>
  );
}

/* ============================================================
   Icônes dessinées sur mesure (24 × 24)
   ============================================================ */

type IconProps = { className?: string };

export function StarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.6l2.85 5.9 6.5.9-4.72 4.52 1.15 6.44L12 17.3l-5.78 3.06 1.15-6.44L2.65 9.4l6.5-.9z" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.2 3.5h3.1l1.8 4.4-2.2 1.8a13 13 0 006.4 6.4l1.8-2.2 4.4 1.8v3.1c0 .9-.7 1.6-1.6 1.7C10.6 21 3 13.4 3.5 5.1c0-.9.8-1.6 1.7-1.6z" />
    </svg>
  );
}

export function PinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21.5S5.3 15.6 5.3 10.7a6.7 6.7 0 1113.4 0c0 4.9-6.7 10.8-6.7 10.8z" />
      <circle cx="12" cy="10.6" r="2.4" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 12h16M14 5.8l5.8 6.2-5.8 6.2" />
    </svg>
  );
}

export function ArrowUpIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5v-16M5.8 10 12 3.8 18.2 10" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 4.5 7.5 12 15 19.5" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4.5 16.5 12 9 19.5" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function BurgerIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M3.5 9h17M7.5 15h13" />
    </svg>
  );
}

export function FishIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.2 12c2.6-3.6 6-5.4 9.3-4.9 2.2.3 4 1.8 5.3 4.9-1.3 3.1-3.1 4.6-5.3 4.9-3.3.5-6.7-1.3-9.3-4.9z" />
      <path d="M6.2 12 2.6 8.6v6.8L6.2 12z" />
      <circle cx="17" cy="11.2" r="0.4" fill="currentColor" />
      <path d="M10.5 8.5c1.2 2.2 1.2 4.8 0 7" />
    </svg>
  );
}

export function FlameIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.8c.9 2.7 4.1 4.5 5.3 7.4 1 2.5.7 5.5-1.3 7.5a6.9 6.9 0 01-10.9-2c-.6-2.5.4-4.7 1.9-6.5.5 1.1 1.1 1.8 2.1 2.4-.3-3.2 1-6.8 2.9-8.8z" />
    </svg>
  );
}

export function LeafIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 19.5C4.5 10.5 10.5 4.5 20 4.5c0 9.5-6 15.5-15.5 15z" />
      <path d="M4.5 19.5C8 14.5 12 10.5 17.5 7" />
    </svg>
  );
}

export function AnchorIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="5" r="2.4" />
      <path d="M12 7.4V21M12 21c-4.6 0-8-3.1-8.7-7.2M12 21c4.6 0 8-3.1 8.7-7.2M2.2 12.5l1.1 1.3 1.5-1M21.8 12.5l-1.1 1.3-1.5-1" />
    </svg>
  );
}

export function BoatIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v10M12 4.5c3 1.2 5 3.9 5.4 7H12M4 14.5h16l-2.2 4H6.2l-2.2-4z" />
      <path d="M2.5 21.5c1.6-1 3.2-1 4.8 0 1.5 1 3.1 1 4.7 0 1.5 1 3.1 1 4.7 0 1.6-1 3.2-1 4.8 0" />
    </svg>
  );
}

export function CheckIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
