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
| `lmail-logo.css` | CSS override that hides the Mautic logo and shows `lmail-logo.png` |

Brand red: `#D61D38` · Text black: `#0D0D0D`

## Where these go inside the Mautic container

- Images → `/var/www/html/docroot/media/images/` (the CSS expects `/media/images/lmail-logo.png`)
- Favicon → `/var/www/html/docroot/favicon.ico`

TODO: document exactly how `lmail-logo.css` and the red theme are loaded
into Mautic, so the rebrand can be reapplied on a fresh install.
