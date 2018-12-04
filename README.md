<h3 align="center"> ES6 Burgers CRUD app </h3>

## What's included

* ES6 modules implementation 
* ES6 class implementation
* no jquery nor other, only native ES6
* CRUD: create, update and remove burgers with mongo
* Drag and drop ordering
* Burgers are imported when building with docker

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

## Creator

**Lucas Frecia**

This was created as a job exam proyect
