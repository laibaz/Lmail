# LMAIL website

The public landing page for LMAIL. Built with Next.js 14, Tailwind CSS, Motion, Geist and Phosphor icons.

Colours (same as the LMAIL app): pink `#DB82AF`, mauve `#A466A6`, purple `#7458A0`, blue `#244697`,
with ink `#17172B` and white. Light theme.

The images in `public/` are real screenshots of the LMAIL app and the welcome email.
To refresh them after changing the app, retake the screenshots at 1280x800 and save as WebP.

## Run locally

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Pages

- `/` home, `/ai-writer`, `/templates`, `/how-it-works`, `/faq`, `/demo` (Calendly calendar)
- Each page is a file in `app/<name>/page.tsx`; shared pieces are in `components/`
- Founder photo: add a square image at `public/founder.jpg` and it replaces the initials on the home page
- Email template previews in `public/templates/` come from `../emails/templates/` (built by `../scripts/build-email-templates.py`)

## Edit

- Links (Calendly booking page, "Log in" address): `components/site.ts`
- Text for each section: the matching file in `components/`
- Colours and animations: `tailwind.config.ts`

## Deploy to Vercel at lmail.laibstudios.com

1. vercel.com → **Add New → Project** → import the `Lmail` GitHub repo.
2. Set **Root Directory** to `web` (framework is detected as Next.js). Deploy.
3. Project → **Settings → Domains** → add `lmail.laibstudios.com`.
4. In your DNS, add the record Vercel shows (usually `CNAME lmail → cname.vercel-dns.com`).
