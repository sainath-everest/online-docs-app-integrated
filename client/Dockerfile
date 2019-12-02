from node:12.13-alpine
# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]