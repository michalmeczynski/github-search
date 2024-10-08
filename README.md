# GithubSearch

### Installation

To install dependencies run `npm run install-deps`. There is `pnpm` needed. If you don't have installed it run `npm install -g pnpm`.

### Management

Dependency management is a little bit different that in classic SPA project. First of all, dependency list is declared for whole workspace. It means that every library or application can use only workspace dependency in version declared in `package.json` placed in main path. Second of all, each dependency should have strict version declared.

To manage some external dependency we should follow the given way. Every operation should be done in `package.json` and then we should run installation script to execute our changes.

### Start the development

To start the development server run `npm run dev:{appName}`. Open your browser and navigate to `http://localhost:{appPort}/`.
To run all applications: `npm run dev`.

To run `proxy` app there is `.env` needed with key GITHUB_API_TOKEN.

### Build

To create a production bundle run `npm run build:{appName}` or `npm run build` to build all.
