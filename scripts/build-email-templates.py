#!/usr/bin/env python3
"""Builds the LMAIL showcase email templates into emails/templates/.

The emails are for made-up brands, to show what finished campaigns look like: "Solenne"
(skincare, with photography), and graphic emails for Kiln Street Bakery, Wild Stem Florist and
Northbound Cycles (colour, shape and type, no photos). They are table-based HTML with inline styles (what email apps need), stack into
one column on phones, and carry the Mautic tokens {contactfield=firstname} and {unsubscribe_text}.
Images are served from the LMAIL website (web/public/email-assets/).

    python3 scripts/build-email-templates.py
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "emails" / "templates"
IMG = "https://lmail.laibstudios.com/email-assets"

PLUM, PLUM_DARK, ROSE, BLUSH, CREAM = "#4A2545", "#33182F", "#D9A5B8", "#F6E6EC", "#FBF6F3"
INK, MUTED, LINE = "#2A1A28", "#6E5A6B", "#EADCE2"
SANS = "font-family:Arial,Helvetica,sans-serif;"
SERIF = "font-family:Georgia,'Times New Roman',serif;"

HEAD = f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  @media only screen and (max-width:620px) {{
    .wrap {{ width:100% !important; }}
    .col {{ display:block !important; width:100% !important; padding-left:0 !important; padding-right:0 !important; }}
    .pad {{ padding-left:24px !important; padding-right:24px !important; }}
    .h1 {{ font-size:34px !important; }}
    .big {{ font-size:54px !important; }}
  }}
</style>'''


def img(name, alt, width=600, style=""):
    return f'<img src="{IMG}/{name}.jpg" width="{width}" alt="{alt}" style="display:block;width:100%;max-width:{width}px;height:auto;border:0;{style}">'


def btn(label, bg=PLUM, fg="#ffffff"):
    return (f'<table role="presentation" cellpadding="0" cellspacing="0" align="center"><tr><td style="background-color:{bg};border-radius:999px;">'
            f'<a href="https://" style="display:inline-block;padding:15px 34px;{SANS}font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:{fg};text-decoration:none;">{label}</a>'
            f'</td></tr></table>')


def header():
    link = f'{SANS}font-size:11px;letter-spacing:2px;color:{ROSE};text-decoration:none;text-transform:uppercase;'
    return (f'<tr><td style="background-color:{PLUM};padding:22px 32px;" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
            f'<td width="25%" align="left"><a href="https://" style="{link}">Shop</a></td>'
            f'<td width="50%" align="center" style="{SERIF}font-size:26px;letter-spacing:8px;color:#ffffff;">SOLENNE</td>'
            f'<td width="25%" align="right"><a href="https://" style="{link}">Journal</a></td>'
            f'</tr></table></td></tr>')


def footer():
    link = f'color:{ROSE};text-decoration:none;'
    return (f'<tr><td style="background-color:{PLUM_DARK};padding:36px 32px;{SANS}" align="center" class="pad">'
            f'<div style="{SERIF}font-size:20px;letter-spacing:6px;color:#ffffff;">SOLENNE</div>'
            f'<div style="margin-top:14px;font-size:12px;letter-spacing:2px;text-transform:uppercase;">'
            f'<a href="https://" style="{link}">Shop</a> &nbsp;&nbsp; <a href="https://" style="{link}">Journal</a> &nbsp;&nbsp; <a href="https://" style="{link}">Help</a></div>'
            f'<div style="margin-top:18px;font-size:12px;line-height:1.6;color:#B79CB2;">Solenne Skincare, 12 Garden Row<br>{{unsubscribe_text}}</div>'
            f'</td></tr>')


def eyebrow(text, color=PLUM):
    return f'<div style="{SANS}font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:{color};">{text}</div>'


def product(image, alt, name, note, price, was=None):
    was_html = f' <span style="color:#A8909F;text-decoration:line-through;">{was}</span>' if was else ""
    return (f'<td class="col" width="50%" valign="top" style="padding:0 8px 24px 8px;" align="center">'
            f'{img(image, alt, 268, "border-radius:10px;")}'
            f'<div style="margin-top:16px;{SERIF}font-size:20px;color:{INK};">{name}</div>'
            f'<div style="margin-top:4px;{SANS}font-size:13px;color:{MUTED};">{note}</div>'
            f'<div style="margin-top:8px;{SANS}font-size:15px;font-weight:bold;color:{INK};">{price}{was_html}</div>'
            f'<div style="margin-top:14px;"><a href="https://" style="{SANS}font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:{PLUM};text-decoration:underline;">Shop now</a></div>'
            f'</td>')


def products(was=False):
    return (f'<tr><td style="padding:8px 24px 16px 24px;background-color:{CREAM};" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
            + product("solenne-serum", "Glow serum in a frosted glass bottle", "Rose Glow Serum", "Brightens overnight", "$38" if was else "$48", "$48" if was else None)
            + product("solenne-cream", "Night cream in a frosted glass jar", "Cloud Night Cream", "Rich, never heavy", "$34" if was else "$42", "$42" if was else None)
            + '</tr></table></td></tr>')


def page(title, preheader, rows):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
{HEAD}
<title>{title}</title>
</head>
<body style="margin:0;padding:0;background-color:{BLUSH};">
<div style="display:none;max-height:0;overflow:hidden;">{preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:{BLUSH};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:{CREAM};">
{header()}
{rows}
{footer()}
</table>
</td></tr>
</table>
</body>
</html>
'''


def launch():
    rows = (f'<tr><td>{img("solenne-hero", "Solenne bottles and a jar of cream on a pink surface")}</td></tr>'
            f'<tr><td align="center" style="padding:44px 48px 36px 48px;background-color:{CREAM};" class="pad">{eyebrow("New arrival")}'
            f'<div class="h1" style="margin-top:14px;{SERIF}font-size:44px;line-height:1.1;color:{INK};">The Glow Edit</div>'
            f'<div style="margin:16px auto 28px auto;max-width:420px;{SANS}font-size:16px;line-height:1.6;color:{MUTED};">Four pieces for calm, bright skin. Made in small batches, with nothing you do not need.</div>'
            f'{btn("Shop the edit")}</td></tr>'
            + products()
            + f'<tr><td>{img("solenne-hands", "Hands holding a bottle of Solenne serum")}</td></tr>'
            f'<tr><td align="center" style="padding:36px 48px 44px 48px;background-color:{BLUSH};" class="pad">'
            f'<div style="{SERIF}font-size:26px;line-height:1.3;color:{INK};">Two drops, every evening.</div>'
            f'<div style="margin:12px auto 0 auto;max-width:400px;{SANS}font-size:15px;line-height:1.6;color:{MUTED};">Press the serum into clean skin and follow with the night cream.</div></td></tr>')
    return page("The Glow Edit", "Four pieces for calm, bright skin.", rows)


def welcome():
    def perk(n, title, text):
        return (f'<td class="col" width="33%" valign="top" align="center" style="padding:0 10px 20px 10px;">'
                f'<div style="width:44px;height:44px;border-radius:22px;background-color:{PLUM};color:#ffffff;{SERIF}font-size:20px;line-height:44px;margin:0 auto;">{n}</div>'
                f'<div style="margin-top:12px;{SANS}font-size:14px;font-weight:bold;color:{INK};">{title}</div>'
                f'<div style="margin-top:4px;{SANS}font-size:13px;line-height:1.5;color:{MUTED};">{text}</div></td>')
    rows = (f'<tr><td>{img("solenne-hands", "Hands holding a bottle of Solenne serum")}</td></tr>'
            f'<tr><td align="center" style="padding:44px 48px 8px 48px;background-color:{CREAM};" class="pad">{eyebrow("Welcome")}'
            f'<div class="h1" style="margin-top:14px;{SERIF}font-size:42px;line-height:1.12;color:{INK};">Hello, {{contactfield=firstname}}.</div>'
            f'<div style="margin:16px auto 0 auto;max-width:430px;{SANS}font-size:16px;line-height:1.6;color:{MUTED};">Thank you for joining Solenne. Here is a little something for your first order.</div></td></tr>'
            f'<tr><td align="center" style="padding:28px 48px 36px 48px;background-color:{CREAM};" class="pad">'
            f'<table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" style="padding:28px 20px;background-color:{BLUSH};border-radius:14px;">'
            f'<div class="big" style="{SERIF}font-size:64px;line-height:1;color:{PLUM};">15% off</div>'
            f'<div style="margin-top:12px;{SANS}font-size:13px;letter-spacing:2px;text-transform:uppercase;color:{MUTED};">with code</div>'
            f'<div style="margin-top:8px;font-family:Courier New,Courier,monospace;font-size:24px;font-weight:bold;letter-spacing:4px;color:{INK};">HELLO15</div>'
            f'</td></tr></table><div style="height:28px;line-height:28px;font-size:0;">&nbsp;</div>{btn("Start shopping")}</td></tr>'
            f'<tr><td style="padding:12px 24px 24px 24px;background-color:{CREAM};border-top:1px solid {LINE};" class="pad"><div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>'
            f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
            + perk("1", "Small batches", "Made fresh every month.") + perk("2", "Gentle formulas", "Fragrance free and tested.") + perk("3", "Easy returns", "30 days, no questions.")
            + '</tr></table></td></tr>')
    return page("Welcome to Solenne", "A little something for your first order.", rows)


def sale():
    rows = (f'<tr><td align="center" style="padding:52px 32px 48px 32px;background-color:{PLUM};" class="pad">{eyebrow("The winter sale", ROSE)}'
            f'<div class="big" style="margin-top:14px;{SERIF}font-size:76px;line-height:1;color:#ffffff;">20% off</div>'
            f'<div style="margin-top:12px;{SERIF}font-size:24px;font-style:italic;color:{ROSE};">everything, this week only</div>'
            f'<div style="height:28px;line-height:28px;font-size:0;">&nbsp;</div>{btn("Shop the sale", "#ffffff", PLUM)}</td></tr>'
            f'<tr><td>{img("solenne-hero", "Solenne bottles and a jar of cream on a pink surface")}</td></tr>'
            f'<tr><td align="center" style="padding:40px 48px 24px 48px;background-color:{CREAM};" class="pad">'
            f'<div style="{SERIF}font-size:30px;line-height:1.2;color:{INK};">{{contactfield=firstname}}, your favourites are waiting.</div>'
            f'<div style="margin:12px auto 0 auto;max-width:420px;{SANS}font-size:15px;line-height:1.6;color:{MUTED};">The discount is taken at checkout. Ends Sunday at midnight.</div></td></tr>'
            + products(was=True))
    return page("The Winter Sale", "20% off everything, this week only.", rows)


def journal():
    def step(n, image, alt, title, text, flip):
        pic = f'<td class="col" width="44%" valign="middle" style="padding:0 12px;">{img(image, alt, 240, "border-radius:10px;")}</td>'
        txt = (f'<td class="col" width="56%" valign="middle" style="padding:16px 12px;">'
               f'<div style="{SERIF}font-size:44px;line-height:1;color:{ROSE};">{n}</div>'
               f'<div style="margin-top:8px;{SERIF}font-size:22px;color:{INK};">{title}</div>'
               f'<div style="margin-top:8px;{SANS}font-size:15px;line-height:1.6;color:{MUTED};">{text}</div></td>')
        cells = txt + pic if flip else pic + txt
        return f'<tr><td style="padding:0 20px 28px 20px;background-color:{CREAM};" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>{cells}</tr></table></td></tr>'
    rows = (f'<tr><td align="center" style="padding:44px 48px 36px 48px;background-color:{CREAM};" class="pad">{eyebrow("The journal")}'
            f'<div class="h1" style="margin-top:14px;{SERIF}font-size:40px;line-height:1.15;color:{INK};">Your evening routine, in three steps</div>'
            f'<div style="margin:16px auto 0 auto;max-width:430px;{SANS}font-size:16px;line-height:1.6;color:{MUTED};">Hi {{contactfield=firstname}}, five minutes before bed is all it takes.</div></td></tr>'
            f'<tr><td>{img("solenne-hero", "Solenne bottles and a jar of cream on a pink surface")}</td></tr>'
            f'<tr><td style="height:36px;line-height:36px;font-size:0;background-color:{CREAM};">&nbsp;</td></tr>'
            + step("01", "solenne-serum", "Glow serum", "Start with serum", "Two drops on clean, dry skin. Press in, do not rub.", False)
            + step("02", "solenne-cream", "Night cream", "Seal with cream", "A small scoop, warmed between your fingers first.", True)
            + step("03", "solenne-hands", "Hands holding a bottle", "Give it a minute", "Let everything settle before your head hits the pillow.", False)
            + f'<tr><td align="center" style="padding:12px 48px 48px 48px;background-color:{CREAM};" class="pad">{btn("Read the full guide")}</td></tr>')
    return page("The Journal", "Five minutes before bed is all it takes.", rows)



# ---------------------------------------------------------------------------
# Graphic emails for three made-up small businesses. No photos: colour, shape and type.
# They use the LMAIL palette so they sit comfortably next to each other and on the website.
# ---------------------------------------------------------------------------
G_PINK, G_MAUVE, G_PURPLE, G_BLUE, G_NAVY = "#DB82AF", "#A466A6", "#7458A0", "#244697", "#1A3472"
G_BLUSH, G_SKY, G_CREAM, G_INK, G_MUTED = "#FBEEF4", "#DCE6FA", "#FFFBF7", "#17172B", "#5F5C75"
DISPLAY = "font-family:Georgia,'Times New Roman',serif;font-weight:bold;"


def g_pill(label, bg, fg):
    return (f'<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background-color:{bg};border-radius:999px;">'
            f'<a href="https://" style="display:inline-block;padding:14px 28px;{SANS}font-size:14px;font-weight:bold;color:{fg};text-decoration:none;">{label}</a>'
            f'</td></tr></table>')


def g_circle(size, color, margin):
    """A circle that sits partly outside its strip, so only an arc shows."""
    return f'<div style="display:inline-block;width:{size}px;height:{size}px;border-radius:50%;background-color:{color};margin:{margin};"></div>'


def g_page(title, preheader, rows, outer, card):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
{HEAD}
<title>{title}</title>
</head>
<body style="margin:0;padding:0;background-color:{outer};">
<div style="display:none;max-height:0;overflow:hidden;">{preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:{outer};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:{card};">
{rows}
</table>
</td></tr>
</table>
</body>
</html>
"""


