FROM node:18

WORKDIR /usr/app

COPY ./package*.json .

RUN npm install

COPY ./dist .

ARG TODO_APP_BACKEND_PORT
ENV PORT ${TODO_APP_BACKEND_PORT}

EXPOSE ${PORT}
CMD ["node", "index.js"]