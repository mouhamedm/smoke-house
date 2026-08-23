export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "hookahs" | "flavors" | "accessories" | "charcoal" | "collections";
  price: number;
  description: string;
  shortDescription: string;
  stock: number;
  images: string[];
  specifications: {
    brand?: string;
    materials?: string;
    dimensions?: string;
    weight?: string;
    origin?: string;
  };
  featured: boolean;
  collection?: string;
  rating?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}