def g_foot(name, address, bg, fg, sub):
    return (f'<tr><td style="padding:28px 40px 34px 40px;background-color:{bg};{SANS}" class="pad">'
            f'<div style="font-size:14px;font-weight:bold;color:{fg};">{name}</div>'
            f'<div style="margin-top:6px;font-size:12px;line-height:1.6;color:{sub};">{address}<br>{{unsubscribe_text}}</div></td></tr>')


def kiln_class():
    def row_(k, v):
        return (f'<tr><td style="padding:14px 0;border-top:1px solid #EFE3E9;{SANS}font-size:13px;letter-spacing:1px;text-transform:uppercase;color:{G_MAUVE};" width="34%">{k}</td>'
                f'<td style="padding:14px 0;border-top:1px solid #EFE3E9;{SANS}font-size:16px;color:{G_INK};">{v}</td></tr>')
    rows = (f'<tr><td style="height:12px;line-height:12px;font-size:0;background-color:{G_PINK};">&nbsp;</td></tr>'
            f'<tr><td style="padding:40px 40px 0 40px;{SANS}font-size:13px;font-weight:bold;letter-spacing:1px;color:{G_PINK};" class="pad">Saturday class</td></tr>'
            f'<tr><td style="padding:18px 40px 0 40px;" class="pad"><div class="h1" style="{DISPLAY}font-size:52px;line-height:1.05;color:{G_INK};">Bake your first sourdough</div>'
            f'<div style="margin-top:22px;width:64px;height:5px;border-radius:3px;background-color:{G_PINK};font-size:0;line-height:0;">&nbsp;</div></td></tr>'
            f'<tr><td style="padding:22px 40px 8px 40px;{SANS}font-size:17px;line-height:1.6;color:{G_MUTED};" class="pad">Hi {{contactfield=firstname}}, three hours, eight places, and one loaf to take home. No experience needed.</td></tr>'
            f'<tr><td style="padding:14px 40px 8px 40px;" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
            + row_("When", "Saturday, 9 am to 12 noon") + row_("Where", "The bakery, Kiln Street") + row_("Bring", "An apron and a container")
            + f'</table></td></tr>'
            f'<tr><td style="padding:26px 40px 44px 40px;" class="pad">{g_pill("Save a place", G_PINK, G_INK)}</td></tr>'
            + g_foot("Kiln Street Bakery", "18 Kiln Street", G_BLUSH, G_INK, G_MUTED))
    return g_page("Bake your first sourdough", "Three hours, eight places, one loaf to take home.", rows, G_BLUSH, G_CREAM)


