# angelprotocol-web-app

## GETTING STARTED

### Requirements

- `Node.js` (20.x) - https://nodejs.org/en
- `pnpm` (v10) - https://pnpm.io/

We recommend using a version manager like `nvm`. Assuming you are using nvm, you can install and use Node v18 with the following two commands:

```shell
nvm install v20
nvm use v20
```

We use `pnpm` as a package manager. After installing yarn, simply run the package installer:

```shell
pnpm install
```

Lastly, we have provided an example `.env` file as `.env.example`.
You'll need to copy this file to `.env` and then modify/add your relevant app's settings, API Keys and the like:

```shell
cp .env.example .env
```

To run the web app server locally, simply execute:

```shell
pnpm start
```
