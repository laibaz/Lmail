#!/usr/bin/env python3
"""Builds the LMAIL showcase email templates into emails/templates/.

The emails are for made-up brands, to show what finished campaigns look like: "Solenne"
(skincare, with photography) and "Northside Run Club" (bold type and colour, no photos). They are table-based HTML with inline styles (what email apps need), stack into
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
# Northside Run Club: a made-up running club. Bold type and colour, no photos.
# ---------------------------------------------------------------------------
N_BLACK, N_LIME, N_GREY, N_PAPER, N_MUTED = "#0E0F0C", "#D7FF3D", "#1B1D17", "#F4F5EF", "#9BA08F"
IMPACT = "font-family:'Arial Black',Impact,'Helvetica Neue',Arial,sans-serif;font-weight:900;"


def n_btn(label, bg=N_LIME, fg=N_BLACK):
    return (f'<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background-color:{bg};">'
            f'<a href="https://" style="display:inline-block;padding:16px 30px;{SANS}font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:{fg};text-decoration:none;">{label} &rarr;</a>'
            f'</td></tr></table>')


def n_header():
    return (f'<tr><td style="background-color:{N_BLACK};padding:22px 32px;border-bottom:1px solid #2A2D22;" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
            f'<td align="left" style="{IMPACT}font-size:20px;letter-spacing:1px;color:#ffffff;">NORTHSIDE<span style="color:{N_LIME};">/</span>RC</td>'
            f'<td align="right" style="{SANS}font-size:11px;letter-spacing:2px;text-transform:uppercase;color:{N_MUTED};">Run club</td>'
            f'</tr></table></td></tr>')


def n_footer():
    return (f'<tr><td style="background-color:{N_BLACK};padding:32px;border-top:1px solid #2A2D22;{SANS}" class="pad">'
            f'<div style="{IMPACT}font-size:16px;letter-spacing:1px;color:#ffffff;">NORTHSIDE<span style="color:{N_LIME};">/</span>RC</div>'
            f'<div style="margin-top:12px;font-size:12px;line-height:1.6;color:{N_MUTED};">Northside Run Club, 4 Canal Street<br>{{unsubscribe_text}}</div></td></tr>')


def n_page(title, preheader, rows, bg=N_BLACK):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
{HEAD}
<title>{title}</title>
</head>
<body style="margin:0;padding:0;background-color:#000000;">
<div style="display:none;max-height:0;overflow:hidden;">{preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:{bg};">
{n_header()}
{rows}
{n_footer()}
</table>
</td></tr>
</table>
</body>
</html>
"""


def n_race():
    def fact(top, bottom):
        return (f'<td class="col" width="33%" valign="top" style="padding:0 0 16px 0;">'
                f'<div style="{SANS}font-size:11px;letter-spacing:2px;text-transform:uppercase;color:{N_MUTED};">{top}</div>'
                f'<div style="margin-top:6px;{IMPACT}font-size:22px;color:#ffffff;">{bottom}</div></td>')
    rows = (f'<tr><td style="padding:48px 32px 12px 32px;background-color:{N_BLACK};" class="pad">'
            f'<div style="{SANS}font-size:12px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:{N_LIME};">Sunday 10K</div>'
            f'<div class="big" style="margin-top:14px;{IMPACT}font-size:88px;line-height:.92;letter-spacing:-2px;color:#ffffff;">RACE<br>DAY<br><span style="color:{N_LIME};">IS ON.</span></div></td></tr>'
            f'<tr><td style="padding:22px 32px 30px 32px;background-color:{N_BLACK};{SANS}font-size:17px;line-height:1.6;color:#D6D9CC;" class="pad">'
            f'{{contactfield=firstname}}, your place is saved. Here is everything you need for Sunday.</td></tr>'
            f'<tr><td style="padding:26px 32px 10px 32px;background-color:{N_GREY};" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
            + fact("Start", "8:00 am") + fact("Meet", "Canal Bridge") + fact("Distance", "10 km")
            + f'</tr></table></td></tr>'
            f'<tr><td style="padding:34px 32px 44px 32px;background-color:{N_BLACK};" class="pad">{n_btn("See the route")}</td></tr>'
            f'<tr><td style="padding:34px 32px;background-color:{N_LIME};" class="pad">'
            f'<div style="{IMPACT}font-size:30px;line-height:1.05;color:{N_BLACK};">BRING A FRIEND.<br>THEY RUN FREE.</div>'
            f'<div style="margin-top:10px;{SANS}font-size:15px;line-height:1.5;color:{N_BLACK};">Guests are welcome at every Sunday run this month.</div></td></tr>')
    return n_page("Race day is on", "Your place is saved. Everything you need for Sunday.", rows)


