# angelprotocol-web-app

## GETTING STARTED

### Requirements

- `Node.js` (18.x) - https://github.com/nvm-sh/nvm#installing-and-updating
- `yarn` (v1.22.x) - https://yarnpkg.com/getting-started/install/

We recommend using a version manager like `nvm`. Assuming you are using nvm, you can install and use Node v18 with the following two commands:

```shell
nvm install v18
nvm use v18
```

We use `yarn` as a package manager. After installing yarn, simply run the package installer:

```shell
yarn install
```

Lastly, we have provided an example `.env` file as `.env.example`.
You'll need to copy this file to `.env` and then modify/add your relevant app's settings, API Keys and the like:

```shell
cp .env.example .env
```

To run the web app server locally, simply execute:

```shell
yarn start
```
