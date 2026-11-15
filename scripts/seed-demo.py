#!/usr/bin/env python3
"""Fill an LMAIL install with demo data for client presentations.

Creates the "Account A" / "Account B" segments, imports demo/lmail-contacts.csv
into them, and adds the welcome email (emails/welcome.html) for Account A.

Needs the API turned on (the script does this for a local Docker install):
    ./scripts/seed-demo.py --user admin --password '...' [--url http://localhost:8080]

Only use on a demo install — the contacts are fake (@example.com).
"""
import argparse, base64, csv, json, pathlib, subprocess, sys, urllib.request, urllib.error

ROOT = pathlib.Path(__file__).resolve().parent.parent
ap = argparse.ArgumentParser()
ap.add_argument("--url", default="http://localhost:8080")
ap.add_argument("--user", required=True)
ap.add_argument("--password", required=True)
ap.add_argument("--no-enable-api", action="store_true", help="skip turning on the API in the local container")
a = ap.parse_args()

if not a.no_enable_api:
    php = ("$f='/var/www/html/config/local.php'; include $f; "
           "$parameters['api_enabled']=true; $parameters['api_enable_basic_auth']=true; "
           "file_put_contents($f, '<?php\n$parameters = '.var_export($parameters, true).';\n');")
    subprocess.run(["docker", "compose", "exec", "-T", "-u", "www-data", "mautic", "php", "-r", php], check=True, cwd=ROOT)
    subprocess.run(["docker", "compose", "exec", "-T", "-u", "www-data", "-w", "/var/www/html", "mautic",
                    "php", "bin/console", "cache:clear", "-q"], check=True, cwd=ROOT)

auth = "Basic " + base64.b64encode(f"{a.user}:{a.password}".encode()).decode()

def api(method, path, body=None):
    req = urllib.request.Request(a.url.rstrip("/") + "/api" + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Authorization": auth, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        sys.exit(f"{method} {path} failed: {e.code} {e.read()[:300]!r}")

segments = {}
for key, name in (("account-a", "Account A"), ("account-b", "Account B")):
    found = api("GET", "/segments?limit=100")
    existing = [s for s in (found.get("lists") or {}).values() if s["name"] == name]
    seg = existing[0] if existing else api("POST", "/segments/new", {"name": name, "alias": key, "isPublished": True,
                                            "description": f"Demo client — {name}"})["list"]
    segments[key] = seg["id"]
print("segments:", segments)

rows = list(csv.DictReader(open(ROOT / "demo/lmail-contacts.csv")))
payload = [{"firstname": r["firstname"].title(), "lastname": r["lastname"].title(), "email": r["email"],
            "city": r["city"].title(), "country": r["country"].title(), "tags": [r["account"]]} for r in rows]
created = api("POST", "/contacts/batch/new", payload)["contacts"]
for c, r in zip(created, rows):
    api("POST", f"/segments/{segments[r['account']]}/contact/{c['id']}/add")
print("contacts:", len(created))

html = (ROOT / "emails/welcome.html").read_text()
emails = api("GET", "/emails?limit=100").get("emails") or {}
if not any(e["name"] == "Welcome — Account A" for e in emails.values()):
    api("POST", "/emails/new", {"name": "Welcome — Account A", "subject": "Welcome to your LMAIL account, {contactfield=firstname}",
                                "customHtml": html, "emailType": "list", "lists": [segments["account-a"]],
                                "isPublished": True, "fromName": "LMAIL"})
print("done")
