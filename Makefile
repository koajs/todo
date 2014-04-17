TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =

install:
	@npm install --registry=http://r.cnpmjs.org --disturl=http://dist.cnpmjs.or

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
	@-$(MAKE) check-coverage

check-coverage:
	@./node_modules/.bin/istanbul check-coverage \
		--statements 85 \
		--branches 85 \
		--functions 85 \
		--lines 85

test-all: jshint test test-cov

autod: install
	@./node_modules/.bin/autod -w -e public,views
	@$(MAKE) install

.PHONY: test
