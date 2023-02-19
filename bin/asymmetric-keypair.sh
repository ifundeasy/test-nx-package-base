#!/usr/bin/env bash

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

die () {
  echo >&2 "Error: $@"
  exit 1
}

[ "$#" -eq 1 ] || die "Modulus length argument required, $# provided"
echo $1 | grep -E -q '^[0-9]+$' || die "Modulus length is numeric argument, \"$1\" provided"
[ $1 -gt 2047 ] || die "Modulus length is greater than or equal 2048"


echo ""
echo "Generate $DIR/../certificates/private.key"
openssl genrsa -out $DIR/../certificates/private.key $1

echo ""
echo "Create PKCS8 format $DIR/../certificates/private.pkcs8.key"
openssl pkcs8 -topk8 -in $DIR/../certificates/private.key -out $DIR/../certificates/private.pkcs8.key -nocrypt

echo ""
echo "Create $DIR/../certificates/public.key"
openssl rsa -in $DIR/../certificates/private.key -pubout -outform PEM -out $DIR/../certificates/public.key   