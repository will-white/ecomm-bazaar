# Ecomm Bazaar

## Start the application

Run `pnpm start` at root of project

## Docker

```bash
docker run --name bazaar -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=true -e MYSQL_DATABASE=bazaar -d mysql
```
