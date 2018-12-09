# RestAPIClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Run locally

* Open Node.js Command Prompt in restAPI_client directory
* Run: npm install
* Run: npm install -g @angular/cli@6.0.0
* Run: npm install --save-dev @angular-devkit/build-angular
* Run: `ng serve --host 0.0.0.0 --port=4200`
* Navigate to `http://localhost:4200/`

## Run with Docker

* Open cmd in restAPI_client directory
* Run: docker build -t restapi-client .
* Run: docker run -it -v cd:/usr/src/app -v /usr/src/app/node_modules --rm restapi-client
