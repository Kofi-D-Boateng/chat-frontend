FROM node:16.6-alpine as build-stage

WORKDIR /local/app

COPY . . 

RUN npm install && npm run build

FROM ubuntu:18.04

RUN apt update -y \
    && apt install nginx -y \
    && apt-get install software-properties-common -y \
    && add-apt-repository ppa:certbot/certbot -y \
    && apt-get update -y \
    && apt-get install python-certbot-nginx -y \
    && apt-get clean

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /local/app/build .

CMD ["nginx", "-g", "daemon off;"]