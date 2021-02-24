FROM node:15.10.0-alpine3.12
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
EXPOSE 3000
CMD ["yarn", "start"]
