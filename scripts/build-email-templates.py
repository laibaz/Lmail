#!/usr/bin/env python3
"""Builds the LMAIL starter email templates into emails/templates/.

Each template is plain table-based HTML with inline styles (what email apps need),
uses the LMAIL palette, and carries Mautic tokens: {contactfield=firstname} and {unsubscribe_text}.
The sample wording is placeholder content for an imaginary shop; replace it per client.

    python3 scripts/build-email-templates.py
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "emails" / "templates"
INK, MUTED, LINE, SOFT = "#17172B", "#5F5C75", "#E6E2EE", "#F6F4FA"
PINK, MAUVE, PURPLE, BLUE, TINT = "#DB82AF", "#A466A6", "#7458A0", "#244697", "#FBEEF4"
FONT = "font-family:Arial,Helvetica,sans-serif;"
GRAD = f"background-color:{PURPLE};background-image:linear-gradient(120deg,{PINK},{PURPLE} 55%,{BLUE});"


def row(inner, pad="0 40px", extra=""):
    return f'<tr><td style="padding:{pad};{FONT}{extra}" align="left">{inner}</td></tr>'


def button(label, color=BLUE, href="https://"):
    return (f'<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background-color:{color};border-radius:8px;">'
            f'<a href="{href}" style="display:inline-block;padding:14px 28px;{FONT}font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">{label}</a>'
            f'</td></tr></table>')


def p(text, size=16, color=MUTED, margin="0 0 16px 0"):
    return f'<p style="margin:{margin};font-size:{size}px;line-height:1.6;color:{color};">{text}</p>'


def h(text, size=28):
    return f'<div style="font-size:{size}px;font-weight:bold;line-height:1.2;color:{INK};">{text}</div>'


def brand(name, on_dark=False):
    c = "#ffffff" if on_dark else INK
    return f'<div style="font-size:17px;font-weight:bold;letter-spacing:1px;color:{c};">{name}</div>'


def footer(name):
    return (row(f'<div style="border-top:1px solid {LINE};"></div>', "8px 40px 0")
            + row(f'<p style="margin:0;font-size:12px;line-height:1.6;color:#8A889C;">{name}<br>{{unsubscribe_text}}</p>', "20px 40px 32px"))


def page(title, preheader, rows):
    return f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
</head>
<body style="margin:0;padding:0;background-color:{SOFT};">
<div style="display:none;max-height:0;overflow:hidden;">{preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:{SOFT};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;">
{rows}
</table>
</td></tr>
</table>
</body>
</html>
'''


def welcome():
    steps = "".join(
        f'<tr><td style="padding:0 0 14px 0;vertical-align:top;width:44px;"><div style="width:32px;height:32px;border-radius:16px;background-color:{TINT};color:{MAUVE};{FONT}font-weight:bold;font-size:14px;line-height:32px;text-align:center;">{n}</div></td>'
        f'<td style="padding:4px 0 14px 0;{FONT}font-size:15px;line-height:1.5;color:{MUTED};"><strong style="color:{INK};">{t}</strong><br>{d}</td></tr>'
        for n, t, d in [("1", "Pick your favourites", "Browse the shop and save what you like."),
                        ("2", "Get it delivered", "We roast on Mondays and ship the same week."),
                        ("3", "Tell us what you think", "Reply to any email. A real person reads it.")])
    rows = (f'<tr><td style="padding:36px 40px;{GRAD}{FONT}" align="left">{brand("MORNING CLUB", True)}'
            f'<div style="margin-top:44px;font-size:34px;font-weight:bold;line-height:1.15;color:#ffffff;">Welcome, {{contactfield=firstname}}.</div>'
            f'<div style="margin-top:10px;font-size:17px;line-height:1.5;color:#ffffff;">Glad you are here.</div></td></tr>'
            + row(p("Thanks for joining Morning Club. Here is how it works:", margin="0 0 20px 0"), "32px 40px 0")
            + row(f'<table role="presentation" cellpadding="0" cellspacing="0" width="100%">{steps}</table>')
            + row(button("Visit the shop"), "8px 40px 32px")
            + footer("Morning Club"))
    return page("Welcome", "Thanks for joining. Here is how it works.", rows)


def newsletter():
    def item(tag, title, text):
        return (f'<div style="font-size:12px;font-weight:bold;letter-spacing:1px;color:{MAUVE};text-transform:uppercase;">{tag}</div>'
                f'<div style="margin:6px 0 6px 0;font-size:19px;font-weight:bold;line-height:1.3;color:{INK};">{title}</div>'
                + p(text, 15, margin="0"))
    rows = (row(f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="{FONT}">{brand("THE STUDIO NOTE")}</td>'
                f'<td align="right" style="{FONT}font-size:13px;color:{MUTED};">Monthly update</td></tr></table>', "28px 40px 20px")
            + f'<tr><td style="padding:0 40px;"><div style="height:4px;border-radius:2px;{GRAD}font-size:0;line-height:0;">&nbsp;</div></td></tr>'
            + row(p("Hi {contactfield=firstname},", color=INK, margin="0 0 10px 0") + h("Three things worth your time this month", 26), "28px 40px 8px")
            + row(p("A short read: one idea, one update from us, and one thing we liked.", margin="0"), "8px 40px 24px")
            + row(item("Idea", "Send fewer, better emails", "One useful email a week beats five forgettable ones. Here is how to plan it."), "0 40px 22px")
            + row(f'<div style="border-top:1px solid {LINE};"></div>')
            + row(item("From us", "New templates in your account", "Four ready-made designs you can fill in and send in minutes."), "22px 40px")
            + row(f'<div style="border-top:1px solid {LINE};"></div>')
            + row(item("We liked", "A subject line that worked", "Short, specific, and it said exactly what was inside."), "22px 40px 28px")
            + row(button("Read the full note", INK), "0 40px 32px")
            + footer("The Studio Note"))
    return page("Newsletter", "Three things worth your time this month.", rows)


def sale():
    rows = (row(brand("OAK &amp; LINEN"), "28px 40px 24px")
            + f'<tr><td style="padding:0 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
              f'<td align="center" style="padding:44px 24px;border-radius:16px;background-color:{BLUE};{FONT}">'
              f'<div style="font-size:14px;font-weight:bold;letter-spacing:2px;color:{PINK};">THIS WEEKEND ONLY</div>'
              f'<div style="margin-top:10px;font-size:64px;font-weight:bold;line-height:1;color:#ffffff;">20% off</div>'
              f'<div style="margin-top:10px;font-size:18px;color:#ffffff;">everything in the shop</div></td></tr></table></td></tr>'
            + row(p("Hi {contactfield=firstname},", color=INK, margin="0 0 10px 0")
                  + p("From Friday to Sunday, everything is 20% off. Use this code at checkout:"), "30px 40px 0")
            + f'<tr><td style="padding:0 40px 24px 40px;" align="left"><table role="presentation" cellpadding="0" cellspacing="0"><tr>'
              f'<td style="padding:14px 22px;border:2px dashed {MAUVE};border-radius:8px;background-color:{TINT};font-family:Courier New,Courier,monospace;font-size:22px;font-weight:bold;letter-spacing:3px;color:{INK};">WEEKEND20</td></tr></table></td></tr>'
            + row(button("Shop the sale"), "0 40px 12px")
            + row(p("Ends Sunday at midnight.", 13, margin="0"), "0 40px 30px")
            + footer("Oak &amp; Linen"))
    return page("Weekend sale", "20% off everything, this weekend only.", rows)


def launch():
    def feat(title, text):
        return (f'<td width="50%" style="padding:0 8px 16px 8px;vertical-align:top;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
                f'<td style="padding:18px;border-radius:12px;background-color:{SOFT};{FONT}"><div style="font-size:16px;font-weight:bold;color:{INK};">{title}</div>'
                f'<div style="margin-top:6px;font-size:14px;line-height:1.5;color:{MUTED};">{text}</div></td></tr></table></td>')
    rows = (row(brand("FIELD NOTES APP"), "28px 40px 8px")
            + row(f'<div style="display:inline-block;padding:6px 12px;border-radius:999px;background-color:{TINT};font-size:12px;font-weight:bold;letter-spacing:1px;color:{MAUVE};">NEW</div>'
                  f'<div style="margin-top:16px;font-size:36px;font-weight:bold;line-height:1.12;color:{INK};">Shared notebooks are here</div>', "24px 40px 0")
            + row(p("Hi {contactfield=firstname}, you asked for a way to work on notes together. From today you can invite anyone to a notebook.", 17, margin="0"), "16px 40px 26px")
            + f'<tr><td style="padding:0 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
              + feat("Invite by email", "Add people in two clicks.") + feat("See who changed what", "Every edit is marked.") + '</tr><tr>'
              + feat("Works offline", "Edits sync when you reconnect.") + feat("Included in your plan", "No extra cost.") + '</tr></table></td></tr>'
            + row(button("Try shared notebooks", PURPLE), "12px 40px 32px")
            + footer("Field Notes App"))
    return page("Product launch", "Shared notebooks are here.", rows)


TEMPLATES = {"welcome": welcome, "newsletter": newsletter, "sale": sale, "product-launch": launch}

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in TEMPLATES.items():
        (OUT / f"{name}.html").write_text(fn())
        print("wrote", f"emails/templates/{name}.html")
