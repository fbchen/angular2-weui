#!/usr/bin/env bash

set -ex

cd `dirname $0`


VERSION=$(node -p "require('./package.json').version")

if [[ "${VERSION}" == "" ]]
then
  echo "Version number required"
  exit 1
fi


PACKAGE="angular-weui"
SRCDIR="./src/app/weui"
DESTDIR=./dist/${PACKAGE}

cp ${SRCDIR}/package.json  ${DESTDIR}/
cp ./README.md             ${DESTDIR}/
cp -rf ${SRCDIR}/css       ${DESTDIR}/

(
    echo "======   Updating to VERSION: ${VERSION}"
    cd ${DESTDIR}
    echo "======   EXECUTE: perl -p -i -e \"s/0\.0\.0\-PLACEHOLDER/${VERSION}/g\" $""(grep -ril 0\.0\.0\-PLACEHOLDER .)"
    perl -p -i -e "s/0\.0\.0\-PLACEHOLDER/${VERSION}/g" $(grep -ril 0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
)

echo "====== PUBLISHING: ${DESTDIR} ====="
#npm login [fbchen]
npm publish ${DESTDIR}
