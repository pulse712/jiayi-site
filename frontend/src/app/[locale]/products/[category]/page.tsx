import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  getCategoryBySlug,
  getCategories,
  getProductsByCategory,
  getStrapiImageUrl,
} from "@/lib/strapi";
import { compatStandards } from "@/lib/static-data";
import { ProductGrid } from "./ProductGrid";

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: "Products — JIAYI TOOL" };
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/products/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const [cat, { data: products }, allCategories] = await Promise.all([
    getCategoryBySlug(category),
    getProductsByCategory(category),
    getCategories(),
  ]);

  if (!cat) notFound();

  const otherCategories = allCategories.filter((c) => c.slug !== cat.slug);
  const materials = ["Carbide", "HSS-Co", "PCD", "CBN"];
  const coatings = ["TiAlN", "AlTiN", "TiCN", "Diamond CVD", "Uncoated"];

  return (
    <>
      <section className="bg-surface border-b border-border">
        <div className="container-page py-12">
          <div className="text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{cat.name}</span>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight">{cat.name}</h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">{cat.description}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          {/* Client component handles filtering */}
          <ProductGrid
            products={products.map((p) => ({
              ...p,
              imageUrl: p.image ? getStrapiImageUrl(p.image.url) : null,
              categorySlug: cat.slug,
            }))}
            standards={compatStandards}
            materials={materials}
            coatings={coatings}
            otherCategories={otherCategories.map((c) => ({
              slug: c.slug,
              name: c.name,
            }))}
          />
        </div>
      </section>
    </>
  );
}
