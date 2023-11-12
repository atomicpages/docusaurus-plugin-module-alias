# Docusaurus Plugin Module Alias

A small Docusaurus 2.x plugin that simplifies the addition of module aliases.

## Installation

```sh
npm i --save-dev docusaurus-plugin-module-alias # or
yarn add docusaurus-plugin-module-alias --dev
```

## Why?

Docusaurus 2.x uses webpack to build SSR and client bundles. Creating a plugin
to add a module alias for every new docusaurus site can be easily modularized.

## Usage

Inside your `docusaurus.config.js` add to the `plugins` field and configure with
the `alias` option :+1:

```js
const path = require("path");

module.exports = {
  // ...
  plugins: [
    [
      "docusaurus-plugin-module-alias",
      {
        alias: {
          "@local/component": path.resolve(__dirname, "../src/index.js"),
        },
      },
    ],
  ],
};
```

### Invalid Aliases

Docusaurus has special aliases that shouldn't be overridden: `@site`,
`@generated`, `@docusaurus`, `~docs`, `~blog`, `~pages`, `~debug`

## Options

| Name            | Type                     | Required | Description                                                          |
| --------------- | ------------------------ | -------- | -------------------------------------------------------------------- |
| `alias`         | `Record<string, string>` | Yes      | Aliases passes to webpack                                            |
| `mergeStrategy` | `Record<string, string>` | No       | Change the merge strategy used by `webpack-merge`. Use with caution! |
