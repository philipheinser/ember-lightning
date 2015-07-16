FROM node:0.12

COPY . /ember-lightning
WORKDIR /ember-lightning
RUN npm install
EXPOSE 3000

ENV REDIS_PORT 6379
ENV REDIS_HOST redis
ENV REDIS_SECRET ""

ENTRYPOINT node --harmony index.js
