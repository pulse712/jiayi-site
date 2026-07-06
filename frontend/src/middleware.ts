import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /_next (Next.js internals)
  // - /api (API routes)
  // - /_vercel (Vercel internals)
  // - Static files with extensions
  matcher: ["/((?!_next|api|_vercel|.*\\..*).*)"],
};
