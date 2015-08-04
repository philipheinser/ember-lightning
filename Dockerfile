FROM node:0.12-onbuild

EXPOSE 3000

ENV APP_NAME ""
ENV REDIS_PORT 6379
ENV REDIS_HOST redis
ENV REDIS_SECRET ""

CMD [ "node", "--harmony", "index.js" ]