def kiln_friday():
    rows = (f'<tr><td style="background-color:{G_PINK};"><div style="height:150px;overflow:hidden;text-align:right;">{g_circle(260, G_BLUSH, "-110px -70px 0 0")}</div></td></tr>'
            f'<tr><td style="padding:0 40px 0 40px;background-color:{G_PINK};" class="pad"><span style="display:inline-block;padding:6px 14px;border:2px solid {G_INK};border-radius:999px;{SANS}font-size:12px;font-weight:bold;color:{G_INK};">Every Friday</span></td></tr>'
            f'<tr><td style="padding:20px 40px 0 40px;background-color:{G_PINK};" class="pad"><div class="h1" style="{DISPLAY}font-size:54px;line-height:1.03;color:{G_INK};">Fresh loaves,<br>at your door</div></td></tr>'
            f'<tr><td style="padding:20px 40px 0 40px;background-color:{G_PINK};{SANS}font-size:17px;line-height:1.6;color:{G_INK};" class="pad">{{contactfield=firstname}}, join the bread club and we will deliver a warm loaf every Friday morning. Pause or stop any time.</td></tr>'
            f'<tr><td style="padding:28px 40px 48px 40px;background-color:{G_PINK};" class="pad">{g_pill("Join the bread club", G_INK, "#ffffff")}</td></tr>'
            + g_foot("Kiln Street Bakery", "18 Kiln Street", G_CREAM, G_INK, G_MUTED))
    return g_page("Fresh loaves, at your door", "A warm loaf delivered every Friday morning.", rows, G_BLUSH, G_PINK)


