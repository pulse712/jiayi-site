import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Secret token to verify the request comes from Strapi
// Set REVALIDATE_SECRET in your environment variables
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "jiayi-revalidate-secret";

/**
 * POST /api/revalidate
 *
 * Called by Strapi webhooks when content is created, updated, or deleted.
 * Clears the Next.js cache for the affected content type so the site
 * reflects changes immediately instead of waiting for ISR timeout.
 *
 * Strapi webhook body shape:
 * {
 *   event: "entry.create" | "entry.update" | "entry.delete" | "entry.publish" | "entry.unpublish",
 *   model: "product" | "category" | "blog-post" | "industry" | "site-setting",
 *   entry: { slug?: string, ... }
 * }
 */
export async function POST(req: NextRequest) {
  try {
    // Verify secret
    const secret = req.headers.get("x-revalidate-secret")
      ?? req.nextUrl.searchParams.get("secret");

    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { model, entry } = body;

    console.log(`[Revalidate] model=${model} event=${body.event}`);

    // Revalidate based on which content type changed
    switch (model) {
      case "product": {
        // Revalidate the specific product page + its category listing
        revalidatePath("/products", "layout");
        if (entry?.slug && entry?.category?.slug) {
          revalidatePath(`/products/${entry.category.slug}/${entry.slug}`);
          revalidatePath(`/products/${entry.category.slug}`);
        } else if (entry?.category?.slug) {
          revalidatePath(`/products/${entry.category.slug}`);
        }
        break;
      }

      case "category": {
        // Revalidate all product pages since navigation uses categories
        revalidatePath("/products", "layout");
        if (entry?.slug) {
          revalidatePath(`/products/${entry.slug}`);
        }
        break;
      }

      case "blog-post": {
        revalidatePath("/blog", "layout");
        if (entry?.slug) {
          revalidatePath(`/blog/${entry.slug}`);
        }
        break;
      }

      case "industry": {
        revalidatePath("/industries", "layout");
        break;
      }

      case "site-setting": {
        // Site settings affect every page (header/footer)
        revalidatePath("/", "layout");
        break;
      }

      default: {
        // Unknown model — revalidate everything to be safe
        revalidatePath("/", "layout");
      }
    }

    return NextResponse.json({ revalidated: true, model, timestamp: Date.now() });
  } catch (err) {
    console.error("[Revalidate] Error:", err);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
