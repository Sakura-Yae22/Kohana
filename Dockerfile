FROM node:14.16.1-alpine

WORKDIR /app

COPY ./src /app

RUN npm install

CMD ["node", "index.js"]