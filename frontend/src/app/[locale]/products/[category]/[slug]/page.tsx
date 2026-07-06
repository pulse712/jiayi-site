import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Tag, Layers, Wrench, Shield } from "lucide-react";
import {
  getProductBySlug,
  getProductsByCategory,
  getCategoryBySlug,
  getStrapiImageUrl,
} from "@/lib/strapi";
import { BlocksRenderer } from "@/components/site/BlocksRenderer";

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateStaticParams() {
  // We don't statically generate — products are dynamic
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found — JIAYI TOOL" };
  const cat = product.category;
  return {
    title: `${product.name} (${product.code})`,
    description: `${product.name} — ${product.spec ?? ""} | ${product.material} | ${product.coating}`,
    alternates: { canonical: `/products/${cat?.slug ?? ""}/${product.slug}` },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { category, slug } = await params;

  const [product, cat, { data: related }] = await Promise.all([
    getProductBySlug(slug),
    getCategoryBySlug(category),
    getProductsByCategory(category, 1, 6),
  ]);

  if (!product || !cat) notFound();

  const imgUrl = product.image ? getStrapiImageUrl(product.image.url) : null;
  const relatedProducts = related.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      {/* Breadcrumb hero */}
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        {imgUrl && (
          <div className="absolute inset-0">
            <img src={imgUrl} alt={product.name} className="h-full w-full object-cover opacity-20" />
          </div>
        )}
        <div className="container-page py-14 relative">
          <div className="text-xs text-white/60">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span className="mx-2">/</span>
            <Link href={`/products/${cat.slug}`} className="hover:text-primary">{cat.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{product.name}</span>
          </div>
          <div className="mt-4 text-[10px] font-mono font-semibold text-primary uppercase tracking-widest">
            {product.code}
          </div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white tracking-tight max-w-3xl">
            {product.name}
          </h1>
          {product.spec && (
            <p className="mt-3 text-white/60 text-sm">{product.spec}</p>
          )}
        </div>
      </section>

      {/* Main content */}
      <section className="py-14">
        <div className="container-page">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14">

            {/* Left — image */}
            <div>
              <div className="aspect-square overflow-hidden rounded-md border border-border bg-surface relative">
                {imgUrl ? (
                  <img src={imgUrl} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="font-display text-5xl font-black text-charcoal/10 uppercase">
                      {product.code}
                    </span>
                  </div>
                )}
              </div>

              {/* Gallery */}
              {product.gallery && product.gallery.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {product.gallery.map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded border border-border bg-surface">
                      <img src={getStrapiImageUrl(img.url)} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              )}

              {/* Technical Drawing download */}
              {product.technicalDrawing && (
                <a
                  href={getStrapiImageUrl(product.technicalDrawing.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="mt-4 flex items-center gap-2 border border-border rounded-md px-4 py-3 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
                  </svg>
                  Download Technical Drawing
                </a>
              )}
            </div>

            {/* Right — details */}
            <div>
              {/* Specs */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Tag, label: "Product Code", value: product.code },
                  { icon: Layers, label: "Category", value: cat.name },
                  { icon: Wrench, label: "Material", value: product.material },
                  { icon: Shield, label: "Coating", value: product.coating },
                  ...(product.standard ? [{ icon: Tag, label: "Standard", value: product.standard }] : []),
                  ...(product.spec ? [{ icon: Tag, label: "Specification", value: product.spec }] : []),
                ].flatMap(({ icon: Icon, label, value }) => value ? (
                  <div key={label} className="border border-border rounded-md p-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                      <Icon className="h-3 w-3" /> {label}
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-charcoal">{value}</div>
                  </div>
                ) : [])}
              </div>

              {/* Description */}
              {product.description ? (
                <div className="mt-8">
                  <h2 className="text-base font-semibold text-charcoal mb-3">Description</h2>
                  {typeof product.description === "string" ? (
                    <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                  ) : Array.isArray(product.description) && product.description.length > 0 ? (
                    <BlocksRenderer content={product.description} />
                  ) : null}
                </div>
              ) : null}

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={{ pathname: "/quote", query: { product: product.code } }}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors rounded-md"
                >
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/products/${cat.slug}`}
                  className="inline-flex items-center gap-2 border-2 border-charcoal px-6 py-3 text-sm font-bold text-charcoal hover:bg-charcoal hover:text-white transition-colors rounded-md"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to {cat.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-14 bg-surface border-t border-border">
          <div className="container-page">
            <h2 className="text-xl font-bold tracking-tight mb-8">More from {cat.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => {
                const rImg = p.image ? getStrapiImageUrl(p.image.url) : null;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${cat.slug}/${p.slug}`}
                    className="group border border-border rounded-md bg-background overflow-hidden hover:border-primary transition-colors"
                  >
                    <div className="aspect-square bg-surface relative overflow-hidden">
                      {rImg ? (
                        <img src={rImg} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="font-mono text-xs text-charcoal/20">{p.code}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] font-mono text-primary">{p.code}</div>
                      <div className="mt-1 text-sm font-semibold text-charcoal group-hover:text-primary transition-colors line-clamp-2">{p.name}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
