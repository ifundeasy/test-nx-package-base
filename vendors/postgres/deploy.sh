docker network create --driver bridge network-test-nx-package-base-postgres
docker run -dt --rm --net network-test-nx-package-base-postgres --name test-nx-package-base-postgres -p 5432:5432 -e POSTGRES_PASSWORD="96fdQPBFxp2ADueHhMSpuDy3" postgres
