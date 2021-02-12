#!/bin/bash
echo "Okay. Let's get things setup."

echo "Ember Lightning servers up a single index.html file that references assets stored in Amazon Cloudfront"

echo "\n################\n"
echo "Okay.  Let's start up our ember-lightning server in Docker"

echo "What is REDIS HOST"
echo $1

if [[ $2 == "staging" ]]
then
  appname="company-admin_staging"
fi

if [[ $2 == "demo" ]]
then
  appname="company-admin_demo"
fi

if [[ $2 == "production" ]]
then
  appname="company-admin"
fi

(sudo docker build --rm --tag ember-lightning . && sudo docker run -d --restart=always -p 3700:3700 --name ember-lightning --env PORT=3700 --env APP_NAME=$appname --env EMBER_REDIS_HOST=$1 ember-lightning:latest )

exit 0;
