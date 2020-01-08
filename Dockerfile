FROM node:lts

WORKDIR /usr/app

COPY . .

RUN npm i

CMD ["node", "app.js"]
