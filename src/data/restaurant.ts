/* ============================================================
   TERRE & MER — Configuration centrale du site
   Toutes les informations éditables du restaurant vivent ici :
   identité, coordonnées, liens, textes courts et images.
   Les images sont des visuels d'ambiance provisoires —
   remplacez simplement les URL ci-dessous par les vraies
   photographies du restaurant.
   ============================================================ */

export const restaurant = {
  name: "Terre & Mer",
  legalName: "TERRE & MER",
  tagline: "Une table entre terre, mer et Vieux-Port.",
  baseline: "Cuisine méditerranéenne — 214 Quai du Port, Marseille",

  address: {
    street: "214 Quai du Port",
    zip: "13002",
    city: "Marseille",
    country: "France",
  },

  phone: {
    display: "04 96 17 60 58",
    href: "tel:+33496176058",
  },

  rating: {
    value: 4.9,
    count: 96,
    source: "Google",
  },

  /* ---- Liens réels à compléter --------------------------------
     Tant qu'une URL officielle n'est pas confirmée, laissez la
     chaîne vide. Le site n'invente JAMAIS de destination et ne
     fait AUCUN repli vers le téléphone : le bouton concerné
     indique simplement que son lien est en attente.
     Renseignez l'URL ici — rien d'autre à modifier.          */
  links: {
    /** URL officielle de la carte — pilote le bouton « Voir la carte » */
    menuUrl:
      "https://wiicmenu-qrcode.com/app/index.php?r=3557&c=67925",
    /** URL officielle du système de réservation externe (vide = formulaire interne) */
    reservationUrl: "",
    /** URL officielle de la page des avis Google */
    googleReviewsUrl: "",
  },

  /* ---- Système de réservation --------------------------------
     enabled : active/désactive le formulaire de réservation
     mode : "demo" (simulation locale) ou "live" (vrai backend)
     times : créneaux horaires disponibles (modifiable facilement)
     maxGuests : nombre maximum de convives autorisés
     Quand reservationUrl est renseignée, le bouton "Réserver"
     redirige vers cette URL externe au lieu du formulaire interne. */
  reservation: {
    enabled: true,
    mode: "demo" as const,
    times: [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
    ],
    maxGuests: 12,
  },

  /** Itinéraire Google Maps — bouton « Itinéraire » */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=214%20Quai%20du%20Port%2013002%20Marseille",

  geo: { latitude: 43.2967, longitude: 5.3682 },

  /* ---- Images (visuels provisoires, à remplacer) ------------- */
  images: {
    hero: {
      src: "https://image.qwenlm.ai/generated-images/fc244651-c5b0-4f76-a8cd-3b25bc6dcaf8/_result.png",
      alt: "Le Vieux-Port de Marseille à l'heure dorée, vu depuis la terrasse",
    },
    interior: {
      src: "https://image.qwenlm.ai/generated-images/f40c3573-fd51-4e68-89ad-99c3918436d8/_result.png",
      alt: "La salle du restaurant, lumière douce et matières naturelles",
    },
    fish: {
      src: "https://image.qwenlm.ai/generated-images/ab56d218-2c38-4d9b-87d2-1b246478b721/_result.png",
      alt: "Poisson entier grillé servi sur pierre de lave",
    },
    seafood: {
      src: "https://image.qwenlm.ai/generated-images/1cd551f9-f0a5-4d76-b2ed-5b8a041e8642/_result.png",
      alt: "Plateau de fruits de mer sur glace",
    },
    meat: {
      src: "https://image.qwenlm.ai/generated-images/99cb6b7b-b627-40a0-a432-ba938b6721d0/_result.png",
      alt: "Viande grillée au feu, servie sur pierre de lave",
    },
    lava: {
      src: "https://image.qwenlm.ai/generated-images/3ccb87ef-5729-46b4-be57-14a3db361727/_result.png",
      alt: "Cuisson sur pierre de lave, flammes et braises",
    },
    vieuxport: {
      src: "https://image.qwenlm.ai/generated-images/7816b695-7644-4939-a2ba-3beb3ac176d3/_result.png",
      alt: "Le Vieux-Port au petit matin, bateaux et colline de la Garde",
    },
    terrace: {
      src: "https://image.qwenlm.ai/generated-images/81a9d738-eb11-4403-9f90-ead15f21d3fa/_result.png",
      alt: "Table dressée au bord du port à la tombée du jour",
    },
    produce: {
      src: "https://image.qwenlm.ai/generated-images/0ae7a832-4b1a-4a17-be06-7ce006dd48c0/_result.png",
      alt: "Légumes du soleil, herbes fraîches et huile d'olive",
    },
  },
} as const;

