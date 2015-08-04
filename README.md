# ember-lightning
Ember lightning hosting for https://github.com/ember-cli/ember-cli-deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/philipheinser/ember-lightning)

# Docker support

ember-lightning is also available as a docker container. To build the container run:

```shell
docker build --tag ember-lightning .
```

Then, to serve an ember-cli application run the container:

```shell
docker run --name $APP_NAME --env APP_NAME=$APP_NAME --env REDIS_SERVER=your-redis-server.example.com ember-lightning:latest
```

The image responds to these environment variables:

### `APP_NAME`

The name of the application as deployed in Redis.

### `REDIS_SERVER`

The hostname of the Redis server where ember-cli applications are deployed.
This default to `redis` and so it is also possible to use Docker container
links to connect the ember-lightning container to a running Redis container.

### `REDIS_PORT`

The port that Redis is listening on. Defaults to 6379. This only needs to be
set if Redis is listening on a non-default port.

### `REDIS_SECRET`

The shared secret to use for authenticating to Redis. It is blank by default,
which disables authentication.
