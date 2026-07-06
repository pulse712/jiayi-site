# JIAYI TOOL — Deployment Guide

Complete step-by-step instructions for deploying the Next.js + Strapi + PostgreSQL stack
on a fresh Hostinger KVM 2 VPS (Ubuntu 24.04 LTS).

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [VPS Initial Setup](#3-vps-initial-setup)
4. [Install Docker](#4-install-docker)
5. [Upload the Project](#5-upload-the-project)
6. [Configure Environment Variables](#6-configure-environment-variables)
7. [Issue SSL Certificates](#7-issue-ssl-certificates)
8. [First Boot — Start All Services](#8-first-boot--start-all-services)
9. [Create the First Strapi Admin User](#9-create-the-first-strapi-admin-user)
10. [Generate a Strapi API Token](#10-generate-a-strapi-api-token)
11. [Seed Initial Content](#11-seed-initial-content)
12. [Verify the Live Site](#12-verify-the-live-site)
13. [Day-to-Day: Managing Content in Strapi](#13-day-to-day-managing-content-in-strapi)
14. [Uploading 200 Products via Spreadsheet](#14-uploading-200-products-via-spreadsheet)
15. [SSL Certificate Renewal](#15-ssl-certificate-renewal)
16. [Updating the Site](#16-updating-the-site)
17. [Backups](#17-backups)
18. [Troubleshooting](#18-troubleshooting)

---

## 1. Architecture Overview

```
Browser
  │
  ▼
Nginx (ports 80 / 443)  ←── Let's Encrypt SSL
  ├── jiayi-tool.com       →  Next.js  (container: frontend, port 3000)
  └── cms.jiayi-tool.com   →  Strapi   (container: strapi,   port 1337)
                                              │
                                        PostgreSQL (container: postgres, port 5432)
```

| Service   | Container       | Internal port | Public URL                          |
|-----------|-----------------|---------------|-------------------------------------|
| Next.js   | jiayi_frontend  | 3000          | https://jiayi-tool.com              |
| Strapi    | jiayi_strapi    | 1337          | https://cms.jiayi-tool.com          |
| Postgres  | jiayi_postgres  | 5432          | Not exposed publicly                |
| Nginx     | jiayi_nginx     | 80 / 443      | —                                   |

---

## 2. Prerequisites

Before starting, make sure you have:

- [ ] Hostinger KVM 2 VPS with **Ubuntu 24.04 LTS** and root/sudo access
- [ ] A domain name pointed at the VPS IP (A records for both `jiayi-tool.com` and `cms.jiayi-tool.com`)
- [ ] SSH access to the VPS
- [ ] This project folder on your local machine

**DNS records to create in your domain registrar / Hostinger:**

| Type | Name                | Value          |
|------|---------------------|----------------|
| A    | @  (jiayi-tool.com) | `YOUR_VPS_IP`  |
| A    | www                 | `YOUR_VPS_IP`  |
| A    | cms                 | `YOUR_VPS_IP`  |

Wait for DNS propagation before requesting SSL certificates (usually 5–30 minutes).

---

## 3. VPS Initial Setup

SSH into the VPS:

```bash
ssh root@YOUR_VPS_IP
```

Update the system and install basic tools:

```bash
apt update && apt upgrade -y
apt install -y curl wget git ufw fail2ban
```

Configure the firewall:

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
ufw status
```

Create a non-root deploy user (optional but recommended):

```bash
adduser deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
```

---

## 4. Install Docker

```bash
# Add Docker's official GPG key and repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Allow the deploy user to run Docker without sudo
usermod -aG docker deploy

# Verify
docker --version
docker compose version
```

---

## 5. Upload the Project

From your **local machine**, upload the project to the VPS:

```bash
# From the parent directory of Jiayi-Website-Next
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.tmp' \
  Jiayi-Website-Next/ deploy@YOUR_VPS_IP:/home/deploy/jiayi/
```

Or use git if you push to a repository:

```bash
# On the VPS
git clone https://github.com/YOUR_ORG/jiayi-tool.git /home/deploy/jiayi
```

---

## 6. Configure Environment Variables

On the VPS, navigate to the project root and create the `.env` file:

```bash
cd /home/deploy/jiayi
cp .env.example .env
nano .env
```

Fill in every value. Use this command to generate secure random secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

The `.env` file must look like this (replace every `REPLACE_...` value):

```dotenv
# Strapi secrets — generate 4 separate keys for APP_KEYS
APP_KEYS=key1Base64,key2Base64,key3Base64,key4Base64
API_TOKEN_SALT=yourRandomBase64String
ADMIN_JWT_SECRET=yourRandomBase64String
TRANSFER_TOKEN_SALT=yourRandomBase64String
JWT_SECRET=yourRandomBase64String

# Database
DATABASE_NAME=jiayi
DATABASE_USERNAME=jiayi
DATABASE_PASSWORD=aStrongPasswordHere

# URLs — must match your domain
SITE_URL=https://jiayi-tool.com
CMS_URL=https://cms.jiayi-tool.com

# Leave blank for now — fill in after Step 10
STRAPI_API_TOKEN=
```

---

## 7. Issue SSL Certificates

SSL certificates must be issued **before** starting Nginx in HTTPS mode.

### Step 7a — Start Nginx in HTTP-only mode first

Temporarily edit the Nginx config to serve HTTP only (skip SSL):

```bash
# Comment out the HTTPS server blocks temporarily by running:
nano nginx/conf.d/jiayi-tool.conf
```

Comment out the two `server { listen 443 ... }` blocks (add `#` at the start of each line),
then start only Nginx:

```bash
docker compose up -d nginx
```

### Step 7b — Issue certificates via Certbot

```bash
# Issue cert for the main domain
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email admin@jiayi-tool.com \
  --agree-tos \
  --no-eff-email \
  -d jiayi-tool.com \
  -d www.jiayi-tool.com

# Issue cert for the CMS subdomain
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email admin@jiayi-tool.com \
  --agree-tos \
  --no-eff-email \
  -d cms.jiayi-tool.com
```

### Step 7c — Re-enable HTTPS in Nginx config

Uncomment the HTTPS server blocks in `nginx/conf.d/jiayi-tool.conf`, then reload:

```bash
docker compose restart nginx
```

---

## 8. First Boot — Start All Services

```bash
cd /home/deploy/jiayi

# Build images and start everything
docker compose up -d --build

# Watch logs to confirm everything starts cleanly
docker compose logs -f
```

Expected startup sequence:
1. `postgres` starts and becomes healthy (~10 s)
2. `strapi` connects to Postgres and migrates the schema (~60 s)
3. `frontend` builds the Next.js server (~40 s)
4. `nginx` begins proxying traffic

Check all containers are running:

```bash
docker compose ps
```

All four containers (`postgres`, `strapi`, `frontend`, `nginx`) should show `Up (healthy)`.

---

## 9. Create the First Strapi Admin User

Open `https://cms.jiayi-tool.com/admin` in your browser.

Strapi will show a **"Create your first Administrator"** screen.

Fill in:
- First name, Last name
- Email: e.g. `admin@jiayi-tool.com`
- Password: a strong password (save it in a password manager)

Click **"Let's start"**.

> This is the login the client will use to manage all website content.

---

## 10. Generate a Strapi API Token

This token lets Next.js fetch content from Strapi securely.

1. In the Strapi admin panel, go to **Settings → API Tokens → Create new API Token**
2. Fill in:
   - Name: `Next.js Frontend`
   - Token type: `Read-only`
   - Token duration: `Unlimited`
3. Click **Save** and **copy the token immediately** (it is shown only once)
4. On the VPS, add the token to `.env`:

```bash
nano /home/deploy/jiayi/.env
# Set: STRAPI_API_TOKEN=the_token_you_just_copied
```

5. Rebuild the frontend container to apply the new env:

```bash
docker compose up -d --build frontend
```

---

## 11. Seed Initial Content

The seed scripts pre-populate Strapi with the 7 product categories, 8 industries, and 6 blog posts from the original site.

```bash
# Enter the running Strapi container
docker compose exec strapi sh

# Inside the container, run each seed script
node -e "
const strapi = require('@strapi/strapi');
strapi.compile().then(() => strapi({ distDir: './dist' }).load()).then(async (app) => {
  const { seed } = require('./database/seeds/01-categories');
  await seed(app);
  const { seed: seed2 } = require('./database/seeds/02-industries');
  await seed2(app);
  const { seed: seed3 } = require('./database/seeds/03-blog-posts');
  await seed3(app);
  process.exit(0);
});
"

# Exit the container
exit
```

After seeding, go to the Strapi admin and **publish** all Categories, Industries, and Blog Posts
(they are created as drafts by default):

1. **Content Manager → Category** → Select all → Publish
2. **Content Manager → Industry** → Select all → Publish
3. **Content Manager → Blog Post** → Select all → Publish

---

## 12. Verify the Live Site

| Check | URL | Expected result |
|-------|-----|-----------------|
| Homepage | https://jiayi-tool.com | Loads with hero, industries, capabilities |
| Spanish version | https://jiayi-tool.com/es | All text switches to Spanish |
| Products | https://jiayi-tool.com/products | 7 category cards |
| Category | https://jiayi-tool.com/products/cavity-tools | Product grid with filters |
| Blog | https://jiayi-tool.com/blog | 6 article cards |
| Blog post | https://jiayi-tool.com/blog/cavity-tool-sun-hydraulics-t-series | Full article |
| Sitemap | https://jiayi-tool.com/sitemap.xml | Valid XML with all URLs |
| Robots | https://jiayi-tool.com/robots.txt | Allows / , disallows /api/ |
| CMS admin | https://cms.jiayi-tool.com/admin | Login screen |
| Quote form | https://jiayi-tool.com/quote | Form submits, entry appears in Strapi |

---

## 13. Day-to-Day: Managing Content in Strapi

The admin panel at `https://cms.jiayi-tool.com/admin` works like WordPress.

### Adding a new product

1. Go to **Content Manager → Product → Create new entry**
2. Fill in: Code, Name, Spec, Standard, Material, Coating
3. Upload a product image (drag and drop into the Image field)
4. Assign a Category (select from dropdown)
5. Click **Save**, then **Publish**
6. The product appears on the website immediately (ISR cache refreshes within 60 seconds)

### Adding a blog post

1. **Content Manager → Blog Post → Create new entry**
2. Fill in: Title, Slug (auto-generated), Excerpt, Date, Category, Author, Read Time
3. In the **Content** field (JSON), add the article sections following this structure:
```json
[
  { "heading": "Section title", "body": "Paragraph text here." },
  { "heading": "Another section", "body": "More text.", "bullets": ["Point 1", "Point 2"] }
]
```
4. Upload a cover image, then **Save → Publish**

### Adding a Spanish translation

1. Open any entry (e.g. a Product)
2. In the top-right corner, click the locale switcher and select **es (Spanish)**
3. Fill in the translated fields
4. **Save → Publish**

### Editing site-wide settings

1. **Content Manager → Site Settings**
2. Edit phone numbers, email, address, social links, footer tagline
3. **Save** (no publish step — this is a Single Type with draft/publish disabled)

### Viewing quote requests

1. **Content Manager → Quote Request**
2. All RFQ form submissions appear here with status (new / in_review / quoted / won / lost)
3. Update the status as you work through each inquiry

### Viewing contact messages

1. **Content Manager → Contact Message**
2. Messages show as `unread` by default — change to `read` or `replied` after responding

---

## 14. Uploading 200 Products via Spreadsheet

For bulk importing the full product catalogue, use the Strapi Import/Export plugin or a CSV script.

### Option A — Strapi admin bulk import (recommended)

1. Install the community plugin:
```bash
docker compose exec strapi npm install strapi-plugin-import-export-entries
docker compose restart strapi
```
2. In admin → **Plugins → Import/Export** → Import
3. Upload a CSV with columns: `code, name, spec, standard, material, coating, category_slug`

### Option B — Script import

Prepare a CSV file `products.csv` with headers:
```
code,name,spec,standard,material,coating,category_slug
JY-CAV-1000,T-11A Cavity Tool,Ø22.23 × 90mm OAL,Sun Hydraulics,Carbide,TiAlN,cavity-tools
JY-CAV-1017,T-2A Cavity Tool,Ø9.53 × 75mm OAL,Sun Hydraulics,Carbide,AlTiN,cavity-tools
...
```

Then run the import script on the VPS:
```bash
# Copy the CSV to the container
docker cp products.csv jiayi_strapi:/app/products.csv

# Run the import
docker compose exec strapi node -e "
const fs = require('fs');
const csv = require('csv-parse/sync');

async function run() {
  const strapi = await require('@strapi/strapi').compile()
    .then(c => require('@strapi/strapi')({ distDir: './dist' }).load());

  const rows = csv.parse(fs.readFileSync('/app/products.csv'), { columns: true, skip_empty_lines: true });

  for (const row of rows) {
    const category = await strapi.query('api::category.category')
      .findOne({ where: { slug: row.category_slug } });

    await strapi.query('api::product.product').create({
      data: {
        code: row.code,
        name: row.name,
        spec: row.spec,
        standard: row.standard,
        material: row.material,
        coating: row.coating,
        category: category?.id,
        publishedAt: new Date(),
      }
    });
    console.log('Imported:', row.code);
  }
  process.exit(0);
}
run().catch(console.error);
"
```

---

## 15. SSL Certificate Renewal

Certbot runs automatically inside the `certbot` container and renews certificates every 12 hours.

To manually trigger renewal:

```bash
docker compose run --rm certbot renew
docker compose restart nginx
```

Certificates expire after 90 days. With the certbot container running, renewal is fully automatic.

---

## 16. Updating the Site

### Frontend code change

```bash
cd /home/deploy/jiayi

# Pull latest code
git pull

# Rebuild and restart only the frontend
docker compose up -d --build frontend
```

### Backend (Strapi) change

```bash
docker compose up -d --build strapi
```

### Full stack update

```bash
docker compose up -d --build
```

### Zero-downtime deploy (advanced)

For zero-downtime updates, build the new image first, then swap:

```bash
docker compose build frontend
docker compose up -d --no-deps frontend
```

---

## 17. Backups

### Automatic database backup (set up as a cron job)

```bash
# On the VPS, add to crontab (runs every day at 2 AM)
crontab -e
```

Add this line:
```cron
0 2 * * * docker compose -f /home/deploy/jiayi/docker-compose.yml exec -T postgres \
  pg_dump -U jiayi jiayi | gzip > /home/deploy/backups/jiayi_$(date +\%Y\%m\%d).sql.gz
```

Create the backup directory:
```bash
mkdir -p /home/deploy/backups
```

### Manual backup

```bash
# Database dump
docker compose exec -T postgres pg_dump -U jiayi jiayi > backup_$(date +%Y%m%d).sql

# Strapi uploads (product images, drawings, etc.)
docker cp jiayi_strapi:/app/public/uploads ./uploads_backup_$(date +%Y%m%d)
```

### Restore from backup

```bash
# Restore database
docker compose exec -T postgres psql -U jiayi jiayi < backup_20260101.sql

# Restore uploads
docker cp ./uploads_backup_20260101 jiayi_strapi:/app/public/uploads
```

---

## 18. Troubleshooting

### Container won't start

```bash
# See detailed logs for a specific container
docker compose logs strapi --tail=100
docker compose logs frontend --tail=100
docker compose logs postgres --tail=100
docker compose logs nginx --tail=100
```

### Strapi can't connect to database

Check the database password in `.env` matches `DATABASE_PASSWORD`.
Check the postgres container is healthy: `docker compose ps postgres`

### Next.js shows stale data

The Strapi API client uses ISR with a 60-second revalidation window.
To force an immediate refresh:

```bash
docker compose restart frontend
```

### 502 Bad Gateway from Nginx

One of the upstream services isn't healthy yet. Check:
```bash
docker compose ps
# Wait until all containers show (healthy)
```

### SSL certificate error

```bash
# Check cert files exist
docker compose exec nginx ls /etc/letsencrypt/live/

# Re-issue if missing
docker compose run --rm certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  -d jiayi-tool.com -d www.jiayi-tool.com
docker compose restart nginx
```

### Strapi admin panel not loading (white screen)

```bash
# Rebuild admin panel
docker compose exec strapi npm run build
docker compose restart strapi
```

### Out of disk space

```bash
# Check disk usage
df -h

# Remove unused Docker images and containers
docker system prune -af --volumes
```

---

## Quick Reference

```bash
# Start everything
docker compose up -d

# Stop everything
docker compose down

# Restart a single service
docker compose restart frontend

# View live logs
docker compose logs -f

# Enter a container shell
docker compose exec strapi sh
docker compose exec frontend sh
docker compose exec postgres psql -U jiayi jiayi

# Full rebuild
docker compose up -d --build

# Check container status
docker compose ps
```

---

*Last updated: July 2026*
*Stack: Next.js 15 · Strapi 5 · PostgreSQL 16 · Nginx 1.27 · Docker · Ubuntu 24.04*
