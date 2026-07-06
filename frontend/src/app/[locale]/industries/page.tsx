import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getIndustries, extractImageUrl } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Industries We Serve — JIAYI TOOL",
  description:
    "Precision cutting tools for aerospace, automotive, medical, hydraulics, energy, electronics, shipbuilding and rail transit manufacturing.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <>
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <img src="/images/hero-industries.jpg" alt="Industries" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="container-page py-20 relative">
          <div className="text-xs text-white/70">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Industries</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Industries We Serve
          </h1>
          <p className="mt-4 text-white/75 max-w-3xl">
            JIAYI cutting tools are deployed across mission-critical manufacturing sectors, from
            commercial aerospace to medical device production.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page space-y-16">
          {industries.map((ind, i) => {
            const imgUrl = extractImageUrl(ind.image);
            return (
              <div
                key={ind.slug}
                className={`grid lg:grid-cols-5 gap-10 items-start ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="lg:col-span-2 aspect-[4/3] max-w-sm w-full bg-charcoal border border-border rounded-md relative overflow-hidden">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={ind.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid-pattern flex items-center justify-center">
                      <span className="font-display text-3xl font-black text-white/20 uppercase">
                        {ind.name.split(" ")[0]}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono font-semibold text-primary bg-background px-2 py-1 rounded">
                    {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Industry {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight">{ind.name}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{ind.desc}</p>
                  {ind.details && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {ind.details}
                    </p>
                  )}
                  {ind.applications && ind.applications.length > 0 && (
                    <div className="mt-5">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal mb-2">
                        Typical Applications
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                        {ind.applications.map((a) => (
                          <li key={a} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {ind.category && (
                    <Link
                      href={`/products/${ind.category}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      View Related Tools <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
