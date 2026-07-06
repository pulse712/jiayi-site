import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getCategories, extractImageUrl } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Precision Cutting Tools — Product Catalogue",
  description:
    "Browse JIAYI's full precision cutting tool catalogue: cavity tools, port tools, hole-making, milling, threading, gear and composite machining tools.",
  alternates: { canonical: "/products" },
};

export default async function ProductsIndexPage() {
  const categories = await getCategories();

  return (
    <>
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <img src="/images/hero-products.jpg" alt="Products" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="container-page py-20 relative">
          <div className="text-xs text-white/70">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Products</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Precision Cutting Tools
          </h1>
          <p className="mt-4 text-white/75 max-w-3xl">
            Browse our complete catalogue of precision cutting tools covering
            every application in hydraulic and OEM precision manufacturing.
          </p>
        </div>
      </section>

      <section className="py-16">
        {categories.length === 0 ? (
          <div className="container-page text-center py-20 text-muted-foreground">
            No product categories available yet.
          </div>
        ) : (
          <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => {
              // extractImageUrl handles both Strapi v4 and v5 response formats
              const imgUrl = extractImageUrl(c.image);
              return (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className="group border border-border rounded-md bg-background hover:border-primary transition-colors flex flex-col overflow-hidden"
                >
                  <div className="aspect-[5/3] bg-charcoal overflow-hidden relative">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={c.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-2xl font-black text-white/20 uppercase">
                          {c.name.split(" ")[0]}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-primary bg-background px-2 py-1 rounded">
                      {c.count ?? 0} products
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-lg font-semibold text-charcoal group-hover:text-primary transition-colors">
                      {c.name}
                    </h2>
                    {c.short && (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                        {c.short}
                      </p>
                    )}
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      View Products <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
