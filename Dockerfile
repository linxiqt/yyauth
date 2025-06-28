FROM node:22-alpine

RUN npm install -g pm2

WORKDIR /app

COPY . /app

CMD ["pm2-runtime", "server/index.mjs"]
