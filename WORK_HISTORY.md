# JIAYI TOOL — Work History

## Project Overview
B2B precision cutting tools manufacturer website.
- **Frontend**: Next.js 15 (App Router, SSR, TypeScript, Tailwind CSS, next-intl)
- **Backend/CMS**: Strapi 5 (REST API, i18n plugin)
- **Database**: PostgreSQL 16
- **Process Manager**: PM2
- **Proxy**: Nginx (ports 80/443)
- **Domain**: https://jiayi-tools.com
- **CMS**: https://cms.jiayi-tools.com

---

## Session Work Log — July 7, 2026

---

### 1. Remove Hardcoded Industry Content
**File**: `frontend/src/lib/static-data.ts`

**Problem**: The `industries` array in `static-data.ts` contained 8 hardcoded industry objects (Aerospace, Automotive, Medical, Hydraulics, Energy, Electronics, Shipbuilding, Rail Transit).

**Fix**: Replaced the hardcoded array with an empty array:
```ts
export const industries: IndustryAttributes[] = [];
```

**Result**: Frontend now fetches industry data from Strapi CMS instead of using hardcoded values.

---

### 2. Remove Hardcoded Blog Post Content
**File**: `frontend/src/lib/static-data.ts`

**Problem**: The `posts` array contained 6 hardcoded blog posts used as static fallback data.

**Fix**: Replaced the hardcoded array with an empty array:
```ts
export const posts: BlogPostAttributes[] = [];
```

---

### 3. Remove Static Blog Fallback in strapi.ts
**File**: `frontend/src/lib/strapi.ts`

**Problem**: `getBlogPosts()` and `getBlogPostBySlug()` functions fell back to importing static data when Strapi was unreachable:
```ts
const { posts } = await import("@/lib/static-data");
return { data: posts, total: posts.length };
```

**Fix**: Replaced fallback with empty returns:
```ts
// getBlogPosts fallback
return { data: [], total: 0 };

// getBlogPostBySlug fallback
return null;
```

---

### 4. Discovered PM2 as Process Manager
**Problem**: Attempts to run `npm run start` manually kept failing with `EADDRINUSE: port 3000 already in use` because PM2 was already managing the frontend process and auto-restarting it.

**Discovery**: Running `pm2 list` revealed:
- `frontend` (id: 15/16) — Next.js production server
- `strapi` (id: 0) — Strapi CMS

**Key Commands**:
```bash
pm2 list                        # List all processes
pm2 restart frontend            # Restart frontend
pm2 restart frontend --update-env  # Restart with new env vars
pm2 logs frontend --lines 30 --nostream  # View logs
pm2 logs strapi --lines 30 --nostream    # View Strapi logs
```

---

### 5. Fix PM2 Process Configuration
**Problem**: PM2 was configured to run `node .next/standalone/server.js` which failed because the standalone build wasn't present.

**Fix**: Deleted and recreated the PM2 process with correct command:
```bash
pm2 delete frontend
pm2 start npm --name frontend -- start
```

---

### 6. Fix Wrong Strapi API Token (401 Unauthorized)
**File**: `frontend/.env.local`

**Problem**: The API token in `.env.local` was a placeholder (`your_strapi_api_token_here`) and later an incorrect token from the root `.env`. All Strapi API requests were returning **401 Unauthorized**.

**Root Cause**: `.env.local` overrides `.env.production` in Next.js, and it had the wrong token.

**Fix**: Updated `.env.local` to use the correct token from `.env.production`:
```dotenv
STRAPI_API_TOKEN=cd174978ba49f4c1d74d34bef75f65f34cc810f78...
```

---

### 7. Fix Strapi URL (Content Not Showing)
**File**: `frontend/.env.local`

**Problem**: `NEXT_PUBLIC_STRAPI_URL` was set to `http://localhost:1337` in `.env.local`, but the frontend server-side code uses `STRAPI_INTERNAL_URL` first and falls back to `http://localhost:1337`. The public URL needed to be `https://cms.jiayi-tools.com`.