def stem_bouquet():
    rows = (f'<tr><td style="background-color:{G_PINK};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;width:100%;"><tr>'
            f'<td style="height:190px;overflow:hidden;vertical-align:bottom;"><div style="height:190px;overflow:hidden;">{g_circle(420, G_PURPLE, "40px 0 0 -90px")}</div></td>'
            f'<td width="34%" style="height:190px;vertical-align:middle;" align="center">{g_circle(96, "#ffffff", "0")}</td></tr></table></td></tr>'
            f'<tr><td style="padding:34px 40px 0 40px;background-color:{G_PURPLE};{SANS}font-size:13px;letter-spacing:1px;color:#E9DDF5;" class="pad">Mother&#39;s Day</td></tr>'
            f'<tr><td style="padding:14px 40px 0 40px;background-color:{G_PURPLE};" class="pad"><div class="h1" style="{SANS}font-size:50px;font-weight:bold;line-height:1.05;letter-spacing:-1px;color:#ffffff;">Hand-tied bouquets, 15% off</div></td></tr>'
            f'<tr><td style="padding:18px 40px 0 40px;background-color:{G_PURPLE};{SANS}font-size:17px;line-height:1.6;color:#F1E9FA;" class="pad">{{contactfield=firstname}}, order by 2 May and we deliver between 7 and 10 May.</td></tr>'
            f'<tr><td style="padding:24px 40px 0 40px;background-color:{G_PURPLE};" class="pad"><table role="presentation" cellpadding="0" cellspacing="0"><tr>'
            f'<td style="padding:12px 18px;border:2px dashed #E9DDF5;border-radius:10px;font-family:Courier New,Courier,monospace;font-size:20px;font-weight:bold;letter-spacing:3px;color:#ffffff;">MUM15</td></tr></table></td></tr>'
            f'<tr><td style="padding:26px 40px 46px 40px;background-color:{G_PURPLE};" class="pad">{g_pill("Order a bouquet", "#ffffff", G_PURPLE)}</td></tr>'
            + g_foot("Wild Stem Florist", "7 Market Lane", "#5E4686", "#ffffff", "#D9CCEA"))
    return g_page("Hand-tied bouquets, 15% off", "Order by 2 May for Mother's Day delivery.", rows, G_BLUSH, G_PURPLE)


