FROM node:18.0.0-alpine3.14

WORKDIR /app

COPY ./src /app

RUN npm install

CMD ["node", "index.mjs"]
