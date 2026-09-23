# Campaign Onboarding

Mobile-only onboarding flow for the Celeste Daily Creator campaign, built from the
Figma file **Purchase trigger pitch → Section 1** (node `330:966`).

## Flow

1. **Splash** – Celeste logo, auto-advances after `SPLASH_DURATION_MS`.
2. **Welcome** – Sign in with Google / Sign in with email.
3. **Phone number** – "You are almost there!", Continue enabled once a valid-looking number is entered.
4. **Complete** – "Go to Campaign" button linking to `VITE_CAMPAIGN_URL`.

The layout is designed for a 393pt-wide phone (iPhone 16). On larger screens it renders
as a centred phone-width column.

## Development

```bash
npm install
npm run dev      # served on your LAN too, so you can open it on a phone
npm run build
```

Set the campaign link with an env var, e.g. `VITE_CAMPAIGN_URL=https://example.com/campaign npm run build`.

## Assets

- `public/celeste-logo.png` – the Celeste logo on the splash screen (Figma node `329:949`).

## Not wired up yet

- Google and email sign-in buttons just advance the flow; no auth provider is connected.
- The phone number is not sent anywhere.
