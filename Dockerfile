FROM ubuntu:latest
FROM node:latest
RUN apt-get update 
WORKDIR /app 
COPY . /app 
RUN npm install 
EXPOSE 3000
ENTRYPOINT ["npm","start"]
