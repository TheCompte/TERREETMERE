import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { reservationHref, restaurant } from "./data/restaurant";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustBand from "./components/TrustBand";
import Experience from "./components/Experience";
import Cuisine from "./components/Cuisine";
import CarteSection from "./components/CarteSection";
import Gallery from "./components/Gallery";
import RestaurantSection from "./components/RestaurantSection";
import ReviewsSection from "./components/ReviewsSection";
import ReservationSection from "./components/ReservationSection";
import Footer from "./components/Footer";
import CartePage from "./components/CartePage";
import SeoHead from "./components/SeoHead";
import { PhoneIcon } from "./components/ui";

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBand />
        <Experience />
        <Cuisine />
        <CarteSection />
        <Gallery />
        <RestaurantSection />
        <ReviewsSection />
        <ReservationSection />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}

/* Barre de réservation mobile, toujours à portée de pouce */
function MobileCta() {
  const [visible, setVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setContactInView(e.isIntersecting)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = visible && !contactInView;

  return (
    <div
      className={`fixed inset-x-4 bottom-4 z-40 flex gap-3 transition-all duration-500 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
      aria-hidden={!show}
    >
      <a
        href={reservationHref}
        tabIndex={show ? 0 : -1}
        className="flex-1 bg-champagne-400 py-4 text-center text-xs font-bold uppercase tracking-[0.24em] text-marine-950 shadow-[0_18px_45px_-12px_rgba(8,20,28,0.7)] transition-colors active:bg-champagne-300"
      >
        Réserver
      </a>
      <a
        href={restaurant.phone.href}
        tabIndex={show ? 0 : -1}
        aria-label="Appeler le restaurant"
        className="flex h-[50px] w-[50px] items-center justify-center bg-marine-900 text-champagne-300 shadow-[0_18px_45px_-12px_rgba(8,20,28,0.7)] ring-1 ring-champagne-400/50"
      >
        <PhoneIcon className="h-5 w-5" />
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SeoHead />
      <div className="min-h-screen bg-ivory-50 text-marine-900">
        {/* Grain ambiant */}
        <div className="noise-overlay" aria-hidden="true" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carte" element={<CartePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
