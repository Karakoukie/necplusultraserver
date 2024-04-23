# Docker

## Dockerfile

Fichier `Dockerfile` :
```dockerfile
FROM debian:latest # image

ONBUILD ADD . /app/src
ONBUILD RUN npm logs

USER root # utilisateur executant les commandes

ARG user1 # permet de passer une valeur `docker build --build-arg user1=root`
ENV MY_NAME="John Doe" # variable d'environnement

WORKDIR /dir/ # Dossier source des commandes
COPY file.ext /dir/ # Copie de fichier
VOLUME ["/data"]

RUN npm i # execution d'une commande

EXPOSE 80/tcp # exposition de ports

CMD ["npm", "start"] # lancement du container
```

