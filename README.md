# Ecomm Bazaar

## Start the application

At root of project run:

```bash
pnpm start
```

## Docker

Local Mysql DB

```bash
docker run --name bazaar -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=true -e MYSQL_DATABASE=bazaar -d mysql
```

## Seed Local DB

Run these commands to seed with fake dev data

```bash
pnpm --filter api migration:run
pnpm --filter api migration:seed
```
