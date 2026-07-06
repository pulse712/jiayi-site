#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# JIAYI TOOL — No-Docker Deploy Script
# Runs: PostgreSQL (system), Strapi + Next.js (PM2), Nginx (system)
# Usage: bash deploy.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e  # Exit on any error

PROJECT_DIR="/home/vpsuser/Downloads/Jiayi-Website-Next"
cd "$PROJECT_DIR"

echo ""
echo "═══════════════════════════════════════════"
echo "  JIAYI TOOL — Deploying without Docker"
echo "═══════════════════════════════════════════"
echo ""

# ── 0. Stop Docker containers if running ────────────────────────────────────
echo "→ Stopping Docker containers if any..."
docker compose down 2>/dev/null || true
echo "✓ Docker stopped"

# ── 1. Install Node.js if needed ──────────────────────────────────────────────
if ! command -v node &> /dev/null; then
  echo "→ Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
echo "✓ Node $(node -v)"

# ── 2. Install PM2 if needed ──────────────────────────────────────────────────
if ! command -v pm2 &> /dev/null; then
  echo "→ Installing PM2..."
  npm install -g pm2
fi
echo "✓ PM2 $(pm2 -v)"

# ── 3. Install Nginx if needed ────────────────────────────────────────────────
if ! command -v nginx &> /dev/null; then
  echo "→ Installing Nginx..."
  apt-get install -y nginx
fi
echo "✓ Nginx installed"

# ── 4. Install PostgreSQL if needed ──────────────────────────────────────────
if ! command -v psql &> /dev/null; then
  echo "→ Installing PostgreSQL..."
  apt-get install -y postgresql postgresql-contrib
  systemctl enable postgresql
  systemctl start postgresql

  echo "→ Creating database and user..."
  sudo -u postgres psql -c "CREATE USER jiayi WITH PASSWORD '2839f56f27add2d121b60201a69ec761';" 2>/dev/null || true
  sudo -u postgres psql -c "CREATE DATABASE jiayi OWNER jiayi;" 2>/dev/null || true
fi
echo "✓ PostgreSQL ready"

# ── 5. Build Strapi backend ───────────────────────────────────────────────────
echo ""
echo "→ Building Strapi..."
cd "$PROJECT_DIR/backend"
npm install --legacy-peer-deps
NODE_ENV=production npm run build
echo "✓ Strapi built"

# ── 6. Build Next.js frontend ────────────────────────────────────────────────
echo ""
echo "→ Building Next.js..."
cd "$PROJECT_DIR/frontend"
npm install --legacy-peer-deps
NODE_ENV=production npm run build
echo "✓ Next.js built"

# ── 7. Configure Nginx ───────────────────────────────────────────────────────
echo ""
echo "→ Configuring Nginx..."
# Remove default nginx site
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# Copy our nginx config
cp "$PROJECT_DIR/nginx/nginx.conf" /etc/nginx/nginx.conf
cp "$PROJECT_DIR/nginx/conf.d/jiayi-tool.conf" /etc/nginx/conf.d/jiayi-tool.conf

# Test nginx config
nginx -t
systemctl reload nginx
echo "✓ Nginx configured"

# ── 8. Start/Restart apps with PM2 ───────────────────────────────────────────
echo ""
echo "→ Starting apps with PM2..."
cd "$PROJECT_DIR"
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup 2>/dev/null || true
echo "✓ PM2 apps started"

# ── 9. Show status ────────────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════"
echo "  DEPLOY COMPLETE"
echo "═══════════════════════════════════════════"
echo ""
pm2 status
echo ""
echo "  Frontend:  https://jiayi-tools.com"
echo "  CMS Admin: https://cms.jiayi-tools.com/admin"
echo ""
