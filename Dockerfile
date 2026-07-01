# Third Hand AI — full-stack (Express + React) Docker image for Coolify
# Frontend -> dist/public, server bundle -> dist/index.js (npm run build)
FROM node:20-slim

# Postgres istemcisi (pg) için gerekli sistem kütüphaneleri zaten node imajında var.
WORKDIR /app

# Bağımlılıkları önce kur (katman önbelleği için)
COPY package*.json ./
RUN npm ci

# Kaynağı kopyala ve derle (frontend + server bundle)
COPY . .
RUN npm run build

ENV NODE_ENV=production
# Sunucu PORT ortam değişkenini kullanır; Coolify bunu otomatik verir (varsayılan 5001).
ENV PORT=5001
EXPOSE 5001

# Uygulamayı başlat. Veritabanı şemasını ilk kurulumda bir kez oluşturmak için
# Coolify terminalinden `npm run db:setup` çalıştırın (db:push + seed).
CMD ["npm", "run", "start"]
