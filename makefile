.PHONY: install
install:
	docker run -p 6379:6379 --name my-redis -d redis && npm install

.PHONY: dev
dev:
	npm start

.PHONY: run-prod
run-prod:
	npm run prod