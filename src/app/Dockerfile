FROM node:14

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
#CMD ["sh", "-c", "node /app/src/seeds/01-seeds.js && node index.js"]