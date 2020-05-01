set -e
pushd "./parse" > /dev/null
go run main.go
popd > /dev/null
rm -rf ./components/source/*
mv ./dist/* ./components/source
pushd "./components" > /dev/null
node build/build.js
yarn build
node build/clearTsx.js
popd > /dev/null
mv ./components/source/* ./dist