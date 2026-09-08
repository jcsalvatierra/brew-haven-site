# Brew Haven — Website

A static, responsive recreation of the Brew Haven cafe design, plus a working
table reservation page (client-side form with validation and a confirmation
screen).

## Structure

```
index.html          Home page (Hero, Menu, Discount, Location, Contact)
reservation.html     Reservation form + confirmation screen
css/style.css         All styles
js/nav.js             Mobile nav toggle
js/reservation.js     Form validation + confirmation logic
images/                All images used on the site
```

Everything is plain HTML/CSS/JS — no build step, no dependencies.

## Run it locally

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `brew-haven-site`).
2. Push these files to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Brew Haven website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
5. Your site will be live in a minute or two at:
   `https://<your-username>.github.io/<repo-name>/`

## Notes / things you may want to change

- The reservation form currently confirms bookings in the browser only (no
  backend/database) — it generates a confirmation number and shows it on
  screen. To actually receive reservations, connect the `<form>` in
  `reservation.html` to a backend, or a service like Formspree/Getform, or
  wire it up to an email/notification API.
- The map on the Location section is a static image (cropped from your
  design), not an interactive map. Swap it for a Google Maps embed if you'd
  like it to be interactive.
- Contact/social links (email, phone, Instagram handle) are placeholders
  from the original design — update them with real links.
