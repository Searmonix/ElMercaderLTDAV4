# ElMercaderLTDAV5
Reto 5 Universidad Sergio Arboleda

## Local Development Environment
This application is interpreted on Ubuntu 22.04 LTS using Docker (v 24.0.5)

## System Requirements
- [Git] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker] (https://docs.docker.com/engine/install/)

### Installation
To set up a local develompent environment, follow these instructions:

* Clone:
```bash
git clone -b main https://github.com/Searmonix/ElMercaderLTDAV4.git
cd ElMercaderV4
```
* Run using Docker
```bash
docker compose up --build
```

For the usage of this application, no extra installations are required, as Docker manages images of Maven, Node, Nginx and MongoDB, with their respective dependencies.
If you wish to link your own Mongo data base, change the value of environment variable of MONGO_URI, 
as a local (Docker) database will be created by default.

```.env
#.env example
MONGO_URI="mongodb+srv://username@password:server.mongodb.net/database?retryWrites=true&w=majority"
```

Other important thing to keep in mind, this application includes a service that filters through an specific date, that date is based on a Time Zone to return a result.
To change it, follow the following process:

```.env
#.env example
TZ=Continent/City
```
Feel free to contact me if any doubt arises.
Hope you enjoy the code!
