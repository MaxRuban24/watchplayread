FROM node:18-alpine as builder
WORKDIR /app
COPY ./package.json ./yarn.lock ./
COPY . .
RUN yarn install
