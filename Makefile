build:
	sh build.sh; \

build-prod:
	sh build-prod.sh; \

dev:
	sh dev.sh; \

run test:
	pushd "./components" > /dev/null; \
	yarn dev; \
	popd > /dev/null; \