def n_welcome():
    def perk(n, title, text):
        return (f'<tr><td style="padding:22px 32px;background-color:{N_BLACK};border-top:1px solid #2A2D22;" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
                f'<td width="76" valign="top" style="{IMPACT}font-size:44px;line-height:1;color:{N_LIME};">{n}</td>'
                f'<td valign="top"><div style="{IMPACT}font-size:20px;color:#ffffff;">{title}</div>'
                f'<div style="margin-top:6px;{SANS}font-size:15px;line-height:1.55;color:#C4C8B8;">{text}</div></td></tr></table></td></tr>')
    rows = (f'<tr><td style="padding:52px 32px 40px 32px;background-color:{N_LIME};" class="pad">'
            f'<div class="big" style="{IMPACT}font-size:72px;line-height:.95;letter-spacing:-1px;color:{N_BLACK};">YOU&#39;RE<br>IN.</div>'
            f'<div style="margin-top:18px;{SANS}font-size:18px;line-height:1.5;color:{N_BLACK};">Welcome to Northside, {{contactfield=firstname}}. Here is how the club works.</div></td></tr>'
            + perk("01", "THREE RUNS A WEEK", "Tuesday track, Thursday tempo, Sunday long run. Come to one or all three.")
            + perk("02", "EVERY PACE WELCOME", "Groups from walk-run to sub 40. Nobody gets left behind.")
            + perk("03", "COFFEE AFTER", "We finish at the same cafe every Sunday. First one is on us.")
            + f'<tr><td style="padding:34px 32px 46px 32px;background-color:{N_BLACK};border-top:1px solid #2A2D22;" class="pad">{n_btn("Pick your first run")}</td></tr>')
    return n_page("Welcome to Northside", "You are in. Here is how the club works.", rows)


def n_plan():
    def day(d, name, detail, hi=False):
        bg = N_LIME if hi else N_GREY
        fg = N_BLACK if hi else "#ffffff"
        sub = N_BLACK if hi else "#C4C8B8"
        return (f'<tr><td style="padding:0 32px 8px 32px;background-color:{N_BLACK};" class="pad"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
                f'<td style="padding:18px 20px;background-color:{bg};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
                f'<td width="74" valign="middle" style="{IMPACT}font-size:20px;color:{fg};">{d}</td>'
                f'<td valign="middle"><div style="{SANS}font-size:16px;font-weight:bold;color:{fg};">{name}</div>'
                f'<div style="margin-top:3px;{SANS}font-size:14px;color:{sub};">{detail}</div></td></tr></table></td></tr></table></td></tr>')
    rows = (f'<tr><td style="padding:46px 32px 26px 32px;background-color:{N_BLACK};" class="pad">'
            f'<div style="{SANS}font-size:12px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:{N_LIME};">This week</div>'
            f'<div class="h1" style="margin-top:12px;{IMPACT}font-size:48px;line-height:1;letter-spacing:-1px;color:#ffffff;">YOUR PLAN,<br>{{contactfield=firstname}}.</div></td></tr>'
            + day("TUE", "Track session", "6 x 800 m, steady. 6:30 pm at the stadium.")
            + day("THU", "Tempo run", "30 minutes at a pace you can hold. 6:30 pm.")
            + day("SUN", "Long run", "14 km along the canal. 8:00 am at the bridge.", hi=True)
            + f'<tr><td style="padding:28px 32px 46px 32px;background-color:{N_BLACK};" class="pad">'
              f'<div style="{SANS}font-size:15px;line-height:1.6;color:#C4C8B8;margin-bottom:24px;">Missed a session? Swap it for an easy 5 km. Showing up matters more than the splits.</div>{n_btn("Open the full plan")}</td></tr>')
    return n_page("Your plan this week", "Three sessions, one long run.", rows)


TEMPLATES = {
    "launch": launch, "welcome": welcome, "sale": sale, "journal": journal,
    "northside-race": n_race, "northside-welcome": n_welcome, "northside-plan": n_plan,
}

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in TEMPLATES.items():
        (OUT / f"{name}.html").write_text(fn())
        print("wrote", f"emails/templates/{name}.html")