def stem_wreath():
    def size(name, price):
        return (f'<td class="col" width="33%" valign="top" style="padding:0 6px 12px 6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
                f'<td align="center" style="padding:22px 10px;background-color:#ffffff;border-radius:14px;">'
                f'<div style="{DISPLAY}font-size:22px;color:{G_PURPLE};">{name}</div><div style="margin-top:6px;{SANS}font-size:15px;color:{G_MUTED};">{price}</div></td></tr></table></td>')
    rows = (f'<tr><td style="padding:16px 40px;background-color:{G_MAUVE};{SANS}font-size:13px;font-weight:bold;letter-spacing:1px;color:#ffffff;" class="pad">Wild Stem Florist</td></tr>'
            f'<tr><td style="padding:44px 40px 0 40px;{SANS}font-size:13px;letter-spacing:1px;color:{G_MAUVE};" class="pad">Back in stock</td></tr>'
            f'<tr><td style="padding:14px 40px 0 40px;" class="pad"><div class="h1" style="{DISPLAY}font-size:48px;line-height:1.08;color:{G_INK};">Dried flower wreaths, made to order</div></td></tr>'
            f'<tr><td style="padding:18px 40px 26px 40px;{SANS}font-size:17px;line-height:1.6;color:{G_MUTED};" class="pad">Three sizes, ready to collect in two days. Tell us your colours and we will do the rest.</td></tr>'
            f'<tr><td style="padding:0 34px 8px 34px;" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
            + size("Small", "25 cm") + size("Medium", "35 cm") + size("Large", "45 cm")
            + f'</tr></table></td></tr>'
            f'<tr><td style="padding:22px 40px 46px 40px;" class="pad">{g_pill("See the sizes", G_PURPLE, "#ffffff")}</td></tr>'
            + g_foot("Wild Stem Florist", "7 Market Lane", G_MAUVE, "#ffffff", "#F3E4F2"))
    return g_page("Dried flower wreaths, made to order", "Three sizes, ready to collect in two days.", rows, "#ffffff", G_BLUSH)


