# angelprotocol-web-app

Repo for Angel Protocol's React web app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

### Requirements

- Node 16.5.0
- Yarn

### Recommended Local Development Tools

- Node version manager: https://github.com/nodenv/nodenv
- Node version installer: https://github.com/nodenv/node-build

### Getting Started

1. `git clone git@github.com:AngelProtocolFinance/angelprotocol-web-app.git`
2. `cd angelprotocol-web-app`
3. `./bin/setup`
4. Create a file, `.envl` on your project's root directory.
    * This is where you will store all of your app's LCD/RPC endpoint URLs for testnet/mainnet.
    * Please contact one of the Angel Protocol Engineering Team members for the complete list of nodes.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn storybook`

Runs [Storybook](https://storybook.js.org).
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

Storybook provides a sandbox to develop components in isolation.

### `yarn build-storybook`

Builds [Storybook](https://storybook.js.org) for static hosting.
Outputs to `storybook-static/`.

### `yarn lint`

Lints the codebase using [`ESlint`](https://eslint.org). Errors and warnings are shown in your terminal, and can be shown in your text editor with the appropriate plugin.

### `yarn lint:fix`

Runs `yarn lint` with the `--fix` flag allowing [`ESlint`](https://eslint.org) to fix the issue automatically where possible.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
