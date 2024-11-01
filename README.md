# CF Svelte Drizzle starter

## Getting started

### Create a database

```bash
pnpm dlx wrangler d1 create my-database
```

### Bind to your D1 database

Copy the lines obtained from the cli command above.

Add them to the wrangler.toml file. Particularly the database name and the id.

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

### Creating and applying migrations

In this project we're using Drizzle as our ORM.

To create a migration:

```bash
pnpm db:generate
```

Apply that migration to the local db

```bash
pnpm db:migrate
```

### Seeding

Because D1 requires serverless bindings to interact with Drizzle we have an api route to seed our data `/api/seed`.

This is only available when the development environment.

We can seed our local db from this route by running

```bash
pnpm db:seed:local
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

## Deployment

Deploy the database by running

```bash
pnpm deploy:db
```

Deploy pages by running

```bash
pnpm deploy:pages
```
