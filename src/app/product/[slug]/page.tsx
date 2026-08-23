import { Metadata } from "next";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/products/ProductPageClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Produit non trouvé" };
  return {
    title: `${product.name} | Smoke House`,
    description: product.shortDescription,
  };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductPageClient slug={slug} />;
}
