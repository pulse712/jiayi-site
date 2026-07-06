import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How JIAYI TOOL collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-surface border-b border-border">
        <div className="container-page py-16">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Legal</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: June 23, 2026</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="max-w-3xl space-y-8 text-[15px] leading-relaxed text-foreground/85">
          <p>
            This page is maintained by JIAYI TOOL to explain what personal information we collect
            through this website, how we use it, and the choices you have. Contact us at{" "}
            <a href="mailto:sales@jiayitool.com" className="text-primary underline">
              sales@jiayitool.com
            </a>{" "}
            with any questions.
          </p>
          {[
            {
              title: "1. Information we collect",
              items: [
                "Contact details you submit through forms — name, company, email, phone, country, and message.",
                "Quote and order information — product references, drawings, and technical requirements.",
                "Usage data — basic analytics such as pages visited, device type, and approximate location.",
              ],
            },
            {
              title: "2. How we use it",
              items: [
                "To respond to quote requests, inquiries, and after-sales support.",
                "To prepare quotations, samples, shipping documents, and invoices.",
                "To improve our website, products, and customer experience.",
                "To comply with applicable export, tax, and accounting obligations.",
              ],
            },
          ].map(({ title, items }) => (
            <div key={title}>
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-xl font-semibold text-foreground">3. Sharing</h2>
            <p className="mt-3">
              We do not sell your personal information. We share it only with service providers
              that help us operate and with authorities when required by law.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
            <p className="mt-3">
              We use a small number of cookies for site functionality and aggregate analytics. You
              can disable cookies in your browser settings.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">5. Contact</h2>
            <p className="mt-3">
              JIAYI TOOL · Shenzhen, China · sales@jiayitool.com · +86 18688733869
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
