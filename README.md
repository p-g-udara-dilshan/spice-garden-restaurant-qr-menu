# Spice Garden Restaurant 🍽️

### Responsive Restaurant Website & QR Digital Menu

A two-page, responsive **restaurant website concept** developed using **HTML5, CSS3, and vanilla JavaScript**. The project combines a restaurant landing page with a searchable digital food menu, a QR code that links to the menu, an interactive food-selection basket, and WhatsApp-based enquiry flows.

> **Portfolio demonstration:** Spice Garden, its sample dishes, prices, opening details, and imagery are illustrative. This is a **static frontend project**, not a live restaurant ordering or reservation platform.

## 🔗 Project Links

- **Live Website:** `ADD_YOUR_LIVE_WEBSITE_URL_HERE`
- **Digital Menu:** `ADD_YOUR_LIVE_WEBSITE_URL_HERE/menu.html`
- **GitHub Repository:** `https://github.com/p-g-udara-dilshan/spice-garden-restaurant-qr-menu` *(after publishing the repository)*
- **Walkthrough:** Add the link to your LinkedIn screen-recording post here, if desired.

## 📸 Screenshots

**Restaurant homepage**

![Spice Garden homepage with restaurant hero section](assets/screenshots/homepage.jpg)

**Digital menu**

![Spice Garden digital menu with category filters and search](assets/screenshots/digital-menu.jpg)

**Food catalogue**

![Spice Garden food cards with prices and selection buttons](assets/screenshots/food-catalogue.jpg)

*Screenshots were captured from the supplied project walkthrough.*

## ✨ Features

### Restaurant Homepage (`index.html`)
- Responsive navigation with a mobile menu.
- Restaurant hero section and featured-food carousel.
- About section, food gallery, and image lightbox.
- Browser-generated **QR code** linking to the digital menu, with PNG download.
- Table-booking **enquiry form** that prepares a WhatsApp message with the visitor's preferred date, time, and party size.
- Responsive layouts and subtle scroll/interaction effects.

### Digital Menu (`menu.html`)
- Food catalogue containing **12 illustrative dishes** across Kottu, Rice & Curry, Burgers, Seafood, and Breakfast categories.
- Category filtering and keyword search.
- Add items to a selection basket; adjust quantities and view calculated totals.
- Basket state saved with **SessionStorage** for the current browser-tab session.
- Pre-filled **WhatsApp enquiry** containing selected items, quantities, and an estimated total.
- Share/copy menu link functionality.

> **Important:** Selecting food or requesting a table prepares an enquiry for the visitor to send via WhatsApp. It **does not** automatically place an order, charge a payment, guarantee availability, or confirm a reservation.

## 🛠️ Tech Stack

| Technology | Use |
| --- | --- |
| HTML5 | Semantic content and two-page website structure |
| CSS3 | Responsive layouts, typography, styling, and transitions |
| JavaScript (vanilla) | Menu rendering, search, basket, reservation form, gallery, and QR interactions |
| SessionStorage | Temporary preservation of selected dishes |
| QR Code for JavaScript | Client-side QR-code generation |
| WhatsApp click-to-chat | Prefilled food and table-booking enquiries |

**No framework, server, database, payment gateway, build step, or package manager is required.**

## 📁 Folder Structure

```text
spice-garden-restaurant-qr-menu/
├── index.html
├── menu.html
├── README.md
├── VERCEL-HOSTING.md
├── .gitignore
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── config.js
│   │   ├── menu-data.js
│   │   ├── menu.js
│   │   └── site.js
│   ├── images/
│   │   └── (food images and favicon)
│   └── screenshots/
│       ├── homepage.jpg
│       ├── digital-menu.jpg
│       └── food-catalogue.jpg
└── vendor/
    ├── qr-engine.js
    └── QR-LICENSE.txt
```

## 🚀 Run Locally

1. Download or clone the repository.
2. Open the extracted project folder in **VS Code**.
3. Start the **Live Server** extension, or from the project folder run:

   ```bash
   python -m http.server 8000
   ```

4. Open `http://localhost:8000/` in your browser.
5. Visit `http://localhost:8000/menu.html` to test the digital menu.

> Opening `index.html` directly may display a QR for a local file URL. For a shareable QR, publish the website first and download the QR **from the final live website**.

## ⚙️ Customize the Website

Before adapting this portfolio demo for a real restaurant:

1. In `assets/js/config.js`, replace the `whatsappNumber` with the **authorized restaurant contact number** in international digits-only format. The original demo currently routes enquiries to a SellMore Lanka business contact, not a confirmed Spice Garden restaurant number.
2. Update the visible phone numbers, address, business hours, and restaurant details in `index.html` and `menu.html`.
3. Edit `assets/js/menu-data.js` to replace the example dishes, categories, prices, and images with real information.
4. Make sure restaurant branding and photo usage are authorized.
5. Re-test the menu, WhatsApp enquiry, booking-enquiry flow, and QR code after every change.

## 🌍 Deploy with GitHub Pages

This is a static website, so no build command is needed.

1. Publish the project files to a **public GitHub repository**.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **`main`** and **`/ (root)`**, then save.
5. Once GitHub reports the deployment is ready, visit the Pages URL and verify both `index.html` and `menu.html`.
6. Update the **Live Website** and **Digital Menu** links at the top of this README.
7. On the *published* homepage, download the QR code so it points to the correct live digital menu.

An expected GitHub Pages URL, **only after deployment is enabled**, is:

`https://p-g-udara-dilshan.github.io/spice-garden-restaurant-qr-menu/`

Other static hosts are possible; see `VERCEL-HOSTING.md` for the original project's Vercel notes and plan restrictions.

## 🔎 Scope & Limitations

- This repository showcases **frontend development**; it has **no backend or database**.
- Basket contents are stored in **SessionStorage**, not synced across browsers or devices.
- Menu prices and availability are illustrative, not live inventory.
- Enquiries require the visitor to send the prepared WhatsApp message; the website cannot confirm orders or table availability.
- The QR code opens the website's digital menu; it is not a payment QR.

## 📜 Third-Party License

The bundled `vendor/qr-engine.js` uses *QRCode for JavaScript* by Kazuhiko Arase under the **MIT License**. The original license notice is retained in [`vendor/QR-LICENSE.txt`](vendor/QR-LICENSE.txt).

No separate license for the rest of the project is asserted here.

---

**Developed for frontend portfolio demonstration by [Udara Dilshan](https://github.com/p-g-udara-dilshan).**
