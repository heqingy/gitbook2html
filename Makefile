build:
	sh build.sh; \

run test:
	pushd "./components" > /dev/null; \
	yarn dev; \
	popd > /dev/null; \



