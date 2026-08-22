import { Product, Collection } from "../types";

export const products: Product[] = [
  {
    id: "onyx-hookah",
    name: "Onyx",
    slug: "onyx-hookah",
    category: "hookahs",
    price: 189.00,
    shortDescription: "Notre chicha signature, taillée dans un bloc noir mat profond.",
    description: "L'Onyx représente l'apogée de notre savoir-faire. Conçue avec un alliage d'aluminium aérospatial et un vase en verre soufflé à la main, elle offre une fluidité de tirage inégalée. Son esthétique sombre et monolithique s'intègre parfaitement dans les intérieurs contemporains.",
    stock: 12,
    images: [
      "/images/products/hookahs/onyx-01.png",
      "/images/products/hookahs/onyx-02.png",
      "/images/products/hookahs/onyx-03.png",
      "/images/products/hookahs/onyx-04.png"
    ],
    specifications: {
      materials: "Aluminium aérospatial, Verre borosilicate, Silicone",
      dimensions: "65 cm (hauteur)",
      weight: "3.2 kg"
    },
    featured: true,
    collection: "the-black-collection",
    rating: 4.9
  },
  {
    id: "phantom-hookah",
    name: "Phantom",
    slug: "phantom-hookah",
    category: "hookahs",
    price: 249.00,
    shortDescription: "Édition limitée avec finitions en carbone véritable.",
    description: "La Phantom est une pièce d'exception. Son corps intègre de véritables fibres de carbone, offrant à la fois une légèreté surprenante et une robustesse absolue. Le plongeur ajustable permet de personnaliser le tirage avec une précision millimétrée.",
    stock: 3,
    images: [
      "/images/products/hookahs/phantom-01.png",
      "/images/products/hookahs/phantom-02.png",
      "/images/products/hookahs/phantom-03.png"
    ],
    specifications: {
      materials: "Fibre de carbone, Acier inoxydable 304, Verre fumé",
      dimensions: "58 cm (hauteur)",
      weight: "2.8 kg"
    },
    featured: true,
    collection: "the-signature-collection",
    rating: 5.0
  },
  {
    id: "eclipse-hookah",
    name: "Eclipse",
    slug: "eclipse-hookah",
    category: "hookahs",
    price: 159.00,
    shortDescription: "Design minimaliste et performances optimales.",
    description: "L'Eclipse se distingue par son vase asymétrique et sa purge invisible. L'air s'échappe de manière circulaire autour de la base, créant un effet visuel hypnotique lors de la purge. Une merveille d'ingénierie moderne.",
    stock: 0,
    images: [
      "/images/products/hookahs/eclipse-01.png",
      "/images/products/hookahs/eclipse-02.png",
      "/images/products/hookahs/eclipse-03.png"
    ],
    specifications: {
      materials: "Acier inoxydable, Verre",
      dimensions: "50 cm (hauteur)",
      weight: "2.5 kg"
    },
    featured: false,
    collection: "the-night-collection"
  },
  {
    id: "obsidian-hose",
    name: "Tuyau Obsidian",
    slug: "obsidian-hose",
    category: "accessories",
    price: 45.00,
    shortDescription: "Tuyau en silicone soft-touch avec manche en carbone.",
    description: "Améliorez votre expérience avec le tuyau Obsidian. Son silicone de qualité médicale ne retient aucune odeur, et son manche ergonomique offre une prise en main luxueuse.",
    stock: 45,
    images: [
      "/images/products/accessories/obsidian-hose-01.png",
      "/images/products/accessories/obsidian-hose-02.png",
      "/images/products/accessories/obsidian-hose-03.png"
    ],
    specifications: {
      materials: "Silicone grade médical, Carbone, Aluminium",
      dimensions: "150 cm (longueur totale)"
    },
    featured: false
  },
  {
    id: "premium-tongs",
    name: "Pince Premium",
    slug: "premium-tongs",
    category: "accessories",
    price: 25.00,
    shortDescription: "Pince de précision au design épuré.",
    description: "La manipulation des charbons devient un art. Notre pince Premium est conçue pour offrir un contrôle total avec une force de préhension optimale, tout en gardant une esthétique tranchante.",
    stock: 80,
    images: [
      "/images/products/accessories/tongs-01.png",
      "/images/products/accessories/tongs-02.png",
      "/images/products/accessories/tongs-03.png"
    ],
    specifications: {
      materials: "Acier inoxydable revêtu de titane"
    },
    featured: false
  },
  {
    id: "heat-manager-pro",
    name: "Système de Chauffe Pro",
    slug: "heat-manager-pro",
    category: "accessories",
    price: 55.00,
    shortDescription: "Contrôle thermique parfait pour une session prolongée.",
    description: "Usiné dans la masse, ce système de chauffe répartit la chaleur de manière homogène. Fini les sessions brûlées, profitez de toute la subtilité de vos saveurs.",
    stock: 22,
    images: [
      "/images/products/accessories/hmd-01.png",
      "/images/products/accessories/hmd-02.png",
      "/images/products/accessories/hmd-03.png"
    ],
    specifications: {
      materials: "Aluminium de grade aérospatial"
    },
    featured: true
  },
  {
    id: "midnight-mint",
    name: "Midnight Mint",
    slug: "midnight-mint",
    category: "flavors",
    price: 18.00,
    shortDescription: "Menthe glaciale avec des notes subtiles d'eucalyptus.",
    description: "Une fraîcheur absolue. Midnight Mint est notre saveur la plus intense, conçue pour réveiller les sens sans être agressive. Parfaite seule ou en mix.",
    stock: 120,
    images: [
      "/images/products/flavors/mint-01.png",
      "/images/products/flavors/mint-02.png",
      "/images/products/flavors/mint-03.png"
    ],
    specifications: {
      origin: "France",
      weight: "200g"
    },
    featured: false
  },
  {
    id: "ruby-grape",
    name: "Ruby Grape",
    slug: "ruby-grape",
    category: "flavors",
    price: 18.00,
    shortDescription: "Raisin noir intense et juteux.",
    description: "L'essence même du raisin rouge et noir. Une saveur sucrée, profonde et persistante qui reste constante du début à la fin de votre session.",
    stock: 85,
    images: [
      "/images/products/flavors/grape-01.png",
      "/images/products/flavors/grape-02.png",
      "/images/products/flavors/grape-03.png"
    ],
    specifications: {
      origin: "France",
      weight: "200g"
    },
    featured: true
  },
  {
    id: "sahara-peach",
    name: "Sahara Peach",
    slug: "sahara-peach",
    category: "flavors",
    price: 18.00,
    shortDescription: "Pêche mûre, sucrée avec une touche épicée.",
    description: "Une évasion sensorielle. Sahara Peach combine la douceur de la pêche avec des notes très subtiles de cannelle et d'épices chaudes.",
    stock: 40,
    images: [
      "/images/products/flavors/peach-01.png",
      "/images/products/flavors/peach-02.png",
      "/images/products/flavors/peach-03.png"
    ],
    specifications: {
      origin: "France",
      weight: "200g"
    },
    featured: false
  },
  {
    id: "premium-cubes-26",
    name: "Charbon Cubes 26mm",
    slug: "premium-cubes-26",
    category: "charcoal",
    price: 8.50,
    shortDescription: "Charbon naturel de coco, chauffe puissante et longue durée.",
    description: "Nos charbons de 26mm garantissent jusqu'à 2 heures de chauffe intense sans altérer le goût. Moins de 2% de cendres pour une session propre.",
    stock: 250,
    images: [
      "/images/products/charcoal/cubes26-01.png",
      "/images/products/charcoal/cubes26-02.png",
      "/images/products/charcoal/cubes26-03.png"
    ],
    specifications: {
      origin: "Indonésie",
      weight: "1kg (64 cubes)"
    },
    featured: false
  },
  {
    id: "premium-cubes-27",
    name: "Charbon Cubes 27mm XXL",
    slug: "premium-cubes-27",
    category: "charcoal",
    price: 9.50,
    shortDescription: "Charbon de coco taille XXL pour systèmes de chauffe ouverts.",
    description: "Parfait pour les fumeurs exigeants utilisant du papier aluminium ou des provosts. Une chaleur monstrueuse et une durée de vie incomparable.",
    stock: 150,
    images: [
      "/images/products/charcoal/cubes27-01.png",
      "/images/products/charcoal/cubes27-02.png",
      "/images/products/charcoal/cubes27-03.png"
    ],
    specifications: {
      origin: "Indonésie",
      weight: "1kg (54 cubes)"
    },
    featured: false
  },
  {
    id: "luminous-base",
    name: "Base Lumineuse LED",
    slug: "luminous-base",
    category: "accessories",
    price: 35.00,
    shortDescription: "Base LED premium pour illuminer vos vases.",
    description: "Contrôlez l'atmosphère de votre session avec notre base LED télécommandée. S'adapte parfaitement sous la plupart de nos modèles pour mettre en valeur les tourbillons de fumée dans l'eau.",
    stock: 18,
    images: [
      "/images/products/accessories/led-01.png",
      "/images/products/accessories/led-02.png",
      "/images/products/accessories/led-03.png"
    ],
    specifications: {
      dimensions: "20 cm (diamètre)"
    },
    featured: false
  }
];

export const collections: Collection[] = [
  {
    id: "the-black-collection",
    name: "The Black Collection",
    slug: "the-black-collection",
    description: "L'élégance du noir absolu. Une série de produits taillés pour l'ombre, aux finitions mates incomparables.",
    image: "/images/collections/black-collection.png"
  },
  {
    id: "the-signature-collection",
    name: "The Signature Collection",
    slug: "the-signature-collection",
    description: "L'expression ultime de notre savoir-faire. Matériaux nobles, éditions limitées et design avant-gardiste.",
    image: "/images/collections/signature-collection.png"
  },
  {
    id: "the-night-collection",
    name: "The Night Collection",
    slug: "the-night-collection",
    description: "Inspirée par la vie nocturne, cette collection fusionne verre fumé et lignes pures pour sublimer vos soirées.",
    image: "/images/collections/night-collection.png"
  }
];
