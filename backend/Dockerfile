# Use Node.js 14 as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ./backend .

# Build TypeScript
RUN npm run build

COPY ./backend/dist ./
COPY ./backend/.env.development ./
COPY ./backend/.env.production ./

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/app.js"]