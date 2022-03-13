FROM node

WORKDIR '/home/Documents/cats/api'

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080