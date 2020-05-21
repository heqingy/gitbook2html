init:
	mkdir source; \
	mkdir dist; \
	mkdir zip; \
	pushd "./components" > /dev/null; \
	mkdir source; \
	popd > /dev/null; \

prod:
	sh prod.sh; \

dev:
	sh dev.sh; \