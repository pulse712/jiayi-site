import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Barlow_Condensed } from "next/font/google";
import { routing } from "@/i18n/routing";
import { getCategories, getSiteSettings } from "@/lib/strapi";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieConsent } from "@/components/site/CookieConsent";
import { GoogleTranslate } from "@/components/site/GoogleTranslate";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JIAYI TOOL — Precision. Performance. Reliability.",
    template: "%s | JIAYI TOOL",
  },
  description:
    "Factory-direct precision carbide cutting tools for global hydraulic OEM manufacturers. Cavity tools, port tools, reamers and custom carbide solutions since 2009.",
  openGraph: {
    type: "website",
    siteName: "JIAYI TOOL",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  const [messages, categories, siteSettings] = await Promise.all([
    getMessages(),
    getCategories(),
    getSiteSettings(),
  ]);

  return (
    <html lang={locale} className={`${inter.variable} ${barlowCondensed.variable}`}>
      <head>
        {/* JSON-LD — Organization + LocalBusiness (site-wide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <GoogleTranslate />
          <Header categories={categories} siteSettings={siteSettings} />
          <main className="flex-1">{children}</main>
          <Footer categories={categories} siteSettings={siteSettings} />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
