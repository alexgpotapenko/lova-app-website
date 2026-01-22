This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Brand color semantics

We use brand tokens instead of status colors:

- `key` = brand blue (use this instead of `primary`)
- `accent` = brand green (NOT success)

HeroUI mapping for compatibility:
- `primary` → key (brand blue)
- `green` → accent (brand green)

We removed the `highlight` palette from the brand system.

Rule of thumb: in this project, use **key instead of primary**.

For a quick visual check, see the “Brand color check” block on the dashboard.

## Editor Tailwind warnings

Tailwind v4 uses CSS directives like `@apply`, and HeroUI adds `@plugin` / `@source`. VSCode/Cursor may flag these as `unknownAtRules` without Tailwind-aware tooling, even though the app builds correctly. Project-wide editor settings live in `.vscode/settings.json` and suppress only this specific warning.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
