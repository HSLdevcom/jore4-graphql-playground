# jore4-graphql-playground

An experiment with GraphQL and maps.

Currently its only function is to demonstrate how GraphQL subscriptions may ease frontend development.

## Quickstart

```sh
docker-compose up --build
```

Open http://localhost/ in two different browsers and wait for the backend to initialize itself.
Then click away on the map.

## So what?

Clicking new points on the map within either browser window causes both views to get updated.

Some assumed benefits:
- The UI stays synchronized with the state of the backend.
- The React component [responsible for showing the points](frontend/src/components/CircleLayer.tsx) consists solely of specifying the GraphQL subscription and how to display the received data.
- Server-side state caching in the frontend is handled by the GraphQL client library.
- Only state changes relevant for each subscription is sent from the server to each client.
- No polling code is needed in the frontend due to GraphQL subscriptions.
