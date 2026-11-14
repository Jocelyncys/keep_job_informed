# Multi-stage Dockerfile for Google Cloud Run
# Stage 1: Build the React/Vite app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project source files
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Serve using high-performance lightweight Nginx Alpine
FROM nginx:alpine

# Copy custom nginx configuration tailored for Google Cloud Run (port 8080)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run defaults to listening on port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
