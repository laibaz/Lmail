# LMAIL website

The public landing page for LMAIL — Next.js 14, Tailwind CSS, Framer Motion.
Colours: midnight `#0B0B1A`, electric violet `#7C5CFF`, lime `#C6FF3D`, pink `#FF6B9A`.

## Run locally

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Edit

- Links (demo booking, app login): `components/site.ts`
- Text for each section: the matching file in `components/`
- Colours and animations: `tailwind.config.ts`

## Deploy to Vercel at lmail.laibstudios.com

1. vercel.com → **Add New → Project** → import the `Lmail` GitHub repo.
2. Set **Root Directory** to `web` (framework is detected as Next.js). Deploy.
3. Project → **Settings → Domains** → add `lmail.laibstudios.com`.
4. In your DNS, add the record Vercel shows (usually `CNAME lmail → cname.vercel-dns.com`).
