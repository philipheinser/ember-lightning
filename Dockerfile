FROM node:6-onbuild

EXPOSE 3700

ENV REDIS_PORT 6379
ENV EMBER_REDIS_HOST dev-lc.7avb7p.0001.use1.cache.amazonaws.com

CMD [ "node", "index.js" ]
