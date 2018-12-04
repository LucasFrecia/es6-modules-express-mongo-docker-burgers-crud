<h3 align="center"> ES6 Burgers CRUD app </h3>

## What's included

* ES6 modules implementation 
* ES6 class implementation
* no jquery nor other, only native ES6
* CRUD: create, update and remove burgers with mongo
* Drag and drop ordering
* Burgers are imported when building with docker
* Responsive (Foundation css was included, because it is so lightweight, and the only thing used is its grid sistem to achieve this)

### Run with Docker

You can build the image and run the containers with Docker-Compose

`docker-compose up`

Then head to `localhost:8080` in browser to see the app running

If source was modified you must run with --build
`docker-compose up --build`

### ES6 Files

All front-end logic is held inside `public/modules` dir

### mongo imported data

Data added when building with docker is held in file `init.json` inside `mongo` dir

### ES6 modules are available in modern browsers, this example proyect will only work with those that do support them:

* Safari 10.1
* Chrome 61
* Firefox 60
* Edge 16

## Creator

**Lucas Frecia**

This was created as a job exam proyect
