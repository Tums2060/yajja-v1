export type Category = {
  id: string;
  label: string;
  key: string;
  description: string;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  items: MenuItem[];
};

export const categories: Category[] = [
  {
    id: 'food',
    label: 'Food-Yajja',
    key: 'food',
    description: 'Meals and artisan kitchens',
  },
  {
    id: 'liquor',
    label: 'Liquor-Yajja',
    key: 'liquor',
    description: 'Wine, spirits, and bar bites',
  },
  {
    id: 'go',
    label: 'Yajja-Go',
    key: 'go',
    description: 'Convenience essentials',
  },
  {
    id: 'care',
    label: 'Yajja-Care',
    key: 'care',
    description: 'Health and wellness',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: 'artisan-bakery',
    name: 'Artisan Bakery & Bistro',
    description: 'Fresh baked sourdoughs and brunch favorites.',
    category: 'food',
    imageUrl:
      'https://images.unsplash.com/photo-1481923387198-050ac1f5a5d4?auto=format&fit=crop&w=900&q=80',
    items: [
      {
        id: 'avocado-sourdough',
        name: 'Avocado Sourdough',
        price: 14.5,
        description: 'Toasted sourdough, whipped feta, and herbs.',
        imageUrl:
          'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'pain-au-chocolat',
        name: 'Pain au Chocolat',
        price: 6,
        description: 'Butter layered pastry with dark chocolate.',
        imageUrl:
          'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f5c8?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'iced-oat-latte',
        name: 'Iced Oat Latte',
        price: 5.5,
        description: 'Double espresso, oat milk, vanilla cold foam.',
        imageUrl:
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'sunset-grill',
    name: 'Sunset Grill House',
    description: 'Smoky grills, slow-roasted bowls, family sides.',
    category: 'food',
    imageUrl:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
    items: [
      {
        id: 'bbq-rice-bowl',
        name: 'Smoky BBQ Rice Bowl',
        price: 13,
        description: 'Charred chicken, sweet peppers, citrus glaze.',
        imageUrl:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'spiced-burger',
        name: 'Spiced Burger Stack',
        price: 12.5,
        description: 'Grilled beef, jalapeno aioli, crispy onions.',
        imageUrl:
          'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'midnight-cellar',
    name: 'Midnight Cellar',
    description: 'Curated cocktails and artisan pairings.',
    category: 'liquor',
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    items: [
      {
        id: 'smoked-old-fashioned',
        name: 'Smoked Old Fashioned',
        price: 18,
        description: 'Small-batch bourbon, smoked orange peel.',
        imageUrl:
          'https://images.unsplash.com/photo-1514361892635-6f07f7f4a1f3?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'citrus-mocktail',
        name: 'Citrus Garden Mocktail',
        price: 9,
        description: 'Yuzu tonic, basil syrup, sea salt rim.',
        imageUrl:
          'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'yajja-go',
    name: 'Yajja-Go Essentials',
    description: 'Daily essentials, quick bites, pantry top-ups.',
    category: 'go',
    imageUrl:
      'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=900&q=80',
    items: [
      {
        id: 'fresh-fruit-pack',
        name: 'Fresh Fruit Pack',
        price: 7.5,
        description: 'Seasonal fruit mix with chia crunch.',
        imageUrl:
          'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'sparkling-water',
        name: 'Sparkling Water',
        price: 3,
        description: 'Chilled mineral water, lemon zest.',
        imageUrl:
          'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    id: 'yajja-care',
    name: 'Yajja-Care Wellness',
    description: 'Nourishing bowls, hydration, and wellness shots.',
    category: 'care',
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    items: [
      {
        id: 'quinoa-power-bowl',
        name: 'Quinoa Power Bowl',
        price: 16,
        description: 'Roasted veg, turmeric quinoa, tahini drizzle.',
        imageUrl:
          'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 'ginger-shot',
        name: 'Ginger Citrus Shot',
        price: 5,
        description: 'Fresh pressed ginger, orange, and cayenne.',
        imageUrl:
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
];

export const customerProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
};
