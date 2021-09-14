FROM node:16.9.1-alpine3.12 AS build
RUN apk --no-cache add curl
WORKDIR /app
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public
COPY --chown=node:node tsconfig.json relay.config.js schema.graphql .prettierignore ./
ARG REACT_APP_GIT_HASH=unknown
RUN yarn build

FROM nginx:1.19.6-alpine
EXPOSE 80
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
