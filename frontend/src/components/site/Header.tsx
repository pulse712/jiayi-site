"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import type { CategoryAttributes, SiteSettingAttributes } from "@/types/strapi";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  categories: CategoryAttributes[];
  siteSettings: SiteSettingAttributes;
};

export function Header({ categories, siteSettings }: Props) {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", tKey: "nav.home" },
    { href: "/about", tKey: "nav.about" },
    { href: "/industries", tKey: "nav.industries" },
    { href: "/products", tKey: "nav.products", mega: true },
    { href: "/services", tKey: "nav.services" },
    { href: "/quality", tKey: "nav.quality" },
    { href: "/blog", tKey: "nav.blog" },
    { href: "/contact", tKey: "nav.contact" },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* Top utility bar */}
      <div className="hidden md:block border-b border-border/70 bg-background">
        <div className="container-page flex h-10 items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-5">
            {siteSettings.showPhone1 !== false && siteSettings.phone1 && (
              <a
                href={`tel:${siteSettings.phone1.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {siteSettings.phone1}
              </a>
            )}
            {siteSettings.showEmail !== false && siteSettings.email && (
              <>
                <span className="text-border">|</span>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {siteSettings.email}
                </a>
              </>
            )}
            {siteSettings.showAddress !== false && siteSettings.address && (
              <>
                <span className="text-border">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {siteSettings.address}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <span className="text-border">|</span>
            <span className="text-foreground/70">Follow Us:</span>
            {siteSettings.showLinkedin !== false && (
              <a
                href={siteSettings.linkedinUrl || "#"}
                aria-label="LinkedIn"
                className="grid place-items-center h-8 w-8 rounded border border-charcoal/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            )}
            {siteSettings.showFacebook !== false && (
              <a
                href={siteSettings.facebookUrl || "#"}
                aria-label="Facebook"
                className="grid place-items-center h-8 w-8 rounded border border-charcoal/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
            )}
            {siteSettings.showYoutube !== false && (
              <a
                href={siteSettings.youtubeUrl || "#"}
                aria-label="YouTube"
                className="grid place-items-center h-8 w-8 rounded border border-charcoal/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Youtube className="h-3.5 w-3.5" />
              </a>
            )}
            {siteSettings.showInstagram !== false && (
              <a
                href={siteSettings.instagramUrl || "#"}
                aria-label="Instagram"
                className="grid place-items-center h-8 w-8 rounded border border-charcoal/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-page flex h-20 items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="JIAYI home">
          <img
            src="/images/logo.png"
            alt="JIAYI TOOL"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const label = t(item.tKey as never);

            if ("mega" in item && item.mega) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 px-3 py-6 text-[13px] font-bold tracking-wide transition-colors ${
                      active ? "text-primary" : "text-charcoal hover:text-primary"
                    }`}
                  >
                    {label}
                    <ChevronDown className="h-3 w-3" />
                    {active && (
                      <span className="absolute left-3 right-3 bottom-4 h-[3px] bg-primary" />
                    )}
                  </Link>

                  {megaOpen && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-1 z-50">
                      <div className="w-[680px] rounded-md border border-border bg-white shadow-lg p-6 grid grid-cols-2 gap-x-8 gap-y-1">
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/products/${c.slug}`}
                            className="group block py-2.5 border-b border-border/60 last:border-0"
                          >
                            <div className="text-sm font-semibold text-charcoal group-hover:text-primary transition-colors">
                              {c.name}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {c.short}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-6 text-[13px] font-bold tracking-wide transition-colors ${
                  active ? "text-primary" : "text-charcoal hover:text-primary"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute left-3 right-3 bottom-4 h-[3px] bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/quote"
            className="hidden sm:inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-xs font-extrabold tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("nav.getQuote")}
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-page py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-sm font-bold tracking-wide text-charcoal hover:text-primary"
              >
                {t(item.tKey as never)}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-2">
              <LanguageSwitcher />
            </div>
            <Link
              href="/quote"
              className="mt-3 inline-flex items-center justify-center rounded-sm bg-primary px-4 py-3 text-xs font-extrabold tracking-wider text-primary-foreground"
            >
              {t("nav.getQuote")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
