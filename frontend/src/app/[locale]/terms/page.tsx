import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the JIAYI TOOL website and orders.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-surface border-b border-border">
        <div className="container-page py-16">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Legal</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: June 23, 2026</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="max-w-3xl space-y-8 text-[15px] leading-relaxed text-foreground/85">
          <p>
            These terms govern your use of the JIAYI TOOL website and any quotes or orders placed
            with us. By using the site you agree to these terms.
          </p>
          {[
            {
              title: "1. Use of the website",
              body: "You may browse the site for legitimate business purposes. You agree not to misuse it, attempt unauthorized access, scrape it at scale, or use it to infringe the rights of others.",
            },
            {
              title: "2. Product information",
              body: "Specifications, dimensions, images, and lead times shown on the site are indicative. The binding specification for any order is the one confirmed in writing by our sales team.",
            },
            {
              title: "3. Intellectual property",
              body: "The JIAYI TOOL name, logo, site content, product photography, and technical drawings are the property of JIAYI TOOL or its licensors. Drawings or designs you send us remain your property and are treated as confidential.",
            },
            {
              title: "4. Warranty and liability",
              body: "Products are warranted to meet the specification agreed in the confirmed order. To the maximum extent permitted by law, our liability is limited to the value of the affected goods.",
            },
            {
              title: "5. Export compliance",
              body: "You agree to comply with all applicable export control and sanctions laws when importing, re-exporting, or using our products.",
            },
            {
              title: "6. Contact",
              body: "JIAYI TOOL · Shenzhen, China · sales@jiayitool.com · +86 18688733869",
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
              <p className="mt-3">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
