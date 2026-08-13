lmail — self-hosted multi-tenant email platform (infrastructure)

Docker infrastructure for LMAIL, a white-label email platform built on Mautic 5. This is the same architecture I run in production for a 300,000-contact deployment on AWS EC2 + Amazon SES.

Stack:

db — MySQL 8
mautic — Mautic 5 (Apache/PHP)
cron — dedicated container for segment updates, campaign triggers, and queue processing (isolating cron from the web container is the difference between a platform that runs and one that silently dies)

Multi-tenant design:

One Mautic instance per tenant, each in its own container
Traefik as the routing layer (per-tenant subdomains)
One Amazon SES configuration set per tenant — sending reputation is isolated, so one tenant's mistakes can never burn another tenant's deliverability

Run it:

bash
docker compose up -d
# web installer at localhost:8080, then:
docker compose restart cron

Production notes (learned the hard way):

The cron container must be restarted after the web installer completes, or it waits forever on "Mautic not installed"
Segment rebuilds can fail on duplicate-key collisions under load; php bin/console mautic:segments:update run manually is the recovery path while the root cause is fixed
