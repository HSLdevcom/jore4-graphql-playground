#!/bin/bash

WD=$(dirname "$0")
cd "${WD}"
HASURA=${HASURA_URL:-"localhost:8080"}

echo "Generating graphql schema. Please make sure that hasura instance is running at ${HASURA}"

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://${HASURA}/healthz)" != "200" ]]; do echo "Waiting for hasura instance..."; sleep 5; done

../node_modules/graphqurl/bin/run "http://${HASURA}/v1beta1/relay" --introspect > ../schema.graphql
echo "Done"
