# LMAIL showcase email templates

Four campaign designs, shown with "Solenne", a made-up skincare brand:

- `launch.html`: product launch with hero photo and product grid
- `welcome.html`: welcome email with a discount code
- `sale.html`: sale with before and after prices
- `journal.html`: newsletter that walks through three steps

They are built by `scripts/build-email-templates.py`. Each one stacks into a single column on
phones and uses the Mautic tokens `{contactfield=firstname}` and `{unsubscribe_text}`.

The photos live in `web/public/email-assets/` and are loaded from `https://lmail.laibstudios.com/email-assets/`.
For a real client, swap in their brand name, colours, photos and links.

To use one in LMAIL: create a new email, choose the Code Mode theme, and paste the file
contents into the editor.
