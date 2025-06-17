# if you don't want to use docker compose
server:
	yarn start:dev

# first time running
init_start: install init_env start

# install packages just for IDE typing
install:
	yarn install

# prepare the env variables
init_env:
	cp .env.example .env

# what you need to run the server
.PHONY: init
start:
	@echo "building and running the app..."
	docker compose up --build


# migrate db from inside the container
migrate:
	docker compose exec server npx prisma migrate dev