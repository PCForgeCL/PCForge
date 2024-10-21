FROM node:14

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]  # Cambia 'index.js' por el archivo principal de tu app