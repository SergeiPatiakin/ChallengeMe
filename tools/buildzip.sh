#!/usr/bin/env bash
npm run clean
npm run build
mkdir ./build
cp -R .npmrc env-config.js next.config.js package-lock.json package.json production-server static .next ./build
# cp -R static ./build/production-server/static
rm -r ./build/production-server/node_modules
pushd ./build
zip ../chmeapp.zip -FSr * .[^.]*
popd
rm -r ./build