FROM node:23-alpine3.20 AS build
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
FROM nginx:1.23-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
