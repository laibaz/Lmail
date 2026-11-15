#!/usr/bin/env bash
# Apply the LMAIL rebrand and install the LMAIL plugin on a running Mautic container.
# Run from the repo root after `docker compose up -d` and the web installer:
#   ./scripts/apply-branding.sh
# Safe to run again — e.g. after a Mautic update regenerates app.css.
set -euo pipefail
cd "$(dirname "$0")/.."
trap 'echo; echo "!! apply-branding stopped at line $LINENO. Copy the lines above and send them to get help."' ERR

SVC=${MAUTIC_SERVICE:-mautic}
ROOT=/var/www/html/docroot
CSS=$ROOT/media/css/app.css
START='/* ==== LMAIL BRANDING START ==== */'
END='/* ==== LMAIL BRANDING END ==== */'

echo "Copying images and favicon..."
for f in lmail-logo.png lmail-logo-white.png lmail-icon.png lmail-logo.svg favicon.ico; do
  docker compose cp "branding/$f" "$SVC:$ROOT/media/images/$f"
done
docker compose cp branding/favicon.ico "$SVC:$ROOT/favicon.ico"
docker compose cp branding/lmail-icon.png "$SVC:$ROOT/media/images/apple-touch-icon.png"

echo "Applying theme CSS..."
docker compose cp branding/lmail.css "$SVC:/tmp/lmail.css"
docker compose cp branding/translations/overrides.ini "$SVC:/tmp/lmail-overrides.ini"
docker compose exec -T "$SVC" sh -c "
  set -e
  # remove any previous LMAIL block, then append the current one
  sed -i '\#^/\* ==== LMAIL BRANDING START ==== \*/\$#,\#^/\* ==== LMAIL BRANDING END ==== \*/\$#d' '$CSS'
  { echo '$START'; cat /tmp/lmail.css; echo; echo '$END'; } >> '$CSS'
  rm /tmp/lmail.css

  echo 'Renaming Mautic → LMAIL in interface text...'
  OUT=$ROOT/translations/overrides/en_US
  mkdir -p \$OUT
  # one override file per translation domain (messages, flashes, validators, ...)
  rm -f \$OUT/*.ini
  for dir in $ROOT/app/bundles/*/Translations/en_US $ROOT/plugins/*/Translations/en_US; do
    [ -d \"\$dir\" ] || continue
    for f in \"\$dir\"/*.ini; do
      [ -f \"\$f\" ] || continue
      d=\$(basename \"\$f\")
      # keep only entries whose text says Mautic; rename it in the value, never the key
      grep -E '^[^;=]+=.*\bMautic\b' \"\$f\" | sed -E ':a; s/^([^=]+=.*)\bMautic\b/\1LMAIL/; ta' >> \$OUT/\$d || true
    done
  done
  cat /tmp/lmail-overrides.ini >> \$OUT/messages.ini
  rm -f /tmp/lmail-overrides.ini

  # browser tab title: 'Mautic' → 'LMAIL'
  sed -i \"s/pageTitle|default('Mautic')/pageTitle|default('LMAIL')/\" $ROOT/app/bundles/CoreBundle/Resources/views/Default/head.html.twig

  chown -R www-data:www-data $ROOT/media $ROOT/translations
"

echo "Installing the LMAIL plugin (menu, home screen, AI writer)..."
docker compose exec -T "$SVC" mkdir -p "$ROOT/plugins/LmailBundle"
docker compose cp plugin/LmailBundle/. "$SVC:$ROOT/plugins/LmailBundle/"
docker compose exec -T "$SVC" chown -R www-data:www-data "$ROOT/plugins/LmailBundle"
# The plugin keeps its own copy of the Anthropic SDK, so Mautic's dependencies are not touched.
docker compose exec -T -u www-data -w "$ROOT/plugins/LmailBundle" -e COMPOSER_HOME=/tmp/composer "$SVC" \
  composer install --no-dev --no-interaction --no-progress
docker compose exec -T "$SVC" sh -c "rm -rf /var/www/html/var/cache/prod /var/www/html/var/cache/dev 2>/dev/null || true"
docker compose exec -T -u www-data -w /var/www/html "$SVC" php bin/console mautic:plugins:reload
docker compose exec -T -u www-data -w /var/www/html "$SVC" php bin/console cache:clear
echo "Done. Hard-refresh the browser (Cmd+Shift+R) to see LMAIL."
