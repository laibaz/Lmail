# LMAIL branding

Brand assets that turn the stock Mautic UI into LMAIL.

| File | What it is |
|---|---|
| `lmail-logo.svg` | Full logo (red L tile + "LMAIL" wordmark), vector |
| `lmail-logo.png` | Full logo, dark wordmark — for light backgrounds |
| `lmail-logo-white.png` | Full logo, white wordmark — for dark backgrounds |
| `lmail-icon.png` | 512×512 red "L" app icon |
| `lmail-mascot.png` | LMAIL mascot |
| `favicon.ico` | Browser tab icon (16×16, 32×32) |
| `lmail.css` | **The full LMAIL theme** — all CSS rounds combined into one file |
| `css-history/` | The original CSS rounds (logo, theme 1–7, modern pass), kept for reference |

Brand red: `#D61D38` · Text black: `#0D0D0D`

## Where these go inside the Mautic container

- Images → `/var/www/html/docroot/media/images/` (the CSS expects `/media/images/lmail-logo.png`)
- Favicon → `/var/www/html/docroot/favicon.ico`
- Theme → `lmail.css` must be loaded on every Mautic page (it expects `lmail-logo.png` and `lmail-mascot.png` in `/media/images/`)

## How it's applied

On the original laptop build the theme CSS was appended to the end of
Mautic's compiled stylesheet, `/var/www/html/docroot/media/css/app.css`.
Mautic can regenerate that file on updates, so the rebrand is re-applied with:

```bash
./scripts/apply-branding.sh
```

It copies the images and favicon in, and (re)writes the LMAIL block at the
end of `app.css` between `LMAIL BRANDING START/END` markers, so it is safe to
run repeatedly.
