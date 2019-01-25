FROM node:8.10.0-alpine
WORKDIR /app
COPY package*.json ./
RUN apk update && apk add python \
&& apk add make \
&& apk add g++ \
&& npm install
COPY . .
RUN chmod +x ./wait-for.sh

CMD sh -c './wait-for.sh mysql-db:3306 -- sequelize db:migrate'

EXPOSE 3000
CMD [ "node", "server.js" ]