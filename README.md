# Parah, Chen and King Attorneys website

Next.js site. There is no admin or database: all content lives in `content/`, and a change goes live when it is merged and deployed.

| To change | Edit |
| --- | --- |
| Firm name, phone, email, hours, colours, fonts | `content/site.ts` |
| Office addresses | `content/offices.ts` |
| Home page text | `content/home.ts` |
| Home carousel slides | `content/hero-slides.ts` |
| About and Contact text | `content/about.ts`, `content/contact.ts` |
| Partners | `content/partners.ts` |
| Practice areas | `content/practice-areas.ts` |
| Energy page | `lib/energy-sectors.ts` |
| List of all 19 practice areas | `lib/core-practice-areas.ts` |

Images go in `public/images/`.

## Contact form

Enquiries are emailed. Set `SMTP_USER` and `SMTP_PASS` in the hosting environment (see `.env.example`). Without them the form tells the visitor to email or call instead.

## Commands

- `npm run dev`: local site at http://localhost:3000
- `npm run build`: production build
