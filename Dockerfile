FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN npm --prefix server install

# Build frontend
COPY client ./client
RUN cd client && npm install && npm run build

# Copy server
COPY server ./server

EXPOSE 5000

ENV NODE_ENV=production

CMD ["npm", "--prefix", "server", "start"]
