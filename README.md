This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, create a `.env` file in the root of the project. In this, place the API URL with the key `NEXT_PUBLIC_API_BASE_URL` and then the URL of API server.

For example, to connect to a locally-running API server on port 5055:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5055/api
```

Next, install dependencies by running:

```bash
npm install
```

Then, run the development server:

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

## Routes

- `/login`
  Login page to sign into admin or user account. Admin account will redirect to `/admin`. Signing in as a normal user will allow user to add Blocks to their account.
- `/admin`
  Admin management page to handle the creation of new Blocks.
