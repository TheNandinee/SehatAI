# Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Production Stage (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Default Nginx config usually works for SPA, 
# but for React Router you might need a custom nginx.conf to handle fallback to index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]