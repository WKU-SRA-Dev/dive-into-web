FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn*.lock ./


RUN apk update && apk add git 

RUN yarn install

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]