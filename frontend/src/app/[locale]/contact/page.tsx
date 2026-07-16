import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact JIAYI TOOL — Shenzhen, China",
  description:
    "Contact JIAYI's Shenzhen office for inquiries, technical questions and quotations.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const info = [
    {
      icon: MapPin,
      title: t("visitUs"),
      body: "Floors 1–3, No. 12 Jingshan Road, Luotian Community, Songgang Town, Bao'an District, Shenzhen, China",
    },
    { icon: Phone, title: t("callUs"), body: "+86 18688733869\n+86 15602977156" },
    { icon: Mail, title: t("email"), body: "sales@jiayitool.com\nengineering@jiayitool.com" },
    { icon: Clock, title: t("hours"), body: t("hoursValue") },
  ];

  return (
    <>
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image src="/images/hero-contact.jpg" alt="Contact" fill sizes="100vw" className="object-cover opacity-30" />
        </div>
        <div className="container-page py-20 relative">
          <div className="text-xs text-white/70">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="mt-4 text-white/75 max-w-2xl">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div className="space-y-6">
            {info.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-border rounded-md p-6 flex gap-5">
                <div className="h-11 w-11 rounded-md bg-primary/10 grid place-items-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-charcoal">{title}</div>
                  <div className="mt-1 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {body}
                  </div>
                </div>
              </div>
            ))}

            {/* Google Maps embed */}
            <div className="aspect-[5/3] border border-border rounded-md overflow-hidden">
              <iframe
                title="JIAYI TOOL location"
                src="https://www.google.com/maps?q=Jingshan+Road+Luotian+Songgang+Bao%27an+Shenzhen&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
