FROM ubuntu:latest
FROM node:latest
RUN apt-get update 
WORKDIR /app 
COPY . /app 
RUN npm install 
EXPOSE 3567
ENTRYPOINT ["node","server.js"]
