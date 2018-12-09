# RestAPI-server #

## How to run restAPI_server without container to serve local file directory: ##
* Open cmd window in restAPI_server directory
* Run: npm install
* Run: node server.js

## How to run restAPI_server with docker: ##
* Open cmd window in restAPI_server directory
* Run: docker build -t restapi-server
* Run: docker run -p 8081:8081 restapi-server

Not sure how to serve a local file from a container for testing purposes