def north_service():
    def job(name, detail):
        return (f'<tr><td style="padding:16px 0;border-top:1px solid #3D5CA8;{SANS}font-size:17px;font-weight:bold;color:#ffffff;">{name}</td>'
                f'<td align="right" style="padding:16px 0;border-top:1px solid #3D5CA8;{SANS}font-size:15px;color:{G_SKY};">{detail}</td></tr>')
    rows = (f'<tr><td style="background-color:{G_BLUE};"><div style="height:170px;overflow:hidden;text-align:right;">{g_circle(300, G_SKY, "-120px -80px 0 0")}</div></td></tr>'
            f'<tr><td style="padding:0 40px;background-color:{G_BLUE};" class="pad"><span style="display:inline-block;padding:6px 14px;border:2px solid {G_SKY};border-radius:999px;{SANS}font-size:12px;font-weight:bold;color:{G_SKY};">Workshop</span></td></tr>'
            f'<tr><td style="padding:20px 40px 0 40px;background-color:{G_BLUE};" class="pad"><div class="h1" style="{SANS}font-size:54px;font-weight:bold;line-height:1.03;letter-spacing:-1px;color:#ffffff;">Winter service week</div></td></tr>'
            f'<tr><td style="padding:18px 40px 20px 40px;background-color:{G_BLUE};{SANS}font-size:17px;line-height:1.6;color:{G_SKY};" class="pad">{{contactfield=firstname}}, get your bike ready for the cold. Checked while you wait.</td></tr>'
            f'<tr><td style="padding:0 40px 6px 40px;background-color:{G_BLUE};" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
            + job("Brakes", "Pads and cables") + job("Chain", "Cleaned and oiled") + job("Tyres", "Pressure and wear")
            + f'</table></td></tr>'
            f'<tr><td style="padding:26px 40px 48px 40px;background-color:{G_BLUE};" class="pad">{g_pill("Book a slot", G_SKY, G_NAVY)}</td></tr>'
            + g_foot("Northbound Cycles", "2 Station Road", G_NAVY, "#ffffff", "#B9C9EC"))
    return g_page("Winter service week", "Brakes, chain and tyres checked while you wait.", rows, G_SKY, G_BLUE)


