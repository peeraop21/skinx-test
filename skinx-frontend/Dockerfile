# Use Node.js 14 as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./skinx-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ./skinx-frontend .

# Build the React app
RUN npm run build

# Expose the port
EXPOSE 4173

# Command to run the application
CMD ["npm", "run", "preview"]