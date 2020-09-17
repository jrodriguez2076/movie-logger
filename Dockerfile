FROM node:latest as node

# ARG ENV=prod
# ARG APP=movie-logger

# ENV ENV ${ENV}
# ENV APP ${APP}

WORKDIR /
COPY ./package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]

