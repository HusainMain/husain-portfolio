# Portfolio Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

**Node.js is required** to run this project. Please install it from [nodejs.org](https://nodejs.org/).

## Getting Started

1.  Open your terminal in this directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

You can edit your portfolio data in `app/data/portfolio.ts`. The page will update automatically as you edit the file.

## SEO & Social Cards
- Open Graph and Twitter cards are configured in [`app/layout.tsx`](file:///c:/Users/husai/Documents/trae_projects/Portfolio/app/layout.tsx). The image is generated at runtime from [`app/opengraph-image.tsx`](file:///c:/Users/husai/Documents/trae_projects/Portfolio/app/opengraph-image.tsx).
- Update titles, descriptions, and social handles in the metadata.

## Projects Detail Pages
- Each project has a `slug` and links to `/projects/[slug]`. Edit project data in [`app/data/portfolio.ts`](file:///c:/Users/husai/Documents/trae_projects/Portfolio/app/data/portfolio.ts).
- Detail pages are generated from [`app/projects/[slug]/page.tsx`](file:///c:/Users/husai/Documents/trae_projects/Portfolio/app/projects/%5Bslug%5D/page.tsx).

## Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Set your site URL (optional): `setx NEXT_PUBLIC_SITE_URL "https://your-domain.vercel.app"`
3. From this folder, run: `vercel` and follow the prompts (login required)
4. For subsequent deploys: `vercel deploy`
5. Configuration is in [`vercel.json`](file:///c:/Users/husai/Documents/trae_projects/Portfolio/vercel.json)

## Contact Form (Server Email)
- The contact form calls `/api/contact`. It uses Resend if these environment variables are set:
  - `RESEND_API_KEY`
  - `RESEND_FROM` (e.g., "Portfolio <no-reply@yourdomain.com>")
  - `RESEND_TO` (recipient email)
- Without these, it falls back to opening your mail client.
- On Windows PowerShell (temporary for dev):  
  `setx RESEND_API_KEY "your-key"`  
  `setx RESEND_FROM "Portfolio <no-reply@yourdomain.com>"`  
  `setx RESEND_TO "you@example.com"`

## Environment Variables
- Copy `.env.example` to `.env.local` and fill values:
  - `NEXT_PUBLIC_SITE_URL` should be your Vercel domain or custom domain
  - For server email, set the Resend keys above
- In Vercel dashboard: Project → Settings → Environment Variables
  - Add the same keys for `Production` and `Preview`
  - Redeploy to apply

## Dev Server Port
- Dev server runs on port 3005 to avoid conflicts.
- Update `NEXT_PUBLIC_SITE_URL` after deploy so canonical URLs are correct.
