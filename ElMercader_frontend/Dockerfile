# Obtenemos una imagen de node desde Docker hub, a la que le asignamos un nombre
FROM node:16.20.1-alpine AS node

# No podemos darle a cualquier persona que entre permisos de root
# Para eso se crea uno sin permisos

# Crear un grupo de usuarios que por defecto es 1000
RUN addgroup --gid 1000 node \
    # Todo usuario necesita una contraseña, así sea vacía, estará esperando un input
    && adduser --disabled-password  --uid 1000 --gid 1000 node \
    # Al usuario node : del grupo node dale permisos de acceso a los componentes de node
    # Va a poder enteder lo que es un archivo de node, pero no cómo ejecutarlo
    && chown node:node /usr/bin/node \
    # Acá se le agregan permisos de ejecición
    && chmod +x /usr/bin/node

# Build Stage
# Hasta ahora nuestro contenedor tiene una imagen y un usuario, pero no tiene una aplicación
# En este paso le indicamos cuál será su directorio donde se trabajará el proyecto, 
# dónde se compilará y cómo se ejecutará.

# Node tiene un usuario propio, por lo que podemos utilizar directamente la imagen
FROM node:16.20.1-alpine AS builder

# En este directorio, app, será donde se guardará la aplicación
WORKDIR /usr/src/app

# Se copia el proyecto de nuestro directorio al contenedor
COPY . .

RUN npm install

# Compilar el proyecto
RUN npm run build


# Execution Stage
# En la fase de ejecución se declararán comandos de ejecución, se trae el ejecutable
FROM node:16.20.1-alpine

WORKDIR /usr/src/app

RUN npm init -y && npm install -g serve

# builder es donde está la aplicación, por lo que debemos indicarle qué carpeta queremos que traiga
# donde está el ejecutable, /usr/src/app/dist, ahí está. Ponemos ./dist para indicarle que desde esa
# ruta /usr/..... /dist lo encontrará y lo copiara al directorio de trabajo en el que estamos ahora
# para ejecutarlo
COPY --from=builder /usr/src/app/dist ./dist

# Se le dan permisos de pertenencia a un grupo de usuarios y a todos los usuarios que encuentre
# Ya que los archivos que se trajeron de dist de la imagen node:16 .... son del usuario root,
# el usuario node no puede ejecutarlos, porque no tiene permisos sobre los archivos de root
# acá le damos permisos sobre todas las carpetas que se trajeron de la fase Build
RUN npm install && chown -R node:node /usr/src/app

USER node 

CMD ["serve", "dist"]