FROM node:14.16.1-alpine

WORKDIR /app

COPY ./src /app

RUN apk update && \
    apk add --update git && \
    apk add --update openssh

RUN npm install

CMD ["node", "index.js"]