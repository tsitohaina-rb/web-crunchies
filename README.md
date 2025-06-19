This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Overview

This project is a Next.js application, likely an e-commerce or product-showcase website based on the file structure and component names. It utilizes TypeScript, Tailwind CSS, and various libraries for UI components and functionality.

## File Structure

The project follows a standard Next.js App Router structure:

- [`/public`](public/) : Contains static assets like images, favicons, and the web manifest.
- [`/src`](src/) : Contains the main application source code.
  - [`/src/app`](src/app/) : App Router pages and layout.
    - [`/src/app/page.tsx`](src/app/page.tsx) : The main index page.
    - Subdirectories like [`/src/app/about`](src/app/about/), [`/src/app/blog`](src/app/blog/), [`/src/app/contact`](src/app/contact/), [`/src/app/product`](src/app/product/), and [`/src/app/shop`](src/app/shop/) contain pages for specific routes.
  - [`/src/components`](src/components/) : Reusable React components.
    - [`/src/components/main`](src/components/main/) : Major components like Header, Footer, and components specific to different sections (about, blog, contact, home, product, shop).
    - [`/src/components/providers`](src/components/providers/) : Context providers (e.g., NotificationProvider, ToastProvider).
    - [`/src/components/ui`](src/components/ui/) : UI components, likely built using a library like Shadcn UI based on the file names (e.g., `button.tsx`, `dialog.tsx`).
  - [`/src/data`](src/data/) : Data files, possibly for blog posts, categories, or products.
  - [`/src/hooks`](src/hooks/) : Custom React hooks.
  - [`/src/lib`](src/lib/) : Utility functions and helper libraries.
- [`/components.json`](components.json) : Configuration for UI components (likely Shadcn UI).
- [`/next.config.ts`](next.config.ts) : Next.js configuration file.
- [`/package.json`](package.json) : Project dependencies and scripts.
- [`/postcss.config.mjs`](postcss.config.mjs) : PostCSS configuration.
- [`/README.md`](README.md) : Project README file.
- [`/tsconfig.json`](tsconfig.json) : TypeScript configuration file.
- [`/yarn.lock`](yarn.lock) : Yarn package manager lock file.
- [`.gitignore`](.gitignore) : Specifies intentionally untracked files that Git should ignore.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Make sure you have Node.js and Yarn installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd web-crunchies
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

### Running the Development Server

To run the application in development mode:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the file.

### Building for Production

To build the application for production:

```bash
yarn build
```

This will create an optimized build of your application in the `.next` folder.

### Running the Production Server

To start the application in production mode after building:

```bash
yarn start
```

### Linting

To run the linter and check for code style issues:

```bash
yarn lint
```
