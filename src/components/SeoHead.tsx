import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Met à jour le titre de la page et les meta tags SEO
 * en fonction de la route actuelle.
 * Remonte également en haut de page lors des changements de route.
 */
export default function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    // Remonter en haut de page lors d'un changement de route
    window.scrollTo(0, 0);

    const isCarte = location.pathname === "/carte";

    // Titre
    document.title = isCarte
      ? "Carte | Terre & Mer – Restaurant à Marseille"
      : "Terre & Mer – Restaurant à Marseille, Vieux-Port";

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      isCarte
        ? "Découvrez la carte de Terre & Mer à Marseille, une cuisine généreuse entre terre et mer au cœur du Vieux-Port."
        : "Terre & Mer, restaurant situé au 214 Quai du Port à Marseille. Cuisine généreuse, produits frais, poissons, viandes et expérience méditerranéenne au cœur du Vieux-Port."
    );

    // Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute(
      "content",
      isCarte
        ? "Carte | Terre & Mer – Restaurant à Marseille"
        : "Terre & Mer – Restaurant à Marseille, Vieux-Port"
    );

    // Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute(
      "content",
      isCarte
        ? "Découvrez la carte de Terre & Mer à Marseille, une cuisine généreuse entre terre et mer au cœur du Vieux-Port."
        : "Une table entre terre, mer et Vieux-Port. Produits frais, poissons, viandes grillées sur pierre de lave, au 214 Quai du Port, Marseille."
    );
  }, [location]);

  return null;
}
