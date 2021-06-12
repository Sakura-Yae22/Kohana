FROM node:14.16.1-alpine

WORKDIR /app

COPY ./src /app

RUN apk --update --no-cache --virtual build-dependencies add \
    python python-dev py-pip \ 
    build-base make g++ pkgconfig autoconf automake bash \ 
    imagemagick cairo-dev jpeg-dev pango-dev giflib-dev pixman-dev pangomm-dev libjpeg-turbo-dev freetype-dev \ 
    libc6-compat \  
  && apk --no-cache add \
    pixman cairo pango giflib libjpeg 

RUN npm install

CMD ["node", "index.js"]