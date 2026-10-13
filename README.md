# Sheheryar Chaudhary — Portfolio

Personal portfolio for **Sheheryar Chaudhary**, Marketing & Creative Executive, Graphic Designer, UI/UX Designer and Brand Strategist.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · shadcn/ui conventions · Lucide · Lenis**.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Development server (Turbopack)       |
| `npm run build`     | Production build (all pages static)  |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | ESLint (Next core-web-vitals + TS)   |
| `npm run typecheck` | TypeScript, no emit                  |

## Before you launch — checklist

1. **Personal details** — `content/site.ts`: email and GitHub are set; LinkedIn and Instagram still point to the platform homepages.
2. **Testimonials** — `content/profile.ts` → `testimonials` are **placeholder copy**. Replace with real, approved quotes.
3. **Case-study figures** — `content/projects.ts`: years and the `outcome.metrics` of Sultan Yakhni Pulao, MealWheelz and Digivora are marked `placeholder: true`. Replace with verified numbers.
4. **Résumé PDF** — `public/resume.pdf` is generated from the `/resume` page. After editing your details, open `/resume`, click **Print / Save as PDF**, and overwrite `public/resume.pdf`.
5. **Contact form** — copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (a sender on a domain verified in [Resend](https://resend.com)). Without them the form validates normally and shows an "email me directly" fallback.
6. **Domain** — on Vercel the site URL comes from the production domain automatically (custom domains included). `NEXT_PUBLIC_SITE_URL` overrides it if set.
7. **Analytics** — `@vercel/analytics` and `@vercel/speed-insights` are installed. Turn them on once in the Vercel dashboard: Project → Analytics → Enable, and Project → Speed Insights → Enable.

## Project structure

```
app/
  layout.tsx              Root layout: fonts, metadata, providers, loader, cursor, header/footer
  page.tsx                Home — all sections + Person/WebSite JSON-LD
  work/[slug]/            Case studies (statically generated) + per-project OG images
  resume/                 Print-ready A4 résumé
  actions/contact.ts      Server action: validation, honeypot, rate limit, Resend
  opengraph-image.tsx     Dynamic social card (also used for Twitter)
  sitemap.ts · robots.ts · manifest.ts · icon.svg · apple-icon.tsx · not-found.tsx
components/
  sections/               Hero, About, Experience, Services, Skills, Work, Process, Testimonials, Contact
  art/                    Hand-built SVG/CSS illustrations for every case study (no image files)
  motion/                 Reveal, SplitText, ScrollText, Counter, Parallax, Magnetic
  effects/                Intro loader, cursor follower, spotlight card, marquee, local time, rotating words
  layout/                 Header (glass nav + mobile menu), footer, theme toggle
  providers/              Theme (next-themes), Lenis smooth scroll, intro state, MotionConfig
  ui/                     shadcn-style primitives (Button, Badge, form fields)
content/                  All copy & data — edit here, not in components
lib/                      utils (cn, easing), contact schema (zod), OG helpers
```

## Editing content

Everything you'd want to change lives in `content/`:

- `site.ts` — name, roles, tagline, contact, socials, navigation
- `profile.ts` — hero stats, about, experience, services, skills, tools, process, testimonials
- `projects.ts` — case studies: problem, research, process, wireframes, design system, final design, outcome

Each case study's visuals (cover, wireframe, final-design panels) are React components in `components/art/<slug>.tsx`, registered in `components/art/index.tsx`. To use real photography instead, swap a panel's `Art` component for a `next/image`.

## Features

- **Design** — Inter, editorial type scale, #111 / #FFF / #F8F8F8 palette with a #F1692D accent, glass surfaces, film grain.
- **Motion** — intro loader (once per session), word-by-word headline reveals, scroll-linked text, animated counters, parallax covers, magnetic CTAs, spotlight hover, cursor follower, Lenis smooth scrolling. All motion respects `prefers-reduced-motion`.
- **Dark / light mode** — follows the system, with a toggle; no flash on load.
- **Project filtering** — animated category filter with accessible pressed states.
- **SEO** — per-page metadata, canonical URLs, Open Graph/Twitter images, JSON-LD (Person, WebSite, ItemList, CreativeWork), sitemap, robots, web manifest.
- **Accessibility** — semantic landmarks, skip link, visible focus, keyboard-trapped mobile menu, ARIA-labelled carousel and filters, AA colour contrast (verified with axe-core in both themes).
- **Performance** — every route is statically pre-rendered; illustrations are code (no image downloads); covers render on the server.

## Deploying

Deploy to [Vercel](https://vercel.com/new) (zero config) or any Node host with `npm run build && npm run start`. Remember the environment variables from the checklist.