**Fix**: Updated `.env.local`:
```dotenv
NEXT_PUBLIC_STRAPI_URL=https://cms.jiayi-tools.com
STRAPI_INTERNAL_URL=http://localhost:1337
```

---

### 8. Remove `output: standalone` from next.config.ts
**File**: `frontend/next.config.ts`

**Problem**: `output: "standalone"` was configured for Docker deployment but caused `DYNAMIC_SERVER_USAGE` errors when running with `npm start` via PM2 (non-Docker setup).

**Fix**: Removed the `output: "standalone"` line:
```ts
// Removed:
// output: "standalone",
```

**Result**: Pages now render dynamically correctly with `npm start`.

---

### 9. Final State — All Fixes Applied

**Files Changed**:
| File | Change |
|------|--------|
| `frontend/src/lib/static-data.ts` | Emptied `industries[]` and `posts[]` arrays |
| `frontend/src/lib/strapi.ts` | Removed static fallback from `getBlogPosts` and `getBlogPostBySlug` |
| `frontend/.env.local` | Fixed API token and Strapi URLs |
| `frontend/next.config.ts` | Removed `output: "standalone"` |

**Rebuild & Restart**:
```bash
# In /frontend
npm run build

# Restart PM2
pm2 restart frontend --update-env
```

**Verified**:
- ✅ Strapi API returning HTTP 200 (was 401)
- ✅ Frontend running on port 3000 via PM2
- ✅ No more hardcoded content
- ✅ No more static fallbacks

---

## Important Notes

### Publishing Content in Strapi
Content added in Strapi admin is created as **Draft** by default.
You must **Publish** each item for it to appear on the website:
1. Go to `https://cms.jiayi-tools.com/admin`
2. Open **Content Manager** → Select content type
3. Click each item → Click **"Publish"** button (top right)

### PM2 Management
```bash
pm2 list                           # Check running processes
pm2 restart frontend --update-env  # Restart after env changes
pm2 restart strapi                 # Restart Strapi
pm2 logs frontend --lines 50 --nostream  # View frontend logs
pm2 logs strapi --lines 50 --nostream    # View Strapi logs
pm2 save                           # Save PM2 process list
```

### Rebuild Required When
- Changing any `NEXT_PUBLIC_*` environment variables
- Modifying any frontend source code
- After any changes: `npm run build` then `pm2 restart frontend --update-env`

### API Token Location
- Valid token: `frontend/.env.local` → `STRAPI_API_TOKEN`
- Same token also in `frontend/.env.production`
- Server-side fetching uses `STRAPI_INTERNAL_URL=http://localhost:1337` (direct internal connection)
- Client-side uses `NEXT_PUBLIC_STRAPI_URL=https://cms.jiayi-tools.com`

---

## Session Work Log — July 7, 2026 (continued)

---

### 10. Reduce Cache Revalidation Time
**File**: `frontend/src/lib/strapi.ts`

**Problem**: Default `revalidate = 10` seconds caused 10-20 second delay after editing content in Strapi admin.

**Fix**: Changed default revalidation from `10` to `1` second:
```ts
async function strapiGet<T>(path, params, revalidate = 1)
```

Also changed `getSiteSettings()` from `3600` (1 hour) to `1` second so contact info and social links update immediately.

---

### 11. Add Homepage Settings (Featured Industries)
**New files**:
- `backend/src/api/homepage-setting/content-types/homepage-setting/schema.json`
- `backend/src/api/homepage-setting/controllers/homepage-setting.js`
- `backend/src/api/homepage-setting/services/homepage-setting.js`
- `backend/src/api/homepage-setting/routes/homepage-setting.js`

**Problem**: The 4 featured industries on the homepage were hardcoded with slugs `["aerospace", "automotive", "hydraulics", "electronics"]`.

