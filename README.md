# JIAYI TOOL — Website

B2B precision cutting tools manufacturer website.
Built with **Next.js 15** (App Router, SSR) + **Strapi 5** (CMS) + **PostgreSQL 16**.

## Project Structure

```
Jiayi-Website-Next/
├── frontend/          Next.js 15 site (all 13 pages, EN/ES i18n, SSR)
├── backend/           Strapi 5 CMS (admin panel + REST API)
├── nginx/             Nginx reverse proxy config
├── docker-compose.yml Production deployment
├── docker-compose.dev.yml  Local dev (PostgreSQL only)
├── .env.example       Environment variable template
└── DEPLOYMENT.md      Full step-by-step deployment guide
```

## Local Development

### 1. Start the database

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 2. Start Strapi (CMS backend)

```bash
cd backend
npm install
cp .env .env.local   # already configured for SQLite in dev
npm run develop
# Admin panel: http://localhost:1337/admin
```

### 3. Start Next.js (frontend)

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Set NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
npm run dev
# Site: http://localhost:3000
```

## Production Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the complete VPS setup guide.

Quick start (after SSH into VPS and configuring `.env`):

```bash
docker compose up -d --build
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, App Router, TypeScript, Tailwind CSS v3, next-intl |
| CMS / Admin | Strapi 5, REST API, i18n plugin |
| Database | PostgreSQL 16 |
| Proxy | Nginx 1.27, Let's Encrypt SSL |
| Deployment | Docker Compose, Ubuntu 24.04 |

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, industries, capabilities, stats |
| `/about` | Company story, equipment, values |
| `/industries` | 8 industry sectors |
| `/products` | Product category grid |
| `/products/[category]` | Category product list with filters |
| `/services` | Custom tooling, OEM/ODM, regrinding |
| `/quality` | ISO 9001, inspection workflow |
| `/blog` | Technical articles index |
| `/blog/[slug]` | Full article with tables/data |
| `/contact` | Contact form + map |
| `/quote` | RFQ form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

All pages available in `/en` (default) and `/es` (Spanish).

## Content Types (Strapi)

| Type | Description |
|---|---|
| Category | Product categories (7) |
| Product | Individual tools (200+) |
| Industry | Industries served (8) |
| Blog Post | Technical articles |
| Quote Request | RFQ form submissions |
| Contact Message | Contact form submissions |
| Site Settings | Global: phone, email, address, social links |
