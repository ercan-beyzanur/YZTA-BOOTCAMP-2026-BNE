# 1. Aşama: Build aşaması (daha kararlı node:20-alpine imajı kullanıyoruz)
FROM node:20-alpine AS build

WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package*.json ./

# Platform kilitlerini yok sayıp Linux mimarisine uygun sıfır kurulum yap
RUN npm install --platform=linux --arch=x64

# Tüm kaynak kodları kopyala
COPY . .

# Production build al
RUN npm run build

# 2. Aşama: Sunum aşaması (Nginx)
FROM nginx:alpine

# Derlenen Vite çıktılarını Nginx'e aktar
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]