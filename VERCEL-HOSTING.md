# Publish on Vercel — Spice Garden Restaurant

## Quick upload with Vercel Drop

1. Open https://vercel.com/drop and sign in.
2. Upload `SellMore-Lanka-Spice-Garden-Restaurant-Full-Website.zip` (or drag the extracted project folder).
3. Choose the relevant team and project name (for example `spice-garden-restaurant`).
4. Click **Deploy**.
5. The website's production URL will appear as a `.vercel.app` address.
6. Open the URL and test homepage, `menu.html`, mobile navigation, filtering, ordering enquiry and QR section.
7. On the deployed website, click **Download QR**. Print or display the downloaded QR image on tables. Test with another phone.

The ZIP is prepared with `index.html` at its root, so no framework setting, command or build step is required.

## Hosting terms

Vercel's free Hobby plan is for **personal/non-commercial use only**. If this website will be part of SellMore Lanka's commercial portfolio, an actual restaurant operation or another commercial purpose, use a plan that permits commercial usage (e.g. Vercel Pro) or an appropriately licensed alternative hosting service.

Official links:
- Vercel Drop: https://vercel.com/drop
- Vercel terms: https://vercel.com/legal/terms
- Vercel plans: https://vercel.com/pricing

## Updating the site

Update files locally, repackage and deploy again with your desired workflow. For ongoing updates and version control, use a Git repository connected to Vercel so new pushes deploy automatically.

## Troubleshooting

- Blank images: verify the `assets/images/` folder is present in the deployed archive.
- Fonts look different: Google Fonts need an internet connection; fallback fonts are available.
- QR points to the wrong address: visit the final published domain and download a *new* QR code.
- WhatsApp points to SellMore Lanka: change `assets/js/config.js` and all textual contact details before delivering to an actual restaurant.
- Payment or orders: this is a static enquiry flow only, not an e-commerce backend.
