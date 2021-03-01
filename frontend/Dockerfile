FROM node:15.8.0-alpine3.12 AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk --no-cache add curl
RUN yarn install --frozen-lockfile

FROM dependencies AS code
WORKDIR /app
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public
COPY --chown=node:node tsconfig.json relay.config.js schema.graphql .prettierignore ./

FROM code AS build
RUN yarn build
COPY ./build/ ./app/build

FROM nginx:1.19.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
