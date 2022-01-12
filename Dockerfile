FROM node:16.13.0-alpine

WORKDIR /app

COPY ./src /app

RUN npm install

CMD ["node", "index.js"]
