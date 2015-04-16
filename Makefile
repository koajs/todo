TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =
REGISTRY = "--registry=http://registry.npm.taobao.org"

install:
	@npm install $(REGISTRY)

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

test-travis:
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

watch:
	@./node_modules/.bin/watchify \
		public/javascripts/app.js \
		--debug \
		--transform reactify \
		--transform envify \
		-v \
		-o public/javascripts/bundle.js

build:
	@NODE_ENV=production ./node_modules/.bin/browserify \
	public/javascripts/app.js \
	--transform reactify \
	--transform envify \
	-o public/javascripts/bundle.js

autod: install
	@./node_modules/.bin/autod -w -e views,public/javascripts/bundle.js $(REGISTRY) --prefix="~"
	@$(MAKE) install

.PHONY: test
