# Use a Node.js base image
FROM node:20.11.0-alpine as alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./


RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN npm run build


# Start the Node.js app
CMD ["npm", "start"]
