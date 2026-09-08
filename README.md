# Terre & Mer - Site Web Premium

## 🎯 Résumé du projet

Site web premium pour le restaurant **Terre & Mer** situé au 214 Quai du Port, 13002 Marseille.

**Identité visuelle** : Méditerranéenne contemporaine, élégante et chaleureuse
**Palette** : Bleu marine profond, ivoire, champagne, terracotta
**Typographie** : Fraunces (titres) + Archivo (texte)

---

## 📋 Fonctionnalités implémentées

### ✅ Navigation
- Menu sticky avec scroll-spy
- Menu mobile hamburger avec animations
- Navigation fluide vers toutes les sections
- Bouton "Réserver" toujours accessible

### ✅ Sections
1. **Hero** - Image plein écran du Vieux-Port avec CTA
2. **Bandeau de confiance** - Note 4.9/5 (96 avis Google)
3. **Entre Terre & Mer** - 6 chapitres interactifs
4. **La cuisine** - 3 mouvements éditoriaux (mer/terre/feu)
5. **La carte** - Lien vers menu WiicMenu
6. **Galerie** - Mosaïque asymétrique avec lightbox
7. **Le restaurant** - Histoire + plan SVG du Vieux-Port
8. **Avis** - Section témoignages
9. **Réservation** - Formulaire complet intégré
10. **Footer** - Informations complètes

### ✅ Formulaire de réservation
- Date (sélecteur natif)
- Heure (créneaux configurables)
- Nombre de convives (1-12)
- Nom, prénom, téléphone, email
- Message optionnel
- Validation complète
- Mode démo avec confirmation simulée
- Architecture prête pour backend réel

### ✅ Galerie interactive
- Lightbox plein écran
- Navigation clavier (←/→/Échap)
- Swipe tactile mobile
- Compteur d'images

### ✅ Responsive
- Mobile-first
- Breakpoints : 640px, 768px, 1024px, 1280px
- Menu mobile dédié
- CTA fixe en bas sur mobile

---

## 🔗 Liens configurés

| Élément | URL | Statut |
|---------|-----|--------|
| **Menu** | https://wiicmenu-qrcode.com/app/index.php?r=3557&c=67925 | ✅ Actif |
| **Téléphone** | tel:+33496176058 | ✅ Actif |
| **Google Maps** | https://www.google.com/maps/search/?api=1&query=214%20Quai%20du%20Port%2013002%20Marseille | ✅ Actif |
| **Réservation** | Formulaire interne (#contact) | ✅ Actif |

---

## 📁 Architecture du code

```
src/
├── components/
│   ├── Nav.tsx                    # Navigation sticky
│   ├── Hero.tsx                   # Section hero
│   ├── TrustBand.tsx              # Note Google
│   ├── Experience.tsx             # 6 chapitres interactifs
│   ├── Cuisine.tsx                # 3 mouvements
│   ├── CarteSection.tsx           # Lien menu
│   ├── Gallery.tsx                # Galerie + lightbox
│   ├── RestaurantSection.tsx      # Histoire + plan SVG
│   ├── ReviewsSection.tsx         # Avis clients
│   ├── ReservationSection.tsx     # Section réservation
│   ├── ReservationForm.tsx        # Formulaire
│   ├── Footer.tsx                 # Pied de page
│   └── ui.tsx                     # Composants réutilisables
├── data/
│   └── restaurant.ts              # Configuration centrale
├── services/
│   └── reservationService.ts      # Service réservation (démo)
├── types/
│   └── reservation.ts             # Types TypeScript
├── App.tsx                        # Composant racine
└── main.tsx                       # Point d'entrée
```

---

## ⚙️ Configuration

### Fichier principal : `src/data/restaurant.ts`

```typescript
export const restaurant = {
  name: "Terre & Mer",
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
  links: {
    menuUrl: "https://wiicmenu-qrcode.com/app/index.php?r=3557&c=67925",
    reservationUrl: "", // Vide = formulaire interne
    googleReviewsUrl: "",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=214%20Quai%20du%20Port%2013002%20Marseille",
  reservation: {
    enabled: true,
    mode: "demo", // "demo" ou "live"
    times: ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
    maxGuests: 12,
  },
  images: {
    // 9 images configurables
  },
};
```

---

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

Le site est généré dans `dist/` et peut être déployé sur :
- Netlify
- Vercel
- GitHub Pages
- Tout serveur statique

### Développement local
```bash
npm run dev
```

---

## 📱 Tests effectués

- ✅ Navigation desktop (scroll-spy, sticky)
- ✅ Navigation mobile (hamburger, drawer)
- ✅ Formulaire de réservation (validation, soumission)
- ✅ Galerie (lightbox, clavier, swipe)
- ✅ Liens externes (menu, maps, téléphone)
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Performance (build optimisé)
- ✅ Accessibilité (ARIA, contrastes, navigation clavier)

---

## 🎨 Personnalisation

### Changer les images
Modifier `restaurant.images` dans `src/data/restaurant.ts`

### Modifier les créneaux de réservation
Modifier `restaurant.reservation.times` dans `src/data/restaurant.ts`

### Connecter un vrai backend
1. Créer une API REST
2. Modifier `src/services/reservationService.ts`
3. Changer `restaurant.reservation.mode` en `"live"`

### Ajouter une URL de réservation externe
Remplir `restaurant.links.reservationUrl` dans `src/data/restaurant.ts`

---

## 📊 Performance

- **HTML** : 3.32 kB (gzip: 1.44 kB)
- **CSS** : 56.66 kB (gzip: 10.05 kB)
- **JS** : 215.79 kB (gzip: 63.59 kB)
- **Temps de build** : ~2.6s
- **Score Lighthouse** : À mesurer après déploiement

---

## 🔒 Sécurité

- ✅ Aucun mot interdit dans le code
- ✅ Liens externes avec `rel="noopener noreferrer"`
- ✅ Validation côté client du formulaire
- ✅ Pas de données sensibles en dur
- ✅ URLs configurables (pas de hardcoded)

---

## 📞 Support

Pour toute question ou modification :
- Téléphone : 04 96 17 60 58
- Adresse : 214 Quai du Port, 13002 Marseille

---

**Développé avec** : React 18 + TypeScript + Vite + Tailwind CSS v4
