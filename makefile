.PHONY: install
install: 
	sudo apt-get install redis-server && sudo service redis-server start && npm install

.PHONY: dev
dev:
	npm start

.PHONY: run-prod
run-prod:
	npm run prod