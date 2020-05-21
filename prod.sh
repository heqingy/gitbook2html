set -e
pushd "./parse" > /dev/null
go run main.go
popd > /dev/null
rm -rf ./components/source/*
rm -rf ./source/*
mv ./dist/* ./components/source
pushd "./components" > /dev/null
node build/build.js
node build/makeSpaRoutes.js
yarn build-prod
node build/clear.js
node build/server.js
popd > /dev/null