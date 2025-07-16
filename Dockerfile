FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

# Copy all other files
COPY . .

# Expose your port (e.g., 8000)
EXPOSE 8000

# Run with ts-node-dev for hot reload
CMD ["pnpm", "dev"]
