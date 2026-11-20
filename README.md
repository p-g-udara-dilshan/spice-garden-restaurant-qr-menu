# Spice Garden Restaurant — Website + QR Digital Menu

A fully static, responsive restaurant website built in HTML5, CSS3 and vanilla JavaScript.
No frameworks, backend, paid QR service, database or build step required.

## Pages
- `index.html` — restaurant homepage (hero, popular dishes, about, QR menu, gallery, booking enquiry, footer)
- `menu.html` — digital menu, category filters, search, item selection, quantity stepper and enquiry preparation

## Files
- `assets/css/styles.css` — responsive layout and animations
- `assets/js/config.js` — contact and brand settings
- `assets/js/menu-data.js` — edit dish names, categories, prices and images
- `assets/js/site.js` — homepage, QR, booking, lightbox and navigation
- `assets/js/menu.js` — digital menu filters, cart and WhatsApp enquiry
- `assets/images/*` — locally bundled food photos and favicon
- `vendor/qr-engine.js` — local QR generation (third-party MIT license in `vendor/QR-LICENSE.txt`)
- `VERCEL-HOSTING.md` — publishing steps

## Important edits before publishing for a real restaurant

**These restaurant details, menu items, dishes, prices and food visuals are illustrative portfolio content**, not verified real business information.

1. Open `assets/js/config.js` and replace `whatsappNumber` with the restaurant's own WhatsApp Business number (international format, digits only). Currently it uses the public SellMore Lanka business number **94724008159** for enquiries.
2. Update the text telephone numbers in `index.html` and `menu.html` in all header/footer locations.
3. Update location and opening-hours content in `index.html` and `menu.html` to verified details.
4. Open `assets/js/menu-data.js` and replace dishes, categories, prices, and photography to match actual products and inventory. The prices are sample values.
5. If accepting booking enquiries, confirm available dates/times with the restaurant. The form only prepares a WhatsApp message and *does not* confirm a reservation.
6. The menu selection only prepares a WhatsApp enquiry; there is **no payment processing, order confirmation, delivery integration or backend**.
7. The QR code is generated in the browser for the current website URL plus `menu.html` and can be downloaded as PNG. Download it **after deploying to the final public domain**, or the QR will point to a temporary URL.
8. The Google Fonts stylesheet requires internet connectivity; system font fallbacks are configured.

## Local preview
Open `index.html` in a modern browser, or (better) serve the project using VS Code Live Server or `python -m http.server 8000` from inside the folder. Then open `http://localhost:8000/`.

## Testing completed
- JavaScript syntax checks
- Main and digital menu page interaction checks
- Menu category search and add-to-selection/cart behaviour
- QR generated and decoded to the menu page URL
- Viewport overflow checks: 320px, 390px, 768px and 1440px
- Images and static paths included in the ZIP

See `VERCEL-HOSTING.md` for deployment and hosting-plan information.
