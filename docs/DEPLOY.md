# Deploying LMAIL

Goal: LMAIL running at `https://app.laibstudios.com`, sending through Amazon SES.

Steps marked 👩‍💻 need your accounts or payment details.

## 1. 👩‍💻 Create the server (Hetzner)

1. Sign up at hetzner.com → Cloud → **Add Server**.
2. Location: closest to your clients (e.g. Falkenstein/Nuremberg for EU, Ashburn for US).
3. Image: **Ubuntu 24.04**.
4. Type: **CX22** (2 vCPU, 4 GB RAM, ~€5/month) — plenty to start.
5. SSH key: add your Mac's public key (`cat ~/.ssh/id_ed25519.pub`; if missing, create
   one with `ssh-keygen -t ed25519`).
6. Create, and note the server's **IPv4 address**.

## 2. 👩‍💻 Point the domain at it (DNS)

Wherever `laibstudios.com`'s DNS is managed, add:

| Type | Name | Value |
|---|---|---|
| A | `app` | *server IPv4 address* |

Check it with `dig +short app.laibstudios.com` — it should print the IP.

## 3. Install LMAIL on the server

```bash
ssh root@SERVER_IP

# Docker
curl -fsSL https://get.docker.com | sh

# Firewall: SSH + web only
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable

# LMAIL
git clone https://github.com/laibaz/Lmail /opt/lmail   # private repo: use a deploy key or token
cd /opt/lmail
cp .env.example .env
# set strong passwords (one per line):
sed -i "s/^MYSQL_ROOT_PASSWORD=.*/MYSQL_ROOT_PASSWORD=$(openssl rand -hex 24)/" .env
sed -i "s/^MYSQL_PASSWORD=.*/MYSQL_PASSWORD=$(openssl rand -hex 24)/" .env

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Open `https://app.laibstudios.com` (the certificate takes up to a minute the first
time). Complete the Mautic installer — the database settings are filled in
automatically. Then:

```bash
docker compose restart cron
./scripts/apply-branding.sh
```

Tip: add `COMPOSE_FILE=docker-compose.yml:docker-compose.prod.yml` to the
server's `.env` so plain `docker compose ...` commands use the production settings.

## 4. 👩‍💻 Amazon SES

1. Create an AWS account (your own) and open **SES** in one region (e.g. `us-east-1`).
2. **Identities → Create identity → Domain** → `laibstudios.com`. Turn on Easy DKIM
   and add the 3 CNAME records it gives you to your DNS.
3. Add SPF/DMARC to DNS if you don't have them:
   - TXT `@` → `v=spf1 include:amazonses.com ~all`
   - TXT `_dmarc` → `v=DMARC1; p=none; rua=mailto:you@laibstudios.com`
4. **SMTP settings → Create SMTP credentials** → save the username and password
   somewhere safe (a password manager — never in this repo).
5. **Account dashboard → Request production access.** Until approved, SES only
   sends to verified addresses. Describe: transactional + opt-in marketing email,
   how people subscribe, how unsubscribes and bounces are handled. Approval
   usually takes about a day.

## 5. Connect SES to LMAIL

In LMAIL: **Settings → Configuration → Email Settings**

- Transport / DSN: `smtp://SMTP_USERNAME:SMTP_PASSWORD@email-smtp.us-east-1.amazonaws.com:587`
  (URL-encode any special characters in the password; change the region to yours)
- From address: e.g. `hello@laibstudios.com`

Send a test email from that page.

## 6. Backups

```bash
crontab -e
# add:
0 3 * * * cd /opt/lmail && ./scripts/backup.sh >> backups/backup.log 2>&1
```

Backups land in `/opt/lmail/backups/` (last 14 kept). Also enable Hetzner's
server backups (+20% cost) or copy `backups/` off the server regularly.

## Updating

```bash
cd /opt/lmail && git pull
docker compose pull && docker compose up -d
./scripts/apply-branding.sh   # in case the update replaced app.css
```
