FROM node:alpine3.18

WORKDIR /app

COPY package*.json .

RUN npm i

EXPOSE 3333

COPY . .

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]