# Hounddog.ai Take-Home Project

This project provides a simple UI/UX where users can create, list and delete data elements which are regex patterns used to include/exclude specific types of tokens during code scanning.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Visit https://hounddog-take-home.vercel.app/ in order to see the deployed preview.

## ⚡️ Stack

- [`Next.js`](https://nextjs.org/)
- [`Typescript`](typescriptlang.org)
- [`Tailwind CSS`](https://tailwindcss.com/)
- [`SWR`](https://swr.vercel.app/)
- [`ESLint`](https://eslint.org/)

## Main Features

- List data elements by pagination.
- Create new data element.
- Delete data element.

## TODO Features

- Edit data element
- Filter and Sort data elements by name, description, etc.
- Add unit and e2e testing

## Getting Started

First, create .env.local in the root folder of project and add api url and auth token properly

```bash
NEXT_PUBLIC_API_URL=https://api-staging.hounddog.ai
NEXT_PUBLIC_AUTH_TOKEN=
```

Then, install package dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

After that, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
