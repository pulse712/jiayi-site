# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (including dev — needed for strapi build)
COPY package.json ./
RUN npm install --legacy-peer-deps

# Copy source and build Strapi admin panel
COPY . .
RUN npm run build

# ── Stage 2: Production image ─────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Only install production dependencies
COPY package.json ./
RUN npm install --omit=dev --legacy-peer-deps

# Copy built output from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/.strapi ./.strapi
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/database ./database
COPY --from=builder /app/public ./public

# Strapi uploads (will be overwritten by Docker volume mount)
RUN mkdir -p public/uploads

EXPOSE 1337

CMD ["node", "node_modules/.bin/strapi", "start"]
