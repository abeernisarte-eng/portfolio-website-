FROM node:18-alpine

WORKDIR /app

# Install build deps
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

RUN npm install --production

# Copy source and build
COPY . .
RUN npm run prisma:generate || true
RUN npm run build

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "dist/server.js"]
