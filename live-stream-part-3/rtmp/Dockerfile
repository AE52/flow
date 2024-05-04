FROM tiangolo/nginx-rtmp

# Nginx ayarlarını kopyala
COPY nginx.conf /etc/nginx/nginx.conf

# Web uygulaması için Node.js imajından başlayarak çalış
FROM node:12

# Çalışma dizini ve gerekli dosyaları kopyala
WORKDIR /www/
COPY index.html /www/
COPY livestreaming.html /www/
COPY package*.json ./

# Paketleri yükle
RUN npm install

# Node.js uygulamasını çalıştır
COPY auth.js ./
CMD ["npm", "start"]
