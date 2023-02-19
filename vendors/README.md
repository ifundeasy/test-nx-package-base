# ci-cd

## Local deployment

### Preparation
Make sure you have your own `docker compose` configuration by copy `docker-compose.yaml`
```sh
# for your local configuration
cp docker-compose.yaml docker-compose-local.yaml
```

### Commands
```sh
# build images
./build.sh

# remove <none> image; clean up older docker images
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

# deploy docker stack
docker stack deploy -c docker-compose-local.yaml gk

# remove docker stack
docker stack rm gk
```