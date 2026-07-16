import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { uploadFileToStrapi } from "@/lib/strapi";

// ── Rate limiting (in-memory, resets on server restart) ──────────────────────
const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000;

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
const quoteSchema = z.object({
  company:   z.string().min(1).max(200),
  contact:   z.string().min(1).max(200),
  email:     z.string().email().max(200),
  phone:     z.string().max(50).optional(),
  country:   z.string().min(1).max(100),
  product:   z.string().max(500).optional(),
  material:  z.string().max(200).optional(),
  tolerance: z.string().max(200).optional(),
  quantity:  z.string().max(100).optional(),
  standard:  z.string().max(200).optional(),
  notes:     z.string().max(2000).optional(),
});

const STRAPI_URL =
  process.env.STRAPI_INTERNAL_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/acad",
  "application/dxf",
  "application/octet-stream", // .dwg files often come through as octet-stream
  "image/vnd.dxf",
];
const ALLOWED_EXTENSIONS = [".pdf", ".dwg", ".dxf"];

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ──────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ── Parse multipart form data ──────────────────────────────────────────
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 }
      );
    }

    // ── Extract and validate text fields ──────────────────────────────────
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        fields[key] = value;
      }
    }

    const parsed = quoteSchema.safeParse(fields);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // ── Handle file upload (optional) ─────────────────────────────────────
    let drawingId: number | null = null;
    const file = formData.get("drawing");

    if (file instanceof File && file.size > 0) {
      // Validate size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File too large. Maximum size is 10 MB." },
          { status: 400 }
        );
      }

      // Validate extension
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json(
          { error: "Invalid file type. Only PDF, DWG, and DXF files are accepted." },
          { status: 400 }
        );
      }

      // Upload to Strapi
      drawingId = await uploadFileToStrapi(file, file.name);
      // Non-fatal — if upload fails we still save the quote without the file
      if (!drawingId) {
        console.warn("[Quote] File upload to Strapi failed — saving quote without drawing.");
      }
    }

    // ── Create quote-request record in Strapi ─────────────────────────────
    const payload: Record<string, unknown> = { ...parsed.data };
    if (drawingId) {
      payload.drawing = drawingId;
    }

    const res = await fetch(`${STRAPI_URL}/api/quote-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
      body: JSON.stringify({ data: payload }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    console.error("[Quote Request] Strapi error:", res.status, await res.text());
    return NextResponse.json(
      { error: "Service temporarily unavailable. Please email us directly at sales@jiayitool.com" },
      { status: 503 }
    );
  } catch (err) {
    console.error("Quote route error:", err);
    return NextResponse.json({ error: "Failed to submit request." }, { status: 500 });
  }
}
