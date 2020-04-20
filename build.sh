set -e
pushd "./components" > /dev/null
exec npx webpack
popd > /dev/null