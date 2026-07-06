import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
