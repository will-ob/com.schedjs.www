
build: clean
	gulp

clean:
	rm -rf build/

test:
	./node_modules/.bin/mocha

publish: build
	rsync -av build/ ec2-54-81-225-47.compute-1.amazonaws.com:/opt/schedjs/ --delete --super --chmod=a+rx

watch: build
	./node_modules/.bin/gulp watch

run: build
	./node_modules/.bin/coffee ./tools/server.coffee

.PHONY: build test clean publish watch run