/* ---- Destination des boutons « Réserver » ---------------------
   Valeur UNIQUE partagée par tous les boutons de réservation
   (hero, navigation, barre mobile, section réservation) :
   - si restaurant.links.reservationUrl est renseignée → elle est ouverte ;
   - sinon → repli vers la section réservation de la page (#contact).
   Aucun repli vers le téléphone, aucune URL inventée.          */
export const reservationHref =
  restaurant.links.reservationUrl.trim() !== ""
    ? restaurant.links.reservationUrl
    : "#contact";

/* ---- Navigation -------------------------------------------- */
export const navItems = [
  { label: "Accueil", href: "#accueil" },
  { label: "L'expérience", href: "#experience" },
  { label: "La cuisine", href: "#cuisine" },
  { label: "La carte", href: "#carte" },
  { label: "Galerie", href: "#galerie" },
  { label: "Le restaurant", href: "#restaurant" },
  { label: "Contact", href: "#contact" },
] as const;

/* ---- L'expérience : « Entre Terre & Mer » ------------------- */
export const experienceItems = [
  {
    id: "mer",
    title: "Les produits de la mer",
    text: "Pêche du jour, coquillages et crustacés choisis au plus près du Vieux-Port, servis dans leur plus simple vérité.",
    image: "seafood",
  },
  {
    id: "feu",
    title: "La pierre de lave",
    text: "Une cuisson signature sur roche volcanique : elle saisit les chairs, concentre les sucs et signe chaque assiette.",
    image: "lava",
  },
  {
    id: "terre",
    title: "Les produits de la terre",
    text: "Légumes du soleil, herbes fraîches et huile d'olive, cueillis au rythme des marchés de Provence.",
    image: "produce",
  },
  {
    id: "grillades",
    title: "Les grillades",
    text: "Viandes et poissons passés au feu, travaillés sans artifice pour laisser parler le produit.",
    image: "meat",
  },
  {
    id: "partage",
    title: "Le partage",
    text: "Des assiettes généreuses pensées pour le milieu de table, comme on aime manger à Marseille.",
    image: "interior",
  },
  {
    id: "port",
    title: "Le Vieux-Port",
    text: "214 Quai du Port : les bateaux, la lumière, la ville. Le décor fait partie de la table.",
    image: "vieuxport",
  },
] as const;

/* ---- La cuisine : trois mouvements -------------------------- */
export const cuisineRows = [
  {
    index: "01",
    title: "La mer",
    text: "Les poissons arrivent entiers, les coquillages s'ouvrent à la minute et les crustacés sont choisis du matin. La Méditerranée dicte la carte — jamais l'inverse.",
    tags: ["Pêche du jour", "Coquillages", "Crustacés"],
    image: "fish",
  },
  {
    index: "02",
    title: "La terre",
    text: "Légumes du marché, huile d'olive et herbes de Provence accompagnent des viandes choisies pour leur caractère. Le terroir provençal, dans ce qu'il a de plus sincère.",
    tags: ["Viandes grillées", "Légumes du marché", "Huile d'olive"],
    image: "meat",
  },
  {
    index: "03",
    title: "Le feu",
    text: "La pierre de lave saisit viandes et poissons à cœur, sans les brusquer. Il en sort des cuissons nettes, légèrement fumées, généreuses — la signature de la maison.",
    tags: ["Pierre de lave", "Grillades", "Générosité"],
    image: "lava",
  },
] as const;

/* ---- Galerie éditoriale ------------------------------------- */
export const galleryItems = [
  { image: "hero", caption: "Le Vieux-Port, à l'heure dorée", size: "large" },
  { image: "lava", caption: "Cuisson sur pierre de lave", size: "tall" },
  { image: "seafood", caption: "Le plateau de la mer", size: "small" },
  { image: "interior", caption: "La salle, côté lumière", size: "small" },
  { image: "fish", caption: "Poisson du jour, grillé entier", size: "wide" },
  { image: "produce", caption: "Les produits de la terre", size: "small" },
  { image: "vieuxport", caption: "Matin sur le Vieux-Port", size: "wide" },
  { image: "meat", caption: "La viande au feu", size: "small" },
  { image: "terrace", caption: "L'apéritif, côté quai", size: "wide" },
] as const;

export type ImageKey = keyof typeof restaurant.images;
