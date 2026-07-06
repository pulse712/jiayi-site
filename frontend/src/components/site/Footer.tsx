import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Linkedin, Facebook, Instagram, Phone, MapPin, Mail } from "lucide-react";
import type { CategoryAttributes } from "@/types/strapi";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  categories: CategoryAttributes[];
};

export function Footer({ categories }: Props) {
  const t = useTranslations();

  return (
    <footer className="bg-charcoal text-charcoal-foreground mt-24">
      <div className="container-page py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="JIAYI TOOL"
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-5 text-sm text-white/70 leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid place-items-center h-9 w-9 rounded border border-white/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            {/* X (Twitter) — official brand mark */}
            <a
              href="#"
              aria-label="X (Twitter)"
              className="grid place-items-center h-9 w-9 rounded border border-white/15 hover:border-primary hover:text-primary transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.918l4.254 5.626L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
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
                ["/quote", "footer.requestQuote"],
                ["/blog", "footer.blogNews"],
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
            <li className="flex gap-3">
              <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>
                +86 18688733869
                <br />
                +86 15602977156
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>sales@jiayitool.com</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>{t("footer.address")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>{t("footer.copyright")}</div>
          <div className="flex items-center gap-5">
            <LanguageSwitcher variant="dark" />
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
