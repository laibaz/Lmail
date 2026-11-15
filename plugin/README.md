# LMAIL plugin for Mautic

`LmailBundle` is a Mautic 5 plugin. It is where LMAIL's changes to the app live, so they
survive Mautic updates. `scripts/apply-branding.sh` installs it.

## What it does

- **Menu:** regroups the sidebar into Home, Audience, Send and Measure. Everything else stays
  available under "More". (`Assets/js/lmail.js`)
- **Home:** adds a greeting and three quick actions above the dashboard.
- **AI email writer:** a "Write with AI" button in the email editor. You describe the email,
  it returns a subject line and a finished email in the LMAIL design, and one click fills the
  editor. (`Controller/AiController.php`, `Service/EmailTemplate.php`)

## AI writer setup

The AI writer calls the Claude API with the official Anthropic PHP SDK, which is installed
inside this plugin folder (`composer install`), not into Mautic itself.

1. Create an API key at console.anthropic.com.
2. Put it in the server's `.env` file: `ANTHROPIC_API_KEY=...`
3. Restart: `docker compose up -d`

Without a key the button still shows, and explains that the AI writer is not set up.
Each draft is one API request, billed to that key.

Safeguards: only logged-in users who may create emails can use it, requests need Mautic's
CSRF token, the brief is limited to 2,000 characters, and the AI is told not to invent
prices, dates or claims. The layout comes from `EmailTemplate.php`, so the AI only writes words.
