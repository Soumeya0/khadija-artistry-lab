# Khadija's Artistry Lab — website

React + Vite site with three pages: **Home** (hero, about, services, per-look showcase, how booking works),
**Booking** (look picker, calendar, time slots, request form) and **Reviews** (filter, cards, leave-a-review form).

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm test         # booking-logic unit tests
npm run build    # production build in /dist
```

## Where to change things
| I want to change… | Edit |
|---|---|
| Hours, languages, Instagram | `src/data/site.js` |
| Looks, prices, durations, photos | `src/data/services.js` (set `priceFrom`, add image URLs to `images`) |
| Reviews | `src/data/reviews.js` |
| Colors and fonts | the `:root` tokens at the top of `src/styles.css` |
| Logo | `src/components/Logo.jsx` (swap for an `<img>` of the real logo) |

Photos: drop files in `public/images/` and reference them as `/images/name.jpg` in `services.js`.
Placeholders turn into real photos automatically.

## How the booking logic works (`src/lib/booking.js`)
- Only Saturdays and Sundays, 10:00 AM – 6:00 PM, in 30-minute steps.
- A slot must fit the look's duration before closing time.
- A slot is blocked if it overlaps an existing appointment **plus a 30-minute travel buffer** on both sides.
- Past days and past times today are blocked.
- Covered by tests in `src/lib/booking.test.js`.

## What is demo-only (next steps)
1. `src/data/bookings.js` returns fake appointments. Replace it with real data (database or Google Calendar free/busy).
2. The booking and review forms don't send anything yet. They need a small backend (e.g. Node + PostgreSQL) that
   re-checks the slot on the server, stores it in UTC, and emails the confirmation.
3. Reviews should only be shown after Khadija approves them.

## Deploy
Works on Netlify: build command `npm run build`, publish directory `dist`. `public/_redirects` makes page refreshes work.
# khadija-artistry-lab
