# Vue Project Starter

1. Clone this repo.
2. Customise environment variables as per top of `nuxt.config.ts`.
3. Delete everything from this line upwards of this README and replace the project title.
---

## Run it locally

1. Install docker & make sure it's running.
2. `make start` (see notes below if using MacOS and stuck at this step)
3. Open [http://localhost:7000/](http://localhost:7000/)

> **Notes / Troubleshooting:**

> - `make help` (or just `make`) will list other available make tasks
> - Mac users that don't already have xcode commandline tools installed may need to run `xcode-select --install` in order to run `make` commands. Othwerwise you might encounter an error that looks something like `xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools)` when you try to run `make start`

## About the stack

This is built using [Nuxt](https://github.com/nuxt/nuxt.js) & Typescript.
Nuxt generates a static site for production.

### Added modules & presets

- Nuxt auth module, already setup with a basic local auth strategy
- Nuxt i18n for multi-lingual support
- vue-cookieconsent-component for cookie banner
- vue recaptcha for signup request throttling
- MirageJS for mock server api responses
- Linting enforced on as a precommit hook using the pre-commit package

## Contribution tips

- Run `npm install` on your machine at leat once, so the `pre-commit` hook is installed.
- Include screencaptures in any merge requests that involve updating the UI to save review time. ([Gyazo](https://gyazo.com/) is good for capturing animations easily)
- Ensure do-it-later (aka do-it-friday) comments are prefixed with capitalised "TODO" as a convention so it's easy to highlight and find them all
- Ensure all visible user strings are localised. [Vue i18n Ally](https://marketplace.visualstudio.com/items?itemName=antfu.vue-i18n-ally) is an invaluable vscode extension for making this an effortless process.

### Run E2E tests

1. Make sure app is running locally at [http://localhost:4000/](http://localhost:4000/).
2. `npx cypress open`.
