# LMAIL showcase email templates

Ten complete emails for four made-up businesses.

**Graphic emails** (colour, shape and type, no photos, in the LMAIL palette)
- `kiln-class.html`, `kiln-friday.html`: Kiln Street Bakery (class invitation, weekly delivery)
- `stem-bouquet.html`, `stem-wreath.html`: Wild Stem Florist (seasonal offer, back in stock)
- `north-service.html`, `north-stock.html`: Northbound Cycles (service week, restock alert)

**Solenne** (skincare, with photography)
- `launch.html`, `welcome.html`, `sale.html`, `journal.html`

They are built by `scripts/build-email-templates.py`. Each one stacks into a single column on
phones and uses the Mautic tokens `{contactfield=firstname}` and `{unsubscribe_text}`.

The curved shapes in the graphic emails use rounded corners and negative margins. Most email apps
show them as designed; desktop Outlook shows plain rectangles instead, and the email still reads fine.

The photos live in `web/public/email-assets/` and are loaded from `https://lmail.laibstudios.com/email-assets/`.
For a real client, swap in their brand name, colours, photos and links.

To use one in LMAIL: create a new email, choose the Code Mode theme, and paste the file
contents into the editor.
