/**
 * Données de la carte Terre & Mer
 * 
 * Cette structure permet d'ajouter facilement de nouveaux plats
 * et catégories dans le futur.
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "entrees",
    name: "Entrées",
    items: [
      {
        id: "panisses-tapenade",
        name: "Plate of panisses and tapenade",
        price: 9.0,
        image: "https://image.qwenlm.ai/generated-images/68ee20dc-319a-4fb8-a196-a914ae169549/_result.png",
        category: "entrees",
      },
      {
        id: "sardines-lava",
        name: "Grilled sardines on lava stone",
        price: 13.5,
        image: "https://image.qwenlm.ai/generated-images/b865d569-cbd1-4167-8c42-f7141cce8b86/_result.png",
        category: "entrees",
      },
      {
        id: "octopus-carpaccio",
        name: "Octopus Carpaccio",
        price: 16.5,
        image: "https://image.qwenlm.ai/generated-images/7cee2527-7cef-4bf0-b3c9-13c55fa1bb1a/_result.png",
        category: "entrees",
      },
      {
        id: "burrata-tomatoes",
        name: "Sun-dried tomatoes, burrata with basil",
        price: 13.5,
        image: "https://image.qwenlm.ai/generated-images/d8d62902-3f7c-4cc1-9725-a5b9defc1ad1/_result.png",
        category: "entrees",
      },
    ],
  },
];

/**
 * Récupère tous les plats de la carte
 */
export function getAllMenuItems(): MenuItem[] {
  return menuData.flatMap((category) => category.items);
}

/**
 * Récupère un plat par son ID
 */
export function getMenuItemById(id: string): MenuItem | undefined {
  return getAllMenuItems().find((item) => item.id === id);
}
