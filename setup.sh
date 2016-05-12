#!/bin/bash
echo "Okay. Let's get things setup."

echo "Ember Lightning servers up a single index.html file that references assets stored in Amazon Cloudfront"

echo "\n################\n"
echo "Okay.  Let's start up our ember-lightning server in Docker"

echo "WHat is REDIS HOST"
echo $REDIS_HOST

(sudo docker build --rm --tag ember-lightning . && sudo docker run -d --restart=always -p 3700:3700 --name ember-lightning --env PORT=3700 --env APP_NAME=company-admin --env REDIS_HOST=$REDIS_HOST ember-lightning:latest ) 

exit 0;
