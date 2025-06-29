FROM node:22-alpine

WORKDIR /app

COPY . /app

RUN npm install -g pm2 && npm install --prefix server

CMD ["pm2-runtime", "server/index.mjs"]
