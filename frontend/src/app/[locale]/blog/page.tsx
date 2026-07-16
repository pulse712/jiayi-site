import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getBlogPosts, getStrapiImageUrl } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Blog & Technical Notes",
  description:
    "Technical articles, application notes and industry news from JIAYI's engineering team.",
  alternates: { canonical: "/blog" },
};

const BLOG_IMAGES: Record<string, string> = {
  "cavity-tool-sun-hydraulics-t-series": "/images/blog-cavity.jpg",
  "pvd-coatings-carbide-tools": "/images/blog-coatings.jpg",
  "hydraulic-manifold-drilling": "/images/blog-manifold.jpg",
  "pcd-tools-composite-machining": "/images/blog-pcd.jpg",
  "port-tools-sae-iso": "/images/blog-ports.jpg",
  "thread-milling-vs-tapping": "/images/blog-threading.jpg",
};

export default async function BlogPage() {
  const { data: posts } = await getBlogPosts();

  return (
    <>
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image src="/images/hero-blog.jpg" alt="Blog" fill sizes="100vw" className="object-cover opacity-30" />
        </div>
        <div className="container-page py-20 relative">
          <div className="text-xs text-white/70">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Technical Notes & News
          </h1>
          <p className="mt-4 text-white/75 max-w-2xl">
            Application guides, materials research and industry insights from JIAYI&apos;s
            engineering team.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => {
            const imgUrl = p.image ? getStrapiImageUrl(p.image.url) : null;
            return (
              <article
                key={p.slug}
                className="group border border-border rounded-md bg-background overflow-hidden flex flex-col hover:border-primary transition-colors"
              >
                <Link
                  href={`/blog/${p.slug}`}
                  className="aspect-[5/3] relative overflow-hidden bg-surface block"
                >
                  {imgUrl ? (
                    <Image src={imgUrl} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : BLOG_IMAGES[p.slug] ? (
                    <Image src={BLOG_IMAGES[p.slug]} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
                      <span className="font-display text-2xl font-black text-white/20 uppercase">{p.category}</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-primary bg-background px-2 py-1 rounded">
                    {p.category}
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-muted-foreground">{p.date}</div>
                  <h2 className="mt-2 text-base font-semibold text-charcoal leading-snug">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                    {p.excerpt}
                  </p>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