**Fix**: Created a new `Homepage Settings` Single Type in Strapi with a `featuredIndustries` relation field. Added `getFeaturedIndustries()` to `strapi.ts`. Updated homepage to use Strapi data with fallback to hardcoded slugs.

**Bug Fixed**: Initial controller/service/route files used wrong Strapi v5 factory functions (`createSingleTypeService`) causing Strapi to crash with 502. Fixed to use correct factories:
```js
factories.createCoreController(...)
factories.createCoreService(...)
factories.createCoreRouter(...)
```

**How to use**: Go to **Content Manager → Homepage Settings** → Pick up to 4 industries in `featuredIndustries` → Save.

---

### 12. Fix Industry Card Images on Homepage
**File**: `frontend/src/app/[locale]/page.tsx`

**Problem**: Industry cards on homepage showed grid-pattern placeholder instead of images. The page was using `INDUSTRY_IMAGES[ind.slug]` (local static map) but not checking Strapi images.

**Fix**: Updated image priority:
1. Strapi image (`extractImageUrl(ind.image)`) — first
2. Local static image (`INDUSTRY_IMAGES[ind.slug]`) — fallback
3. Grid placeholder — if neither exists

---

### 13. Fix Industry Card Link
**File**: `frontend/src/app/[locale]/page.tsx`

**Problem**: Clicking industry cards navigated to `/products/${ind.category}`.

**Fix**: Changed link to `/industries` for all 4 cards.

---

### 14. Add Show/Hide Controls for Contact Info & Social Links
**Files changed**:
- `backend/src/api/site-setting/content-types/site-setting/schema.json`
- `frontend/src/types/strapi.ts`
- `frontend/src/lib/strapi.ts`
- `frontend/src/app/[locale]/layout.tsx`
- `frontend/src/components/site/Header.tsx`
- `frontend/src/components/site/Footer.tsx`

**Problem**: Phone numbers, email, address, and social links in Header and Footer were all hardcoded in the components. No way to edit or hide them from Strapi admin.

**Fix**:
1. Added show/hide boolean fields to Strapi `site-setting` schema:
   - `showPhone1`, `showPhone2`, `showEmail`, `showAddress`
   - `showLinkedin`, `showFacebook`, `showYoutube`, `showInstagram`
2. Updated `SiteSettingAttributes` TypeScript type with new fields
3. Updated layout to fetch `siteSettings` and pass to Header and Footer
4. Updated Header and Footer to:
   - Read contact info and social URLs from Strapi
   - Conditionally show/hide each item based on the boolean toggles

**How to use**: Go to **Content Manager → Site Settings**:
- Edit phone, email, address, social URLs
- Toggle `showPhone1`, `showEmail`, etc. to show/hide each item
- Click **Save** — appears on site within 1 second

---

## Full File Change Summary (Both Sessions)

| File | What Changed |
|------|-------------|
| `frontend/src/lib/static-data.ts` | Emptied `industries[]` and `posts[]` |
| `frontend/src/lib/strapi.ts` | Removed static fallbacks, added `getFeaturedIndustries()`, reduced cache to 1s |
| `frontend/src/types/strapi.ts` | Added show/hide fields to `SiteSettingAttributes` |
| `frontend/src/app/[locale]/layout.tsx` | Added `getSiteSettings()`, pass to Header/Footer |
| `frontend/src/app/[locale]/page.tsx` | Use `getFeaturedIndustries()`, fix image logic, fix link to /industries |
| `frontend/src/components/site/Header.tsx` | Use Strapi data for contact info and social links |
| `frontend/src/components/site/Footer.tsx` | Use Strapi data for contact info and social links |
| `frontend/next.config.ts` | Removed `output: standalone` |
| `frontend/.env.local` | Fixed API token and Strapi URLs |
| `backend/src/api/site-setting/content-types/site-setting/schema.json` | Added show/hide boolean fields |
| `backend/src/api/homepage-setting/` | New Single Type for featured industries |
