# yyauth

### Docker run
```
docker run -d \
  --name yyauth \
  --restart always \
  --network host \
  -e DB_HOST=127.0.0.1 \
  -e DB_PORT=3306 \
  -e DB_NAME=auth \
  -e DB_USER=auth \
  -e DB_PASSWORD=Linxi200710 \
  ghcr.io/linxiqt/yyauth
```


---

国内镜像
```
docker run -d \
  --name yyauth \
  --restart always \
  --network host \
  -e DB_HOST=127.0.0.1 \
  -e DB_PORT=3306 \
  -e DB_NAME=auth \
  -e DB_USER=auth \
  -e DB_PASSWORD=Linxi200710 \
  ghcr.nju.edu.cn/linxiqt/yyauth
```

`docker-compose.yml`
```
services:
  yyauth:
    image: ghcr.io/linxiqt/yyauth
    container_name: yyauth
    restart: always
    network_mode: host
    environment:
      DB_HOST: 127.0.0.1
      DB_PORT: 3306
      DB_NAME: auth
      DB_USER: auth
      DB_PASSWORD: Linxi200710
```
