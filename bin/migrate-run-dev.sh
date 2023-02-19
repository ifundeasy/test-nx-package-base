#!/usr/bin/env bash

PACKAGE=$1

echo ""
echo "Package: $PACKAGE"
echo "================="

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do
  TARGET=$(readlink "$SOURCE")
  if [[ $TARGET == /* ]]; then
    SOURCE=$TARGET
  else
    DIR=$( dirname "$SOURCE" )
    SOURCE=$DIR/$TARGET
  fi
done
RDIR=$( dirname "$SOURCE" )
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )

cd $DIR/..
./bin/migrate.sh $PACKAGE
./bin/run-dev.sh $PACKAGE