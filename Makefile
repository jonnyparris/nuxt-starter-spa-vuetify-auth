VERSION=$(shell whoami)-latest
DATE=$(shell TZ= date +%Y-%m-%dT%H:%M:%SZ)
CI_COMMIT_SHORT_SHA=$(shell git rev-parse --short HEAD)
CI_GIT_TAG=$(shell git describe --abbrev=0 --tag master)
TEST_SITEKEY=IamaGoogleRecaptchaSitekeyChangeMe
SERVICE_NAME=client

start:	## start development server with hot reloading at localhost:7000
	docker-compose down && docker-compose build --force --build-arg VERSION=$(VERSION) --build-arg SITEKEY=$(TEST_SITEKEY) --build-arg GIT_REV=$(CI_COMMIT_SHORT_SHA) --build-arg GIT_TAG=$(CI_GIT_TAG) --build-arg BUILD_DATE=$(DATE) && docker-compose up

shell: ## start shell session inside of the container
	docker-compose exec $(SERVICE_NAME) bash

lint: ## lint project
	docker-compose exec $(SERVICE_NAME) npm run lint

lint-fix: ## fix auto fixable linting issues
	docker-compose exec $(SERVICE_NAME) npm run lintfix

build: ## build application
	docker-compose exec $(SERVICE_NAME) npm run generate

test: ## test application
	docker-compose exec $(SERVICE_NAME) npm run test

help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.DEFAULT_GOAL:=help
