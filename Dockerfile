FROM node:9

EXPOSE 3000

ENV APP_NAME ""
ENV REDIS_PORT 6379
ENV REDIS_HOST redis
ENV REDIS_SECRET ""

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app

CMD [ "node", "--harmony", "index.js" ]
