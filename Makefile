install:
	npm install

run:
	npm conf-compare

lint:
		npm run eslint -- src

publish:
		npm publish
