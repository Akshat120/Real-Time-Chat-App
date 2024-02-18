.PHONY: install
install:
	RUN apt-get update && apt-get install -y redis-server && \
	RUN service redis-server start && \
	RUN npm install

.PHONY: dev
dev:
	npm start

.PHONY: run-prod
run-prod:
	npm run prod