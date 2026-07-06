"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Product = {
  id: number;
  code: string;
  slug: string;
  name: string;
  spec: string;
  standard: string;
  material: string;
  coating: string;
  imageUrl: string | null;
  categorySlug: string;
};

type OtherCategory = { slug: string; name: string };

type Props = {
  products: Product[];
  standards: string[];
  materials: string[];
  coatings: string[];
  otherCategories: OtherCategory[];
};

export function ProductGrid({
  products,
  standards,
  materials,
  coatings,
  otherCategories,
}: Props) {
  const [stdFilter, setStdFilter] = useState<string[]>([]);
  const [matFilter, setMatFilter] = useState<string[]>([]);
  const [coatFilter, setCoatFilter] = useState<string[]>([]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = products.filter(
    (p) =>
      (stdFilter.length === 0 || stdFilter.includes(p.standard)) &&
      (matFilter.length === 0 || matFilter.includes(p.material)) &&
      (coatFilter.length === 0 || coatFilter.includes(p.coating))
  );

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-10">
      {/* Sidebar filters */}
      <aside className="space-y-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </div>
        <FilterGroup
          title="Hydraulic Standard"
          options={standards}
          selected={stdFilter}
          onToggle={(v) => toggle(stdFilter, v, setStdFilter)}
        />
        <FilterGroup
          title="Material"
          options={materials}
          selected={matFilter}
          onToggle={(v) => toggle(matFilter, v, setMatFilter)}
        />
        <FilterGroup
          title="Coating"
          options={coatings}
          selected={coatFilter}
          onToggle={(v) => toggle(coatFilter, v, setCoatFilter)}
        />
      </aside>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-charcoal">{filtered.length}</span>{" "}
            products
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div
              key={p.code}
              className="border border-border rounded-md bg-background flex flex-col overflow-hidden hover:border-primary transition-colors"
            >
              {/* Image — clicking goes to product detail */}
              <Link
                href={`/products/${p.categorySlug}/${p.slug}`}
                className="aspect-[4/3] bg-surface relative overflow-hidden block group"
              >
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-surface flex items-center justify-center">
                    <span className="font-display text-xl font-black text-charcoal/20 uppercase">
                      {p.material}
                    </span>
                  </div>
                )}
                <div className="absolute top-2 left-2 text-[10px] font-mono font-semibold text-primary bg-background px-2 py-0.5 rounded shadow-sm">
                  {p.code}
                </div>
              </Link>
              <div className="p-5 flex flex-col flex-1">
                {/* Product name — also links to detail page */}
                <Link
                  href={`/products/${p.categorySlug}/${p.slug}`}
                  className="text-sm font-semibold text-charcoal hover:text-primary transition-colors"
                >
                  {p.name}
                </Link>
                <div className="mt-1 text-xs text-muted-foreground">{p.spec}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge>{p.standard}</Badge>
                  <Badge>{p.material}</Badge>
                  <Badge>{p.coating}</Badge>
                </div>
                <Link
                  href={{ pathname: "/quote", query: { product: p.code } }}
                  className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Get Quote <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No products match the selected filters.
          </div>
        )}

        {/* Other categories */}
        <div className="mt-12 pt-10 border-t border-border">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Explore Other Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                className="text-xs font-medium border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-3">
        {title}
      </div>
      <div className="space-y-2">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2.5 text-sm cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(o)}
              onChange={() => onToggle(o)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-muted-foreground group-hover:text-charcoal transition-colors">
              {o}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
