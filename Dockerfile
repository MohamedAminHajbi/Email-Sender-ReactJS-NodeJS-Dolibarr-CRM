FROM node:16-alpine

WORKDIR /Email-Sender-ReactJS-NodeJS-Dolibarr-CRM

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["node", "app.js"]