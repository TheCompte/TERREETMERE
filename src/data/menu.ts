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
  image?: string;
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
        category: "entrees",
      },
      {
        id: "sardines-lava",
        name: "Grilled sardines on lava stone",
        price: 13.5,
        category: "entrees",
      },
      {
        id: "octopus-carpaccio",
        name: "Octopus Carpaccio",
        price: 16.5,
        category: "entrees",
      },
      {
        id: "burrata-tomatoes",
        name: "Sun-dried tomatoes, burrata with basil",
        price: 13.5,
        category: "entrees",
      },
    ],
  },
  {
    id: "salads",
    name: "Our Meal Salads",
    items: [
      {
        id: "sunny-veggie",
        name: "Sunny Veggie Salad",
        price: 20.0,
        description: "Salad, tomatoes, burrata, red onions, tapenade and croutons, sun-dried tomatoes, melon and watermelon & basil",
        category: "salads",
      },
      {
        id: "caesar",
        name: "Caesar Salad",
        price: 19.0,
        description: "Salad, chicken, parmesan cheese, sun-dried tomatoes, fresh tomatoes, tapenade on toast, red onion, Caesar dressing, basil",
        category: "salads",
      },
      {
        id: "pearl-south",
        name: "Pearl of the South in Porto",
        price: 22.0,
        description: "Melon, port wine, tomato salad, red onion, burrata, cured ham, sun-dried tomatoes, pesto sauce",
        category: "salads",
      },
      {
        id: "fisherman-salad",
        name: "Fisherman's Salad",
        price: 20.0,
        description: "Gratinated mussels, clams, prawns, octopus & salad",
        category: "salads",
      },
    ],
  },
  {
    id: "meats",
    name: "Our Meats",
    items: [
      {
        id: "land-sea-tartare",
        name: "Land & Sea Tartare",
        price: 19.5,
        description: "Beef tartare with tapenade, tomatoes, basil, parmesan shavings, homemade fries",
        category: "meats",
      },
      {
        id: "land-sea-carpaccio",
        name: "Land and Sea Carpaccio",
        price: 18.0,
        description: "Served with homemade fries",
        category: "meats",
      },
      {
        id: "lamb-shanks",
        name: "Lamb shanks (500g)",
        price: 32.0,
        description: "Rosemary confit with mashed potatoes",
        category: "meats",
      },
      {
        id: "beef-ribeye",
        name: "Beef Ribeye Steak (260g)",
        price: 28.0,
        description: "Grilled on lava stone with a forest mushroom sauce, to the crushed potato",
        category: "meats",
      },
      {
        id: "rib-of-beef",
        name: "Rib of Beef (over 500g)",
        price: 37.0,
        description: "Grilled on lava stone with a forest mushroom sauce, to the crushed potato",
        category: "meats",
      },
      {
        id: "duck-breast",
        name: "Duck breast",
        price: 24.0,
        description: "Honey sauce, homemade fries and salad",
        category: "meats",
      },
    ],
  },
  {
    id: "menu",
    name: "Menu",
    items: [
      {
        id: "porcini-risotto",
        name: "Porcini/Boletus Mushroom Risotto",
        price: 20.0,
        category: "menu",
      },
      {
        id: "octopus-burger",
        name: "T&M Octopus Burger",
        price: 23.5,
        description: "Octopus, tapenade, sun-dried tomatoes, vegetables, caramelized onion, cheddar.",
        category: "menu",
      },
      {
        id: "lamb-burger",
        name: "Rosemary lamb shank burger",
        price: 23.5,
        description: "Lamb shanks with rosemary and caramelized onions, tomatoes, cheddar & salad.",
        category: "menu",
      },
      {
        id: "sea-plateau",
        name: "The Sea Plateau",
        price: 75.0,
        description: "Grilled octopus cooked on lava stone, clams, mussels, prawns, squid on tapenade toast, tomatoes, panisses provençale, trio of peppers, sauce of your choice and parsley.",
        category: "menu",
      },
    ],
  },
  {
    id: "seafood-1",
    name: "Our Seafood Products",
    items: [
      {
        id: "swordfish",
        name: "Swordfish Steak (200g)",
        price: 25.5,
        description: "With its Yakitory sauce, black rice & vegetables.",
        category: "seafood-1",
      },
      {
        id: "good-sea",
        name: "The Good Sea Stir-fry",
        price: 21.0,
        description: "Squid with two breadcrumbs, grilled prawns on lava stone, mussels, clams, with homemade fries and salad.",
        category: "seafood-1",
      },
      {
        id: "mussels-roquefort",
        name: "Mussels with Roquefort cheese",
        price: 19.5,
        category: "seafood-1",
      },
      {
        id: "mussels-mariniere",
        name: "Mussels Marinière",
        price: 19.5,
        category: "seafood-1",
      },
    ],
  },
  {
    id: "seafood-2",
    name: "Our Seafood Products",
    items: [
      {
        id: "prawns-pastis",
        name: "Prawns flambéed with Pastis",
        price: 24.0,
        description: "Served with black rice and vegetables.",
        category: "seafood-2",
      },
      {
        id: "tuna-tartare",
        name: "Tuna tartare with avocado puree",
        price: 27.0,
        description: "With homemade fries.",
        category: "seafood-2",
      },
      {
        id: "sea-bass",
        name: "Whole sea bass with dill sauce",
        price: 26.5,
        description: "Black rice and vegetables.",
        category: "seafood-2",
      },
      {
        id: "fisherman-plate",
        name: "The Fisherman's Plate and its Rust",
        price: 32.0,
        description: "Red mullet fillet, cod, prawns, mussels, clams, potato, carrot.",
        category: "seafood-2",
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
