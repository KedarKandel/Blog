# Use a Node.js base image
FROM node:20.11.0-alpine as alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


CMD [ "npm", "run", "dev" ]
