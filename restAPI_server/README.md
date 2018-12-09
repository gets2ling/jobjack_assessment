# RestAPI-server #

## How to run restAPI_server without container to serve local file directory: ##
* Open cmd window in restAPI_server directory
* Run npm install
* Run node server.js

## How to run restAPI_server with docker: ##

Build Docker image:
$ docker build -t restapi-server

Run Docker container:
$ docker run -p 8081:8081 restapi-server
