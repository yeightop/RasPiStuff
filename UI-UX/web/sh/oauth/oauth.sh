#!/bin/bash

# Example: Post OAuth request output results
# curl -X POST -H "Content-Type: application/json" -d "@body.json" https://cpht.auth0.com/oauth/ro

# Example: POST OAuth request and output id_token
#curl -s -X POST -H "Content-Type: application/json" -d "@body.json" https://cpht.auth0.com/oauth/ro | jq .id_token

# Example: assign username attribute in body.json
#jq '.username = "john@cphandheld.com"' body.json 

# Example jq modifying JSON elements username and password
#jq '.username = "abc"' body.json | jq '.password = "xyz"'


# Example: Post OAuth request modifying username and password with jq, output results
# curl -s -X POST -H "Content-Type: application/json" -d "$(jq '.username = "@username"' body.json | jq '.password = "@password"')"   https://cpht.auth0.com/oauth/ro

# Example: Post OAuth request modifying username and password with jq, output id_token
curl -s -X POST -H "Content-Type: application/json" -d "$(jq '.username = "@username"' body.json | jq '.password = "@password"')"   https://cpht.auth0.com/oauth/ro | jq .id_token

