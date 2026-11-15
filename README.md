# LMAIL

LMAIL is a white-label email marketing platform by **Laib Studios**, built on
[Mautic 5](https://www.mautic.org/) (open source, GPL-3.0) with Amazon SES for sending.

This repo holds everything needed to run it: the Docker setup, the LMAIL
rebrand, demo data, and deployment scripts.

## Status

- ✅ Runs locally with Docker, fully rebranded (logo, red theme, favicon, mascot)
- ✅ Production setup ready: HTTPS, passwords in `.env`, backups
- ⏳ Not yet deployed — see [docs/DEPLOY.md](docs/DEPLOY.md)
- 🗺️ Planned: one instance per client with isolated SES sending, AI email writing

## Run it locally

```bash
cp .env.example .env              # then edit the passwords
docker compose up -d
# open http://localhost:8080 and complete the web installer, then:
docker compose restart cron
./scripts/apply-branding.sh
```

## What's in here

| Path | What it is |
|---|---|
| `docker-compose.yml` | Database (MySQL 8), Mautic web app, and a dedicated cron container |
| `docker-compose.prod.yml` | Production add-on: Caddy in front for automatic HTTPS |
| `branding/` | LMAIL logos, favicon, mascot and theme CSS — see [branding/README.md](branding/README.md) |
| `scripts/apply-branding.sh` | Applies the LMAIL rebrand to a running install (safe to re-run) |
| `scripts/backup.sh` | Backs up the database and Mautic files |
| `emails/` | LMAIL email templates |
| `demo/` | Fake demo contacts for testing |
| `docs/DEPLOY.md` | Step-by-step guide to putting LMAIL on a server |

## Lessons learned

- The cron container must be restarted after the web installer finishes, or it
  waits forever on "Mautic not installed".
- Segment rebuilds can fail on duplicate-key collisions under load;
  `php bin/console mautic:segments:update` run manually is the recovery path.

## License

Mautic is licensed under GPL-3.0. LMAIL's modifications are distributed under
the same license. "Mautic" is a trademark of its owners; LMAIL is not affiliated
with or endorsed by the Mautic project.
