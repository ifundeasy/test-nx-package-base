#!/usr/bin/env bash

echo "Remove <none> images"
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)