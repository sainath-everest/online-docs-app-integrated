FROM node:12.13-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
RUN npm install
EXPOSE 8080
CMD /wait && npm start