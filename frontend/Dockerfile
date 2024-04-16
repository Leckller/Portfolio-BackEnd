FROM node:alpine3.18

WORKDIR /app-frontend

COPY package*.json ./

RUN npm i

EXPOSE 5173

COPY . .

ENTRYPOINT [ "npm", "run" ]

CMD [ "dev" ]