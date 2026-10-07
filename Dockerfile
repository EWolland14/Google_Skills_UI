# ========================================================
# Google Cloud Run Multi-Stage Production Dockerfile
# ========================================================

# Stage 1: Build Frontend Assets
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Lean Production Runtime for Cloud Run
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

# Copy built frontend bundle from builder stage
COPY --from=builder /app/dist ./dist
COPY server.js ./

# Cloud Run listens on port 8080 by default
EXPOSE 8080

CMD ["node", "server.js"]
