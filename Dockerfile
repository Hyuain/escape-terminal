FROM node:16
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install pnpm -g
RUN pnpm install
COPY . .
RUN pnpm run build

FROM nginx:1.23.4
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]
