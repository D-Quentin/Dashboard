FROM node:10.15.0-alpine

WORKDIR /usr/app/client

COPY package.json /usr/app/client
COPY package-lock.json /usr/app/client

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]