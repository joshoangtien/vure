# vure

[![Version](https://img.shields.io/npm/v/vure?style=flat&color=success)](https://www.npmjs.com/package/vure)
[![Downloads](https://img.shields.io/npm/dt/vure.svg?style=flat&color=success)](https://www.npmjs.com/package/vure)

CLI based on Vure to generate your project easily

## Feature

- ⚛️ Support React, Vue, Svelte
- 🖥 Typescript support
- 📖 Less boilerplate
- ⏰ Always up to date dependencies
- ⚙️ Choose your own tool / framework you need
  - Tailwind
  - Sass
  - Router (react-router-dom, vue-router, svelte-navigator)
  - ESLint
  - Prettier
  - Unit test (Vitest)

## Get started

```bash
npx vure
```

## Examples

Name your project

```bash
npx vure my-app
```

Generate your project in the current working directory

```bash
npx vure .
```

Specify a template: react, react-ts, vue, vue-ts, svelte, svelte-ts

```bash
npx vure --template react
```

Use yarn to install packages

```bash
npx vure --with-yarn
```
