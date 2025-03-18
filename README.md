# Anonymous | Question Box

## Stacks
- NEXT.JS
- TAILWINDCSS
- TAILWINDUI
- HEADLESSUI
- PRISMA

## Quick Start

Create `.env` file and put these variables:
```bash
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

GITHUB_EMAIL_WHITELIST=
```

```bash
npm i
```

Access to /api/setup to setup the database.


## Deploy

```bash
docker build -t anonymous .
docker run -p 3000:3000 anonymous
```
