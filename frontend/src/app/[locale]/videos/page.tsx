import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Play, Youtube } from "lucide-react";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Video Center — Factory Tours & Product Demonstrations",
  description:
    "Watch JIAYI factory tours, product demonstrations, machining application videos, and technical training content on YouTube.",
  alternates: { canonical: "/videos" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jiayi-tools.com";

// YouTube video IDs — replace with real IDs when available
const VIDEO_CATEGORIES = [
  {
    id: "factory",
    title: "Factory & Capabilities",
    description: "Inside JIAYI's 1,800 m² production facility in Shenzhen.",
    videos: [
      {
        id: "factory-tour",
        youtubeId: "dQw4w9WgXcQ", // placeholder — replace with real YouTube ID
        title: "JIAYI Factory Tour — Shenzhen Production Facility",
        description:
          "A full walkthrough of our 1,800 m² Shenzhen factory, featuring Walter 5-axis CNC grinding centres, Zoller inspection systems, PVD/CVD coating lines, and final quality control.",
        duration: "8:42",
        category: "Factory",
      },
      {
        id: "5axis-grinding",
        youtubeId: "dQw4w9WgXcQ", // placeholder
        title: "5-Axis CNC Grinding — Walter Helitronic Vision 400L",
        description:
          "Demonstration of our Walter Helitronic Vision 400L grinding carbide cavity tools to ±0.005 mm tolerance with automated wheel change.",
        duration: "4:15",
        category: "Equipment",
      },
      {
        id: "coating-line",
        youtubeId: "dQw4w9WgXcQ", // placeholder
        title: "In-House PVD Coating Process",
        description:
          "How TiAlN, AlTiN, and DLC coatings are applied in our in-house PVD coating facility — from substrate preparation to final thickness verification.",
        duration: "5:30",
        category: "Equipment",
      },
    ],
  },
  {
    id: "applications",
    title: "Machining Application Videos",
    description: "See JIAYI tools cutting in real production environments.",
    videos: [
      {
        id: "cavity-machining",
        youtubeId: "dQw4w9WgXcQ", // placeholder
        title: "Hydraulic Cavity Machining — Sun T-Series Compatible Tools",
        description:
          "Live machining demo of JIAYI Sun Hydraulics T-series compatible cavity tools in D03 and D05 manifold blocks. 316 stainless steel at 180 m/min.",
        duration: "3:20",
        category: "Hydraulics",
      },
      {
        id: "pcd-composites",
        youtubeId: "dQw4w9WgXcQ", // placeholder
        title: "PCD End Mill Cutting CFRP Composites",
        description:
          "JIAYI PCD end mill machining carbon fibre reinforced polymer (CFRP) for an aerospace structural panel application — delamination-free at 400 m/min.",
        duration: "2:55",
        category: "Aerospace",
      },
      {
        id: "thread-milling",
        youtubeId: "dQw4w9WgXcQ", // placeholder
        title: "Thread Milling M10 in AlSi9Cu3 Transmission Housing",
        description:
          "Comparison video: JIAYI solid carbide thread mill vs conventional tapping on automotive transmission housing. Speed, surface finish, and breakage risk compared.",
        duration: "4:05",
        category: "Automotive",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Training",
    description: "Engineering guides and technical knowledge for tooling engineers.",
    videos: [
      {
        id: "coating-selection",
        youtubeId: "dQw4w9WgXcQ", // placeholder
        title: "How to Select the Right Coating for Your Application",
        description:
          "A practical guide to choosing between TiAlN, AlTiN, TiCN, DLC, and diamond coatings based on workpiece material, cutting speed, and tool life targets.",
        duration: "7:10",
        category: "Technical",
      },
      {
        id: "tool-life",
        youtubeId: "dQw4w9WgXcQ", // placeholder
        title: "Diagnosing Premature Tool Wear — 6 Common Causes",
        description:
          "Our senior engineer walks through the 6 most common causes of premature carbide tool wear and the corrective actions for each — with real worn tool examples.",
        duration: "9:45",
        category: "Technical",
      },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Factory: "bg-slate-100 text-slate-700",
  Equipment: "bg-blue-50 text-blue-700",
  Hydraulics: "bg-cyan-50 text-cyan-700",
  Aerospace: "bg-purple-50 text-purple-700",
  Automotive: "bg-orange-50 text-orange-700",
  Technical: "bg-green-50 text-green-700",
};

function VideoCard({ video }: { video: (typeof VIDEO_CATEGORIES)[0]["videos"][0] }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?rel=0`;

  return (
    <div className="border border-border rounded-md overflow-hidden bg-background group hover:border-primary transition-colors">
      {/* Embed */}
      <div className="aspect-video relative bg-charcoal">
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
              CATEGORY_COLORS[video.category] ?? "bg-surface text-charcoal"
            }`}
          >
            {video.category}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono ml-auto">
            {video.duration}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-charcoal leading-snug group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Video Center", url: `${SITE_URL}/videos` },
  ]);

  // VideoObject schema for all videos
  const jsonLdVideos = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JIAYI TOOL Video Center",
    itemListElement: VIDEO_CATEGORIES.flatMap((cat) =>
      cat.videos.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoObject",
          name: v.title,
          description: v.description,
          thumbnailUrl: `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`,
          embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
          uploadDate: "2024-01-01",
          publisher: {
            "@type": "Organization",
            name: "JIAYI TOOL",
            url: SITE_URL,
          },
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdVideos) }}
      />

      {/* Hero */}
      <section className="border-b border-border bg-charcoal">
        <div className="container-page py-16">
          <div className="text-xs text-white/60">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Video Center</span>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <Youtube className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Video Center
            </h1>
          </div>
          <p className="mt-4 text-white/70 max-w-2xl">
            Factory tours, live machining demonstrations, and technical training videos from
            JIAYI&apos;s engineering team.
          </p>
          <a
            href="https://www.youtube.com/@jiayitool"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:border-primary hover:text-primary transition-colors"
          >
            <Youtube className="h-4 w-4" />
            Subscribe on YouTube
          </a>
        </div>
      </section>

      {/* Category nav */}
      <section className="border-b border-border bg-surface">
        <div className="container-page py-4 flex flex-wrap gap-3">
          {VIDEO_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider border border-border rounded px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Play className="h-3 w-3" />
              {cat.title}
            </a>
          ))}
        </div>
      </section>

      {/* Video sections */}
      <section className="py-16">
        <div className="container-page space-y-16">
          {VIDEO_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-charcoal">{cat.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube subscribe CTA */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="container-page flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 bg-red-600 rounded-full grid place-items-center shrink-0">
              <Youtube className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-charcoal">Follow us on YouTube</h2>
              <p className="text-sm text-muted-foreground mt-1">
                New machining demos, technical guides, and factory updates every month.
              </p>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@jiayitool"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-md bg-red-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
          >
            <Youtube className="h-4 w-4" />
            Subscribe to JIAYI TOOL
          </a>
        </div>
      </section>
    </>
  );
}
