FROM node:16-alpine
WORKDIR /front/emailsender
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD [ "npm" , "start" ]