def north_stock():
    def item(color, name, note):
        return (f'<tr><td width="64" style="padding:14px 0;border-top:1px solid #E3E8F4;"><div style="width:44px;height:44px;border-radius:12px;background-color:{color};font-size:0;line-height:0;">&nbsp;</div></td>'
                f'<td style="padding:14px 0;border-top:1px solid #E3E8F4;{SANS}"><div style="font-size:17px;font-weight:bold;color:{G_INK};">{name}</div>'
                f'<div style="margin-top:3px;font-size:14px;color:{G_MUTED};">{note}</div></td></tr>')
    rows = (f'<tr><td style="height:12px;line-height:12px;font-size:0;background-color:{G_BLUE};">&nbsp;</td></tr>'
            f'<tr><td style="padding:40px 40px 0 40px;{SANS}font-size:13px;font-weight:bold;letter-spacing:1px;color:{G_BLUE};" class="pad">Northbound Cycles</td></tr>'
            f'<tr><td style="padding:16px 40px 0 40px;" class="pad"><div class="h1" style="{SANS}font-size:56px;font-weight:bold;line-height:1;letter-spacing:-1.5px;color:{G_INK};">Back in stock</div>'
            f'<div style="margin-top:22px;width:64px;height:5px;border-radius:3px;background-color:{G_BLUE};font-size:0;line-height:0;">&nbsp;</div></td></tr>'
            f'<tr><td style="padding:22px 40px 10px 40px;{SANS}font-size:17px;line-height:1.6;color:{G_MUTED};" class="pad">The city helmets you asked about have arrived, {{contactfield=firstname}}. Three colours, all sizes.</td></tr>'
            f'<tr><td style="padding:8px 40px 4px 40px;" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
            + item(G_BLUE, "Harbour blue", "Matte finish") + item(G_PINK, "Rose", "Gloss finish") + item(G_PURPLE, "Plum", "Matte finish")
            + f'</table></td></tr>'
            f'<tr><td style="padding:26px 40px 44px 40px;" class="pad">{g_pill("Shop helmets", G_BLUE, "#ffffff")}</td></tr>'
            + g_foot("Northbound Cycles", "2 Station Road", G_SKY, G_INK, G_MUTED))
    return g_page("Back in stock", "The city helmets you asked about have arrived.", rows, G_SKY, "#ffffff")


TEMPLATES = {
    "launch": launch, "welcome": welcome, "sale": sale, "journal": journal,
    "kiln-class": kiln_class, "kiln-friday": kiln_friday,
    "stem-bouquet": stem_bouquet, "stem-wreath": stem_wreath,
    "north-service": north_service, "north-stock": north_stock,
}

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in TEMPLATES.items():
        (OUT / f"{name}.html").write_text(fn())
        print("wrote", f"emails/templates/{name}.html")
