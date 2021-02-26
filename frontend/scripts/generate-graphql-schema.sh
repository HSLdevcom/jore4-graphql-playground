#!/bin/bash

WD=$(dirname "$0")
cd "${WD}"

echo "Generating graphql schema. Please make sure that hasura instance is running at port 8080"

../node_modules/graphqurl/bin/run http://localhost:8080/v1beta1/relay --introspect > ../schema.graphql
echo "Done"
