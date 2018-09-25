FROM node:6-onbuild

EXPOSE 3700

ENV REDIS_PORT 6379

CMD [ "node", "index.js" ]
