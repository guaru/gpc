#stage 1 build
FROM node:14.16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN  npm install

COPY . /app

RUN npm run build --prod

#stage 2
FROM nginx:1.17.1-alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/gpc /usr/share/nginx/html

