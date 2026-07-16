import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ShieldCheck, Award, Heart, Users } from "lucide-react";
import { SectionTitle } from "@/components/site/SectionTitle";

export const metadata: Metadata = {
  title: "About JIAYI — A Tradition of Quality Backed by Personalized Service",
  description:
    "Since 2009, JIAYI has manufactured precision carbide cutting tools from its Shenzhen facility, exporting to more than 50 countries.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image src="/images/hero-about.jpg" alt="JIAYI facility" fill sizes="100vw" className="object-cover opacity-40" />
        </div>
        <div className="container-page py-24 relative">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            About JIAYI
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl text-white">
            A Tradition of Quality Backed by Personalized Service
          </h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl leading-relaxed">
            For over fifteen years, JIAYI has manufactured precision carbide cutting tools for
            global hydraulic OEMs and precision component manufacturers — delivering
            factory-direct engineering, transparent pricing and uncompromising tolerance control.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-page grid lg:grid-cols-[1fr_1.4fr] gap-14">
          <div>
            <div className="sticky top-24">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Our Story
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Founded in 2009.
                <br />
                Engineered for OEMs.
              </h2>
              <div className="mt-6 overflow-hidden rounded-md border border-border aspect-square relative">
                <Image
                  src="/images/about-building.jpg"
                  alt="JIAYI headquarters building"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 bg-charcoal text-white/80 px-4 py-2 text-xs font-mono rounded-b-md">
                JIAYI HQ — Shenzhen, China
              </p>
            </div>
          </div>
          <div className="space-y-6 text-base text-charcoal leading-relaxed">
            <p>
              JIAYI was founded in 2009 in Shenzhen with a single mandate: to manufacture
              precision cutting tools that meet the tolerance demands of global hydraulic OEM
              manufacturers — without the markups and lead times of traditional distribution.
            </p>
            <p>
              Today, our 1,800 m² production facility houses Walter (Germany) and Rollomatic
              (Switzerland) 5-axis CNC grinding systems, producing over 8,000 tools per day. Our
              team of more than 120 technicians and engineers serves customers across 50+
              countries, from cartridge valve manufacturers in Europe to aerospace tier-1
              suppliers in North America.
            </p>
            <p>
              We specialize in cavity tools and port tools compatible with Sun Hydraulics,
              HydraForce, Parker Hannifin, Danfoss, Bosch Rexroth and Eaton Vickers standards —
              alongside a complete program of hole-making, threading, milling and gear cutting
              tools in carbide, PCD, PCBN and cermet substrates.
            </p>
            <p>
              Vertical integration is the foundation of our quality. From substrate selection
              and CNC grinding to in-house PVD/CVD coating, laser marking and final metrology,
              every step happens under one roof in Shenzhen. This eliminates the hand-offs that
              introduce variation and lets us guarantee runout under 0.005 mm and concentricity
              under 0.003 mm on standard catalog tools.
            </p>
            <p>
              Engineering is a service, not an upcharge. Our application team — many of whom
              spent years on the shop floor before joining JIAYI — works directly with OEM
              tooling engineers to optimize geometry, flute count, helix angle and coating for
              each customer&apos;s material, machine and cycle target.
            </p>
            <p>
              Quality is verified, not assumed. Every batch is checked on Zoller Genius 3
              optical measurement systems and Mitutoyo CMMs, and every shipment leaves with a
              full inspection report traceable to the operator, machine and grinding wheel used.
              We are ISO 9001:2015 certified and audited annually by several of our tier-1
              aerospace and medical customers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal text-charcoal-foreground">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {[
            ["2009", "Founded"],
            ["Shenzhen", "China"],
            ["1,800 m²", "Factory Floor"],
            ["8,000+", "Tools / Day"],
          ].map(([v, l]) => (
            <div key={l} className="bg-charcoal p-8">
              <div className="text-3xl md:text-4xl font-bold text-primary">{v}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-white/60">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Image Gallery */}
      <section className="py-20">
        <div className="container-page">
          <SectionTitle eyebrow="Our Facility" title="Inside JIAYI — Shenzhen" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large featured image */}
            <div className="md:col-span-2 overflow-hidden rounded-md border border-border aspect-[16/9] relative group">
              <Image
                src="/images/factory.jpg"
                alt="JIAYI production floor"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-5">
                <p className="text-white text-sm font-semibold">Production Floor — 1,800 m²</p>
                <p className="text-white/70 text-xs mt-0.5">Walter 5-axis CNC grinding systems</p>
              </div>
            </div>
            {/* Side images */}
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-md border border-border aspect-[4/3] relative group flex-1">
                <Image
                  src="/images/about-building.jpg"
                  alt="JIAYI headquarters"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                  <p className="text-white text-xs font-semibold">JIAYI Headquarters</p>
                  <p className="text-white/70 text-xs">Bao'an District, Shenzhen</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-md border border-border aspect-[4/3] relative group flex-1">
                <Image
                  src="/images/hero-about.jpg"
                  alt="JIAYI facility exterior"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                  <p className="text-white text-xs font-semibold">Facility Exterior</p>
                  <p className="text-white/70 text-xs">Songgang, Shenzhen</p>
                </div>
              </div>
            </div>
          </div>
          {/* Stats row */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "1,800 m²", l: "Production Floor" },
              { v: "8,000+", l: "Tools per Day" },
              { v: "120+", l: "Engineers & Technicians" },
              { v: "50+", l: "Countries Served" },
            ].map(({ v, l }) => (
              <div key={l} className="border border-border rounded-md p-5 text-center">
                <div className="text-2xl font-bold text-primary">{v}</div>
                <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment & Materials */}
      <section className="py-20">
        <div className="container-page grid lg:grid-cols-2 gap-12">
          <div>
            <SectionTitle eyebrow="Equipment" title="Best-in-Class Grinding Technology" />
            <div className="mt-8 space-y-5">
              {[
                ["Walter (Germany)", "Helitronic Vision 400L 5-axis tool grinders"],
                ["Rollomatic (Switzerland)", "GrindSmart 830XW for micro tools"],
                ["Zoller (Germany)", "Genius 3 measurement and inspection"],
                ["Mitutoyo CMM", "Full dimensional verification per piece"],
              ].map(([n, d]) => (
                <div key={n} className="border border-border rounded-md p-5">
                  <div className="text-sm font-semibold text-charcoal">{n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Materials Expertise" title="From Carbide to PCD" />
            <div className="mt-8 grid grid-cols-2 gap-px bg-border border border-border">
              {[
                ["PCD", "Polycrystalline diamond for composites and non-ferrous"],
                ["PCBN", "Polycrystalline cubic boron nitride for hardened steel"],
                ["Cermet", "Titanium-based for high-speed finishing"],
                ["Carbide", "K10–K40 grades for all hydraulic applications"],
              ].map(([n, d]) => (
                <div key={n} className="bg-background p-6">
                  <div className="text-lg font-bold text-primary">{n}</div>
                  <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="container-page">
          <SectionTitle eyebrow="Our Values" title="What We Stand For" align="center" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Originality", body: "In-house engineering on every custom tool we manufacture." },
              { icon: ShieldCheck, title: "Integrity", body: "Transparent tolerance reports and honest lead times." },
              { icon: Heart, title: "Service Excellence", body: "24-hour quote response and dedicated account engineers." },
              { icon: Users, title: "Professional Ethics", body: "Long-term partnerships, not transactional supply." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-background border border-border rounded-md p-6">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-base font-semibold text-charcoal">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Tour teaser */}
      <section className="py-16 bg-charcoal">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[16/9] rounded-md overflow-hidden border border-white/10">
            <Image
              src="/images/factory.jpg"
              alt="JIAYI production floor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-80"
            />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-3">
              Factory Tour
            </p>
            <h2 className="text-3xl font-bold text-white leading-tight">
              See Exactly How Your Tools Are Made
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              42 five-axis grinding centres, in-house PVD coating, Zoller 100% optical
              inspection, and Mitutoyo CMM verification — all under one roof in Shenzhen.
              Explore our full equipment list and testing capabilities.
            </p>
            <Link
              href="/factory"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Full Factory Tour <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="container-page">
          <h2 className="text-2xl font-bold">Ready to work with us?</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Send us your drawings or requirements — our engineering team will respond within 24
            hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/factory"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Tour the Factory
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md border-2 border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
