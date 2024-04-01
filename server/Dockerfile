# Use a Node.js base image
FROM node:20.11.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN npm run build

# Expose port 3000
EXPOSE 5000

# Start the Node.js app
CMD ["npm", "start"]
