#!/usr/bin/env bash
# One-time setup of LMAIL on a fresh Ubuntu server (e.g. AWS Lightsail, 2 GB or more).
#
#   curl -fsSL https://raw.githubusercontent.com/laibaz/Lmail/main/scripts/server-setup.sh -o setup.sh
#   sudo bash setup.sh
#
# It installs Docker, adds swap memory, downloads LMAIL to /opt/lmail, creates strong database
# passwords, starts the app behind HTTPS, creates your admin login and applies the LMAIL look.
# Safe to run again: it skips steps that are already done.
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then echo "Please run with sudo:  sudo bash setup.sh"; exit 1; fi

DOMAIN_DEFAULT="app.laibstudios.com"
DIR=/opt/lmail
REPO=https://github.com/laibaz/Lmail

echo
echo "=== LMAIL server setup ==="
read -r -p "Web address for the app [$DOMAIN_DEFAULT]: " DOMAIN
DOMAIN=${DOMAIN:-$DOMAIN_DEFAULT}

NEED_INSTALL=1
if [ -f "$DIR/.env" ] && docker compose --project-directory "$DIR" exec -T mautic test -f /var/www/html/config/local.php 2>/dev/null \
   && docker compose --project-directory "$DIR" exec -T mautic grep -q "db_driver" /var/www/html/config/local.php 2>/dev/null; then
  NEED_INSTALL=0
fi

if [ "$NEED_INSTALL" -eq 1 ]; then
  read -r -p "Your first name: " ADMIN_FIRST
  read -r -p "Your last name: " ADMIN_LAST
  read -r -p "Your email (this is your login): " ADMIN_EMAIL
  while true; do
    read -r -s -p "Choose a login password (8+ characters): " ADMIN_PASS; echo
    read -r -s -p "Type it again: " ADMIN_PASS2; echo
    [ "$ADMIN_PASS" = "$ADMIN_PASS2" ] && [ "${#ADMIN_PASS}" -ge 8 ] && break
    echo "Passwords did not match or were too short. Try again."
  done
fi

echo; echo "--- 1/6 Updating the server (a few minutes)..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get upgrade -y -qq
apt-get install -y -qq git curl ca-certificates openssl >/dev/null

echo "--- 2/6 Adding swap memory..."
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "--- 3/6 Installing Docker..."
if ! command -v docker >/dev/null; then curl -fsSL https://get.docker.com | sh >/dev/null; fi

echo "--- 4/6 Downloading LMAIL..."
if [ -d "$DIR/.git" ]; then git -C "$DIR" pull -q --ff-only; else git clone -q "$REPO" "$DIR"; fi
cd "$DIR"
if [ ! -f .env ]; then
  cp .env.example .env
  sed -i "s|^MYSQL_ROOT_PASSWORD=.*|MYSQL_ROOT_PASSWORD=$(openssl rand -hex 24)|" .env
  sed -i "s|^MYSQL_PASSWORD=.*|MYSQL_PASSWORD=$(openssl rand -hex 24)|" .env
  echo "COMPOSE_FILE=docker-compose.yml:docker-compose.prod.yml" >> .env
  chmod 600 .env
fi
sed -i "s|^LMAIL_DOMAIN=.*|LMAIL_DOMAIN=$DOMAIN|" .env

echo "--- 5/6 Starting LMAIL (downloads about 1 GB the first time)..."
docker compose up -d
echo "    waiting for the app to be ready..."
for i in $(seq 1 60); do
  if docker compose exec -T mautic test -f /var/www/html/bin/console 2>/dev/null \
     && docker compose exec -T mautic php -r 'exit(@fsockopen("db",3306)?0:1);' 2>/dev/null; then break; fi
  sleep 5
done

if [ "$NEED_INSTALL" -eq 1 ]; then
  # shellcheck disable=SC1091
  set -a; . ./.env; set +a
  docker compose exec -T -u www-data -w /var/www/html mautic php bin/console mautic:install "https://$DOMAIN" \
    --force --no-interaction \
    --db_driver=pdo_mysql --db_host=db --db_port=3306 \
    --db_name="$MYSQL_DATABASE" --db_user="$MYSQL_USER" --db_password="$MYSQL_PASSWORD" \
    --admin_firstname="$ADMIN_FIRST" --admin_lastname="$ADMIN_LAST" \
    --admin_username="$ADMIN_EMAIL" --admin_email="$ADMIN_EMAIL" --admin_password="$ADMIN_PASS" | tail -3
  docker compose restart cron >/dev/null
fi

echo "--- 6/6 Applying the LMAIL look and plugin..."
./scripts/apply-branding.sh 2>&1 | grep -vE 'Copying|Copied|copy [0-9]'

# nightly backup at 03:00, keeps 14 days
( crontab -l 2>/dev/null | grep -v 'scripts/backup.sh'; echo "0 3 * * * cd $DIR && ./scripts/backup.sh >> $DIR/backups/backup.log 2>&1" ) | crontab -
mkdir -p "$DIR/backups"

echo
echo "=== Done ==="
echo "Open:  https://$DOMAIN"
echo "Login: the email and password you just chose."
echo "If the page shows a certificate warning, wait a minute: the HTTPS certificate is issued"
echo "automatically once $DOMAIN points at this server."
