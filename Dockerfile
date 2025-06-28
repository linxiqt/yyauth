FROM node:22-alpine

# 安装 pm2，独立层，避免代码变动时重复安装
RUN npm install -g pm2

WORKDIR /app

COPY . /app

CMD ["pm2-runtime", "server/index.mjs"]
