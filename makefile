
.PHONY: clean

exec/parser:
	go build -o $@

clean:
	rm -r build exec
