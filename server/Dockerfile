FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./yarn.lock ./
COPY . .

RUN yarn install

CMD ["node", "index.js"]
