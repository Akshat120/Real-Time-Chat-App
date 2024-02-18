.PHONY: install
install:
	apt-get install redis-server && service redis-server start && npm install

.PHONY: dev
dev:
	npm start

.PHONY: run-prod
run-prod:
	npm run prod