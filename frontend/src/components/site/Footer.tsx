import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Linkedin, Facebook, Instagram, Phone, MapPin, Mail } from "lucide-react";
import type { CategoryAttributes, SiteSettingAttributes } from "@/types/strapi";

type Props = {
  categories: CategoryAttributes[];
  siteSettings: SiteSettingAttributes;
};

export function Footer({ categories, siteSettings }: Props) {
  const t = useTranslations();

  return (
    <footer className="bg-charcoal text-charcoal-foreground mt-24">
      <div className="container-page py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="JIAYI TOOL"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-5 text-sm text-white/70 leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="mt-5 flex gap-3">
            {siteSettings.showLinkedin !== false && (
              <a
                href={siteSettings.linkedinUrl || "#"}
                aria-label="LinkedIn"
                className="grid place-items-center h-9 w-9 rounded border border-white/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {siteSettings.showFacebook !== false && (
              <a
                href={siteSettings.facebookUrl || "#"}
                aria-label="Facebook"
                className="grid place-items-center h-9 w-9 rounded border border-white/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {siteSettings.showInstagram !== false && (
              <a
                href={siteSettings.instagramUrl || "#"}
                aria-label="Instagram"
                className="grid place-items-center h-9 w-9 rounded border border-white/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
            {t("footer.products")}
          </h4>
          <ul className="mt-5 space-y-2.5 text-sm text-white/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-5 space-y-2.5 text-sm text-white/70">
            {(
              [
                ["/about", "footer.aboutJiayi"],
                ["/industries", "footer.industriesServed"],
                ["/services", "footer.services"],
                ["/factory", "footer.factoryTour"],
                ["/quote", "footer.requestQuote"],
                ["/blog", "footer.blogNews"],
                ["/case-studies", "footer.caseStudies"],
                ["/downloads", "footer.downloads"],
                ["/videos", "footer.videos"],
                ["/faq", "footer.faq"],
                ["/contact", "footer.contactLink"],
              ] as const
            ).map(([href, key]) => (
              <li key={href}>
                <Link href={href} className="hover:text-primary transition-colors">
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
            {t("footer.contact")}
          </h4>
          <ul className="mt-5 space-y-3.5 text-sm text-white/70">
            {(siteSettings.showPhone1 !== false && siteSettings.phone1) || (siteSettings.showPhone2 !== false && siteSettings.phone2) ? (
              <li className="flex gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>
                  {siteSettings.showPhone1 !== false && siteSettings.phone1 && (
                    <>{siteSettings.phone1}<br /></>
                  )}
                  {siteSettings.showPhone2 !== false && siteSettings.phone2 && siteSettings.phone2}
                </span>
              </li>
            ) : null}
            {siteSettings.showEmail !== false && siteSettings.email && (
              <li className="flex gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{siteSettings.email}</span>
              </li>
            )}
            {siteSettings.showAddress !== false && siteSettings.address && (
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{siteSettings.address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>{t("footer.copyright")}</div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
