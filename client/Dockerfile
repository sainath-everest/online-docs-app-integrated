from node:12.13-alpine
# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]