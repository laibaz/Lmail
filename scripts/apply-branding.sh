#!/usr/bin/env bash
# Apply the LMAIL rebrand to a running Mautic container.
# Run from the repo root after `docker compose up -d` and the web installer:
#   ./scripts/apply-branding.sh
# Safe to run again — e.g. after a Mautic update regenerates app.css.
set -euo pipefail
cd "$(dirname "$0")/.."

SVC=${MAUTIC_SERVICE:-mautic}
ROOT=/var/www/html/docroot
CSS=$ROOT/media/css/app.css
START='/* ==== LMAIL BRANDING START ==== */'
END='/* ==== LMAIL BRANDING END ==== */'

echo "Copying images and favicon..."
for f in lmail-logo.png lmail-logo-white.png lmail-icon.png lmail-mascot.png lmail-logo.svg; do
  docker compose cp "branding/$f" "$SVC:$ROOT/media/images/$f"
done
docker compose cp branding/favicon.ico "$SVC:$ROOT/favicon.ico"

echo "Applying theme CSS..."
docker compose cp branding/lmail.css "$SVC:/tmp/lmail.css"
docker compose exec -T "$SVC" sh -c "
  set -e
  # remove any previous LMAIL block, then append the current one
  sed -i '\#^/\* ==== LMAIL BRANDING START ==== \*/\$#,\#^/\* ==== LMAIL BRANDING END ==== \*/\$#d' '$CSS'
  { echo '$START'; cat /tmp/lmail.css; echo; echo '$END'; } >> '$CSS'
  chown -R www-data:www-data '$ROOT/media'
  rm /tmp/lmail.css
"
echo "Done. Hard-refresh the browser (Cmd+Shift+R) to see LMAIL."
