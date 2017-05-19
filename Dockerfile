FROM node:4-onbuild

EXPOSE 3700

ENV REDIS_PORT 6379

CMD [ "node", "--harmony-destructuring", "index.js" ]
