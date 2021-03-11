# jore4-graphql-playground

An experiment with GraphQL and maps.

Currently its only function is to demonstrate how GraphQL may ease frontend development.

## Quickstart

```sh
docker-compose up --build
```

Open http://localhost:1234 in two different browsers and wait for the backend to initialize itself.
Then click away on the map and the created markers.

## So what?

Clicking, dragging or deleting new points on the map within either browser window causes both views to get updated.

Some assumed benefits:

- The UI stays synchronized with the state of the backend.
- The React component [responsible for showing the points](frontend/src/components/CircleLayer.tsx) has little extra fluff.
- Server-side state caching in the frontend is handled by the GraphQL client library.
- Only state changes relevant for each subscription is sent from the server to each client.
- No polling code is needed in the frontend due to GraphQL subscriptions.

## Development

To play with the GraphQL API or to modify the backend, it is easiest to use the Hasura admin UI ("console").

To play around, in 2 minutes:

1. Set `HASURA_GRAPHQL_ENABLE_CONSOLE` to `"true"` in [`docker-compose.yml`](docker-compose.yml).
1. Open http://localhost:8080 to access the console.
   The default admin secret is also in `docker-compose.yml`.
   The initial view opens up with a beefed-up GraphiQL.

To contribute, in 10 minutes:

1. Leave `HASURA_GRAPHQL_ENABLE_CONSOLE` as `"false"` in `docker-compose.yml`.
1. Install [Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html).
1. Create `.env` with at least `HASURA_GRAPHQL_ADMIN_SECRET`.
   This will be utilized in `docker-compose.yml`.
1. Groan... to have `hasura/config.yml` in `hasura/` and to still use `.env` with Hasura CLI: `ln -s "$(pwd)/.env" hasura/.env`
1. `cd hasura/`
1. Run `hasura console` to start the console.
1. Run `hasura migrate ...` to read or write DB migration files.
1. Run `hasura metadata ...` to read or write Hasura configuration.

To iterate on the frontend faster, run `docker compose up -d hasura` in project root and `yarn start` in `frontend` directory.

### Frontend development

To update generate updated graphql schema for relay:
`yarn schema:update` (needs to be updated every time our api's schema changes)
To keep relay running for watching graphql query changes:
`yarn relay --watch`
