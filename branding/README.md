# LMAIL branding

Brand assets that turn the stock Mautic UI into LMAIL.

| File | What it is |
|---|---|
| `lmail-logo.svg` | Full logo (gradient L tile + "LMAIL" wordmark), vector |
| `lmail-logo.png` | Full logo, dark wordmark — for light backgrounds |
| `lmail-logo-white.png` | Full logo, white wordmark — for dark backgrounds |
| `lmail-icon.png` | 512×512 "L" app icon (pink to blue gradient) |
| `favicon.ico` | Browser tab icon (16×16, 32×32) |
| `lmail.css` | **The full LMAIL theme** — all CSS rounds combined into one file |
| `css-history/` | The original CSS rounds (logo, theme 1–7, modern pass), kept for reference |

Palette: pink `#DB82AF` · mauve `#A466A6` · purple `#7458A0` · blue `#244697` · ink `#17172B`

## Where these go inside the Mautic container

- Images → `/var/www/html/docroot/media/images/` (the CSS expects `/media/images/lmail-logo.png`)
- Favicon → `/var/www/html/docroot/favicon.ico`

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
