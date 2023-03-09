## Watchplayread - a note taking web app

### *It helps to track your entertainment and personal development resources*

##

#### Put your notes in four sections:

* Books -- add books and authors for upcoming reading. Mark completed the ones you finished.

* Movies -- add movies and TV shows.

* Games -- add videogame titles.

* Music -- add music albums and singers/bands.

##

#### Technology stack

* Docker
* Vue JS (frontend)
* Node JS (backend)
* MongoDB (database)
* Terraform
* Azure cloud (deployment)

#### Overview

* The web app works on three docker containers: frontend, server and
mongodb for database. App build occurs via docker compose file located
in root directory.
* Web app deployment target is Microsoft Azure App Service for
Containers.
* The CI/CD pipeline is built on Azure DevOps service. See azure-pipeline.yml in root directory.
    * The pipeline takes code from GitHub repository triggered by changes in master branch -->
    * New container images are built --> 
    * Pushing new container images to Azure container registry --> 
    * Deploy of updated container images to Azure App Service for Containers and restart of web application

#### Build and run locally

1. [Install Docker Engine](https://docs.docker.com/engine/install/ubuntu/)

2. Run docker compose using dev file in root directory: 
`$ docker compose -f docker-compose-dev.yml up --build -d`

3. Check (http://localhost) in web browser

##### ***Note***

To change on which local port to run web app -- modify ***ports*** first value under ***server*** section in *docker-compose-dev.yml* file 

##### Example

```
version: "3.3"

services: 
  mongo:
    image: mongo:4
    restart: unless-stopped
    ports:
      - 27017:27017
    container_name: mongo
  
  frontend:
    image: wpracr1.azurecr.io/frontend:dev
    build: 
      context: ./frontend
    command: yarn build
    volumes:
      - front:/app/dist
    container_name: frontend

  server:
    image: wpracr1.azurecr.io/server:dev
    build: 
      context: ./server
    env_file:
      - .env
    volumes:
      - front:/app/public
    depends_on:
      - mongo
    ports:
      - 3000:80  # <---------- change port here
    container_name: server

volumes:
  front:

```
