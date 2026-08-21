# CF Svelte Drizzle starter

## Getting started

Find and replace `cf-sveltekit-drizzle` and with the name of your pages project.

### Set up the database

```bash
pnpm dlx wrangler d1 create [NAME]
```

### Bind to your D1 database

Copy the lines obtained from the cli command above.

Add them to the wrangler.jsonc file. Particularly the database name and the id.

You'll also need to add your cloudflare account id, database id and d1 token to your .env file.

```txt
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_DATABASE_ID=
CLOUDFLARE_D1_TOKEN=
```

These can all be found in your cloudflare dashboard.

- https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/
- https://developers.cloudflare.com/fundamentals/api/get-started/create-token/

Make sure your D1 token has **D1:Read, D1:Edit** permissions.

> [!NOTE] 
> In order for the CI workflows to run add these secrets to the repo.

To get your local database setup run

```sh
pnpm db:setup
```

This will migrate the sample data and pull the remote database locally ready to work with.


# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
pnpm dlx sv@0.17.0 create --template minimal --types ts --add prettier eslint vitest="usages:component,unit" playwright sveltekit-adapter="adapter:cloudflare+cfTarget:workers" --install pnpm .
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
