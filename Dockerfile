FROM node:23-alpine3.20
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 
