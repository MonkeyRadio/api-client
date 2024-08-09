# MonkeyRadio API Client

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

A Fully featured Typescript SDK to interact with MonkeyRadio APIs

## INSTALLATION

```bash
npm i @monkey-radio/api-client
```

## USAGE

```js
import { MonkeyRadioAPI } from "@monkey-radio/api-client";

const monkeyRadioAPI = new MonkeyRadioAPI({
  baseUrl: useRuntimeConfig().public.apiUrl,
  diffusionUrl: useRuntimeConfig().public.diffusionUrl,
});
```

Then let your favourite ide autocomplete through repositories and endpoints thank to the typescript magic !

## Repositories

- Auth
  - login
  - logout
  - me
  - renewToken (internal)
- Radios (CRUD)
  - fromDomain
- Diffusion Repositories
  - Listneners
    - list
  - Stats
    - listeners

## Authentication

Token is by default, automatically checked and renewed if needed before each call

You simply have to login by using the auth.login method (nickname, password) or (token)
