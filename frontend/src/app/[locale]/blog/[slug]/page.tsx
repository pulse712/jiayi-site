import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getStrapiImageUrl,
} from "@/lib/strapi";
import { articleSchema } from "@/lib/schema";
import type { BlogSection } from "@/types/strapi";
import { BlocksRenderer } from "@/components/site/BlocksRenderer";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Renders either new Strapi Blocks or legacy JSON sections
function ContentRenderer({ content }: { content: unknown }) {
  if (!Array.isArray(content) || content.length === 0) return null;
  const first = content[0] as Record<string, unknown>;
  // Strapi Blocks format has nodes with a "type" of paragraph/heading/etc
  if (first?.type === "paragraph" || first?.type === "heading" || first?.type === "list") {
    return <BlocksRenderer content={content as any} />;
  }
  // Legacy JSON sections format
  const sections = content as BlogSection[];
  return (
    <div className="space-y-8">
      {sections.map((section, idx) => (
        <div key={idx}>
          {section.heading && (
            <h2 className="text-2xl font-bold tracking-tight text-charcoal">{section.heading}</h2>
          )}
          {section.body && (
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">{section.body}</p>
          )}
          {section.bullets && (
            <ul className="mt-4 space-y-2">
              {section.bullets.map((b, bi) => (
                <li key={bi} className="flex gap-3 text-base text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {section.quote && (
            <blockquote className="mt-5 border-l-2 border-primary pl-5 italic text-charcoal/80">
              &ldquo;{section.quote}&rdquo;
            </blockquote>
          )}
        </div>
      ))}
    </div>
  );
}

export async function generateStaticParams() {
  const { data: posts } = await getBlogPosts(1, 100);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article not found — JIAYI TOOL" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [getStrapiImageUrl(post.image.url)] : [],
      type: "article",
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, { data: allPosts }] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(1, 10),
  ]);

  if (!post) notFound();

  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const imgUrl = post.image ? getStrapiImageUrl(post.image.url) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.title,
              excerpt: post.excerpt,
              date: post.date,
              author: post.author,
              image: imgUrl ?? undefined,
              slug: post.slug,
            })
          ),
        }}
      />
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        {/* Article image as hero background */}
        {(imgUrl || post.category) && (
          <div className="absolute inset-0">
            <Image
              src={imgUrl ?? `/images/blog-${post.category.toLowerCase().replace(/\s+/g, "-")}.jpg`}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}
        <div className="container-page py-16 relative">
          <div className="text-xs text-white/60">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80 line-clamp-1">{post.title}</span>
          </div>
          <div className="mt-6 text-[10px] font-semibold uppercase tracking-wider text-primary">
            {post.category}
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-4xl leading-tight text-white">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl px-[30%]">
          {/* Content */}
          <div className="mt-10 space-y-6">
            <p className="text-lg text-charcoal/80 leading-relaxed font-medium border-l-2 border-primary pl-5">
              {post.excerpt}
            </p>
            <ContentRenderer content={post.content} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-16 border-t border-border pt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-surface border-t border-border">
          <div className="container-page">
            <h2 className="text-2xl font-bold tracking-tight">Related Articles</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => {
                const rImgUrl = p.image ? getStrapiImageUrl(p.image.url) : null;
                return (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group border border-border rounded-md bg-background overflow-hidden flex flex-col hover:border-primary transition-colors"
                  >
                    <div className="aspect-[5/3] relative overflow-hidden">
                      {rImgUrl ? (
                        <Image src={rImgUrl} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 bg-charcoal" />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {p.category}
                      </div>
                      <h3 className="mt-2 text-sm font-semibold text-charcoal leading-snug group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
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
