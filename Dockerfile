FROM node:4-onbuild

EXPOSE 3700

#ENV APP_NAME ""
ENV REDIS_PORT 6379
#ENV REDIS_HOST redis
#ENV REDIS_SECRET ""

CMD [ "node", "--harmony", "index.js" ]
