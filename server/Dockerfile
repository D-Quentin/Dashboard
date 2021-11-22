FROM node:10.15.0-alpine

WORKDIR /usr/app/sever

COPY package.json /usr/app/sever
COPY package-lock.json /usr/app/sever

RUN npm ci

COPY . .

ENV PORT 8080
EXPOSE 8080

CMD ["npm", "start"]