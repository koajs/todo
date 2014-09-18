TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =
REGISTRY = "--registry=http://registry.npm.taobao.org"

install:
	@npm install $(REGISTRY)

jshint: install
	@./node_modules/.bin/jshint .

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	  --harmony \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-all: jshint test test-cov

watch:
	@./node_modules/.bin/watchify \
		public/javascripts/app.js \
		--debug \
		--transform reactify \
		--transform envify \
		-o public/javascripts/bundle.js

autod: install
	@./node_modules/.bin/autod -w -e views,public/javascripts/bundle.js $(REGISTRY)
	@$(MAKE) install

.PHONY: test
