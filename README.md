# Ecomm Bazaar

## Start the application

At root of project run:

```bash
pnpm start
```

## Docker

This project utilizies a dev container which runs the local/dev environment.

## Seed Local DB

Run these commands to seed with fake dev data

```bash
pnpm --filter api migration:run
pnpm --filter api migration:seed
```
