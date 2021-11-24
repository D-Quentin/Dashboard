FROM node:16

WORKDIR /usr/app/sever

COPY package.json /usr/app/sever
COPY package-lock.json /usr/app/sever

RUN npm install
RUN npm ci

COPY . .

ENV PORT 8080
EXPOSE 8080
EXPOSE 5432

CMD ["npm", "start"]