FROM node:20

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

CMD ["yarn", "start:dev"]
