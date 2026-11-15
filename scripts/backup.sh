#!/usr/bin/env bash
# Back up the LMAIL database and Mautic files into ./backups/<timestamp>/.
# Keeps the 14 most recent backups. Run from the repo root, e.g. nightly via cron:
#   0 3 * * * cd /opt/lmail && ./scripts/backup.sh >> backups/backup.log 2>&1
set -euo pipefail
cd "$(dirname "$0")/.."
STAMP=$(date +%Y%m%d-%H%M%S)
DEST=backups/$STAMP
mkdir -p "$DEST"

echo "[$STAMP] dumping database..."
docker compose exec -T db sh -c \
  'exec mysqldump --single-transaction --routines -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' \
  | gzip > "$DEST/db.sql.gz"

echo "[$STAMP] archiving Mautic config and media..."
docker compose exec -T mautic tar -C /var/www/html -czf - config docroot/media \
  > "$DEST/mautic-files.tar.gz"

ls -1dt backups/*/ | tail -n +15 | xargs -r rm -rf
echo "[$STAMP] done → $DEST"
