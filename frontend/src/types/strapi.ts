// ─────────────────────────────────────────────
// Generic Strapi v5 REST response shapes
// ─────────────────────────────────────────────

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  name?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// ─────────────────────────────────────────────
// Strapi Blocks (rich text) node types
// ─────────────────────────────────────────────

export interface BlockTextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

export interface BlockLinkNode {
  type: "link";
  url: string;
  children: BlockTextNode[];
}

export type BlockInlineNode = BlockTextNode | BlockLinkNode;

export interface BlockParagraphNode {
  type: "paragraph";
  children: BlockInlineNode[];
}

export interface BlockHeadingNode {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: BlockInlineNode[];
}

export interface BlockListItemNode {
  type: "list-item";
  children: BlockInlineNode[];
}

export interface BlockListNode {
  type: "list";
  format: "ordered" | "unordered";
  children: BlockListItemNode[];
}

export interface BlockQuoteNode {
  type: "quote";
  children: BlockInlineNode[];
}

export interface BlockCodeNode {
  type: "code";
  children: BlockTextNode[];
}

export type BlockNode =
  | BlockParagraphNode
  | BlockHeadingNode
  | BlockListNode
  | BlockQuoteNode
  | BlockCodeNode;



export interface CategoryAttributes {
  id: number;
  slug: string;
  name: string;
  short: string;
  description: string;
  count: number;
  image: StrapiImage | null;
}

export interface ProductAttributes {
  id: number;
  code: string;
  slug: string;
  name: string;
  spec: string;
  standard: string;
  material: string;
  coating: string;
  description?: BlockNode[] | string | null;
  seoTitle?: string;
  seoDescription?: string;
  image: StrapiImage | null;
  gallery?: StrapiImage[];
  technicalDrawing?: StrapiImage | null;
  category: CategoryAttributes | null;
}

export interface ApplicationItem {
  id: number;
  text: string;
}

export interface IndustryAttributes {
  id: number;
  slug: string;
  name: string;
  desc: string;
  details: string;
  applications: ApplicationItem[] | string[];
  image: StrapiImage | null;
  category: string;
}

export interface BlogPostAttributes {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: string;
  tags: string[];
  image: StrapiImage | null;
  content: BlogSection[];
}

export interface BlogSection {
  heading: string;
  body: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  quote?: string;
}

export interface QuoteRequestAttributes {
  id: number;
  company: string;
  contact: string;
  email: string;
  phone?: string;
  country: string;
  product?: string;
  material?: string;
  tolerance?: string;
  quantity?: string;
  standard: string;
  notes?: string;
  createdAt: string;
}

export interface SiteSettingAttributes {
  siteName: string;
  tagline: string;
  phone1: string;
  phone2?: string;
  email: string;
  address: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  googleMapsEmbedUrl?: string;
}
