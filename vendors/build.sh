#!/usr/bin/env bash

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  TARGET=$(readlink "$SOURCE")
  if [[ $TARGET == /* ]]; then
    echo "SOURCE '$SOURCE' is an absolute symlink to '$TARGET'"
    SOURCE=$TARGET
  else
    DIR=$( dirname "$SOURCE" )
    echo "SOURCE '$SOURCE' is a relative symlink to '$TARGET' (relative to '$DIR')"
    SOURCE=$DIR/$TARGET # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
  fi
done
RDIR=$( dirname "$SOURCE" )
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )

echo "" && echo "Building redis"
cd $DIR/redis
bash build.sh

echo "" && echo "Building postgres"
cd $DIR/postgres
bash build.sh

cd $DIR/..

echo "" && echo "Building svc-auth"
docker build --rm -t test-nx-package-base-svc-auth -f packages/svc-auth/Dockerfile .

echo "" && echo "Building svc-main"
docker build --rm -t test-nx-package-base-svc-main -f packages/svc-main/Dockerfile .