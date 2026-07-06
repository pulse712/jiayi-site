import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitContactMessage } from "@/lib/strapi";

// ── Rate limiting (in-memory, resets on server restart) ──────────────────────
const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;       // max submissions
const RATE_WINDOW = 60_000; // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── Validation schema ─────────────────────────────────────────────────────────
const contactSchema = z.object({
  name:    z.string().min(1).max(200),
  email:   z.string().email().max(200),
  subject: z.string().min(1).max(300),
  message: z.string().min(1).max(5000),
});

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? req.headers.get("x-real-ip")
      ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse + validate
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const ok = await submitContactMessage(parsed.data as Record<string, string>);

    if (ok) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    // Strapi unavailable — log and return error so user knows
    console.error("[Contact Message - Strapi unavailable]", JSON.stringify(parsed.data));
    return NextResponse.json(
      { error: "Service temporarily unavailable. Please email us directly." },
      { status: 503 }
    );
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to submit message." }, { status: 500 });
  }
}
