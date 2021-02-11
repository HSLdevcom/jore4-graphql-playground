FROM node:15.8.0-alpine3.12
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
EXPOSE 3000
RUN yarn start
