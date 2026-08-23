import { Product, Collection } from "../types";

export const products: Product[] = [
  {
    id: "amy-deluxe-iridescent",
    name: "AMY Deluxe Iridescent",
    slug: "amy-deluxe-iridescent",
    category: "hookahs",
    price: 189.00,
    shortDescription: "Une chicha aux reflets néons et métalliques.",
    description: "La AMY Deluxe Iridescent est un véritable chef-d'œuvre visuel. Ses reflets métalliques changent selon l'angle de vue, offrant un spectacle hypnotique complété par un tirage parfaitement calibré.",
    stock: 12,
    images: [
      "/images/products/hookahs/amy-01.png",
      "/images/products/hookahs/amy-02.png",
      "/images/products/hookahs/amy-03.jpg"
    ],
    specifications: {
      materials: "Acier inoxydable anodisé, Verre épais",
      dimensions: "65 cm (hauteur)",
      weight: "3.2 kg"
    },
    featured: true,
    collection: "the-night-collection",
    rating: 4.9
  },
  {
    id: "kaya-blue",
    name: "KAYA Blue Edition",
    slug: "kaya-blue",
    category: "hookahs",
    price: 249.00,
    shortDescription: "Chicha moderne avec un vase en verre texturé bleu profond.",
    description: "La KAYA Blue Edition séduit par l'intensité de son bleu et le travail de texture sur son vase en verre. Robuste, elle est idéale pour une session luxueuse et apaisante.",
    stock: 3,
    images: [
      "/images/products/hookahs/kaya-01.png",
      "/images/products/hookahs/kaya-02.png",
      "/images/products/hookahs/kaya-03.png"
    ],
    specifications: {
      materials: "Acier inoxydable, Verre sculpté",
      dimensions: "58 cm (hauteur)",
      weight: "2.8 kg"
    },
    featured: true,
    collection: "the-signature-collection",
    rating: 5.0
  },
  {
    id: "lara-series",
    name: "LARA Series",
    slug: "lara-series",
    category: "hookahs",
    price: 159.00,
    shortDescription: "Design mat et luxueux avec des vases texturés ou striés.",
    description: "La gamme LARA mise sur le minimalisme et l'élégance du noir mat. Parfaite pour ceux qui recherchent un setup sobre mais qui ne passe pas inaperçu grâce à ses détails travaillés.",
    stock: 8,
    images: [
      "/images/products/hookahs/lara-01.png",
      "/images/products/hookahs/lara-02.png",
      "/images/products/hookahs/lara-03.png"
    ],
    specifications: {
      materials: "Aluminium mat, Verre soufflé",
      dimensions: "50 cm (hauteur)",
      weight: "2.5 kg"
    },
    featured: false,
    collection: "the-black-collection"
  },
  {
    id: "geometry-steel",
    name: "Geometry Steel",
    slug: "geometry-steel",
    category: "hookahs",
    price: 199.00,
    shortDescription: "Mélange de minimalisme acier et de tradition.",
    description: "La Geometry Steel est l'essence même de la chicha robuste et intemporelle. Entièrement en acier inoxydable de haute qualité, elle garantit une durabilité extrême et un tirage authentique.",
    stock: 15,
    images: [
      "/images/products/hookahs/geometry-01.jpg",
      "/images/products/hookahs/geometry-02.jpg",
      "/images/products/hookahs/geometry-03.jpg"
    ],
    specifications: {
      materials: "Acier inoxydable 304, Laiton (version traditionnelle)",
      dimensions: "60 cm (hauteur)",
      weight: "3.5 kg"
    },
    featured: true,
    collection: "the-signature-collection",
    rating: 4.8
  },
  {
    id: "porsche-design-hookah",
    name: "Chicha Porsche Design",
    slug: "porsche-design-hookah",
    category: "hookahs",
    price: 189.00,
    shortDescription: "Chicha Porsche Design aux lignes élancées, en finition noire ou argentée.",
    description: "Cette chicha Porsche Design se distingue par une colonne très fine et élancée, un vase conique fumé et un tuyau noir. Les visuels présentent les finitions noire et argentée, ainsi que les raccords de tuyau positionnés au bas de la colonne.",
    stock: 10,
    images: [
      "/images/products/hookahs/porsche-design-01.png",
      "/images/products/hookahs/porsche-design-02.png",
      "/images/products/hookahs/porsche-design-03.png"
    ],
    specifications: {
      brand: "Porsche Design",
      materials: "Finitions noires ou argentées, vase fumé"
    },
    featured: false
  },
  {
    id: "marble-hookah-collection",
    name: "Chicha Marbre",
    slug: "marble-hookah-collection",
    category: "hookahs",
    price: 249.00,
    shortDescription: "Sélection de chichas aux détails bois, métal et vase transparent.",
    description: "La sélection Chicha Marbre rassemble des modèles aux silhouettes marquées : un corps à motif bois sombre avec vase facetté, un modèle traditionnel aux détails bronze, et un modèle bleu à colonne spiralée. Chaque visuel met en avant un vase transparent et un plateau métallique.",
    stock: 10,
    images: [
      "/images/products/hookahs/marbre-01.jpeg",
      "/images/products/hookahs/marbre -02.jpeg",
      "/images/products/hookahs/marbre-03.jpg"
    ],
    specifications: {
      materials: "Bois, métal et verre selon le modèle"
    },
    featured: false
  },
  {
    id: "seven-hookah-bowl",
    name: "Foyer Seven Hookah",
    slug: "seven-hookah-bowl",
    category: "accessories",
    price: 45.00,
    shortDescription: "Foyer Seven Hookah en céramique, décliné en plusieurs coloris.",
    description: "Le foyer Seven Hookah présente une forme évasée et une finition céramique lisse. Les cinq visuels montrent ses différentes déclinaisons de couleur, avec un liseré contrasté autour de la base et du bord.",
    stock: 45,
    images: [
      "/images/products/accessories/seven-01.png",
      "/images/products/accessories/seven-02.png",
      "/images/products/accessories/seven-03.png",
      "/images/products/accessories/seven-04.png",
      "/images/products/accessories/seven-05.png"
    ],
    specifications: {
      brand: "Seven Hookah",
      materials: "Céramique"
    },
    featured: false
  },
  {
    id: "cosmobowl-a-shot",
    name: "Foyer Cosmobowl A-Shot",
    slug: "cosmobowl-a-shot",
    category: "accessories",
    price: 25.00,
    shortDescription: "Foyer Cosmobowl A-Shot à corps texturé et conduit central apparent.",
    description: "Le Cosmobowl A-Shot associe un bord supérieur lisse marqué Cosmobowl à un corps cylindrique fortement texturé. Les visuels montrent également son conduit central et une finition bicolore sombre, aux reflets brun cuivré.",
    stock: 80,
    images: [
      "/images/products/accessories/cosmobowl-a-shot-01.jpeg",
      "/images/products/accessories/cosmobowl-a-shot-02.jpeg",
      "/images/products/accessories/cosmobowl-a-shot-03.jpeg"
    ],
    specifications: {
      brand: "Cosmobowl",
      materials: "Céramique texturée"
    },
    featured: false
  },
  {
    id: "al-fakher-mint",
    name: "Al Fakher Mint",
    slug: "al-fakher-mint",
    category: "flavors",
    price: 18.00,
    shortDescription: "Menthe fraîche et glaciale par la marque Al Fakher.",
    description: "Classique incontournable, Al Fakher Mint délivre une fraîcheur intense et pure à chaque bouffée. Le goût mentholé puissant est idéal seul ou en mélange pour rafraîchir n'importe quelle session.",
    stock: 120,
    images: [
      "/images/products/flavors/mint-01-v3.png",
      "/images/products/flavors/mint-02-v2.png"
    ],
    specifications: {
      brand: "Al Fakher",
      origin: "Émirats Arabes Unis",
      weight: "200g"
    },
    featured: false
  },
  {
    id: "tropical-punch",
    name: "True Flavor Tropical Punch",
    slug: "tropical-punch",
    category: "flavors",
    price: 22.00,
    shortDescription: "Mélange tropical exotique : ananas, mangue, passion et goyave.",
    description: "Un voyage tropical en une seule bouffée. True Flavor Tropical Punch est un mélange premium de fruits exotiques (ananas, mangue, fruit de la passion, goyave) pour une session sucrée, intense et rafraîchissante.",
    stock: 85,
    images: [
      "/images/products/flavors/tropical-01.png",
      "/images/products/flavors/tropical-02-v2.png"
    ],
    specifications: {
      brand: "True Flavor",
      origin: "Premium Shisha Tobacco",
      weight: "250g"
    },
    featured: true
  },
  {
    id: "premium-cubes-26",
    name: "Charbon Cocobrico 25 mm",
    slug: "premium-cubes-26",
    category: "charcoal",
    price: 8.50,
    shortDescription: "Charbon de coco naturel Cocobrico en cubes de 25 mm, format 1 kg.",
    description: "Cocobrico est un charbon de coco premium pour chicha, composé de cubes de 25 mm. Le packaging indique une composition 100 % naturelle, une chaleur élevée, peu de cendres et une combustion longue durée.",
    stock: 250,
    images: [
      "/images/products/charcoal/cocobrico-01.png",
      "/images/products/charcoal/cocobrico-02.png"
    ],
    specifications: {
      brand: "Cocobrico",
      materials: "Charbon de coco naturel",
      dimensions: "Cubes de 25 mm",
      weight: "1 kg"
    },
    featured: false
  },
  {
    id: "premium-cubes-27",
    name: "Charbon Tropical Premium",
    slug: "premium-cubes-27",
    category: "charcoal",
    price: 9.50,
    shortDescription: "Charbon de coco premium Tropical, naturel et conditionné en 1 kg.",
    description: "Tropical Premium Coconut Charcoal est un charbon de coco 100 % naturel. Son emballage met en avant une combustion régulière et longue durée, une chaleur élevée et une faible quantité de cendres.",
    stock: 150,
    images: [
      "/images/products/charcoal/tropical-01.png",
      "/images/products/charcoal/tropical-02.png"
    ],
    specifications: {
      brand: "Tropical",
      materials: "Charbon de coco naturel",
      weight: "1 kg"
    },
    featured: false
  },
];

export const collections: Collection[] = [
  {
    id: "the-black-collection",
    name: "The Black Collection",
    slug: "the-black-collection",
    description: "L'élégance du noir absolu. Une série de produits taillés pour l'ombre, aux finitions mates incomparables.",
    image: "/images/collections/black-collection-v2.png"
  },
  {
    id: "the-signature-collection",
    name: "The Signature Collection",
    slug: "the-signature-collection",
    description: "L'expression ultime de notre savoir-faire. Matériaux nobles, éditions limitées et design avant-gardiste.",
    image: "/images/collections/signature-collection-v2.png"
  },
  {
    id: "the-night-collection",
    name: "The Night Collection",
    slug: "the-night-collection",
    description: "Inspirée par la vie nocturne, cette collection fusionne verre fumé et lignes pures pour sublimer vos soirées.",
    image: "/images/collections/night-collection-v2.png"
  }
];
