# fun.israelis.nl

אז מה עושים היום? — A Hebrew RTL website for Israeli families in the Netherlands, listing weekend events, recommended places, holidays, and more.

**Live site:** [https://fun.israelis.nl](https://fun.israelis.nl)

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Weekend events with filtering, weekend picker, and hamburger menu navigation |
| Recommended Places | `places.html` | Interactive Leaflet map of family-friendly restaurants, museums, and playgrounds |
| Holidays & Vacations | `holidays.html` | Dutch official holidays (2026-2027), school vacations by region, and important info |
| About | `about.html` | About the site and team |

## Architecture

- **Static site** — all pages are self-contained HTML files with inline CSS and JavaScript (no build step)
- **RTL layout** — full right-to-left Hebrew UI using `dir="rtl"` and flexbox
- **PWA support** — `manifest.json` + `sw.js` service worker for installability
- **Analytics** — Umami Cloud (`cloud.umami.is`)

## Data Sources

Event and place data is loaded dynamically from Google Sheets, published as CSV:

| Data | Sheet GID | Used in |
|------|-----------|---------|
| Weekend events | `gid=0` | `index.html` → `loadEvents()` |
| Recommended places | `gid=993728456` | `places.html` → `loadPlaces()` |

**Spreadsheet:** [Google Sheets](https://docs.google.com/spreadsheets/d/1Gyd7c8hWg3CFKUXCnEKa1WRlfnAXpjWGuPvhvviTSBc/edit)

### Events sheet columns (gid=0)
Events are parsed via `parseCSV()` in `index.html`. Each row represents a weekend event with fields such as title, date, location, image URL, details link, etc.

### Places sheet columns (gid=993728456)
| Column | Description |
|--------|-------------|
| `name` | Place name (Hebrew) |
| `desc` | Short description |
| `cat` | Category: `restaurant`, `museum`, or `playground` |
| `lat` | Latitude |
| `lng` | Longitude |

## Key Features

### index.html (Home)
- **Sticky navigation bar** — single compact inline bar with logo, weekend picker, filter pills, and hamburger menu
- **Weekend picker** — dropdown to select and browse upcoming weekends
- **Hamburger menu** — links to Places, Holidays, About, and Contact
- **Event cards** — clickable images linking to event details, with action icons (share, navigate, info)
- **Image retry** — automatically retries failed background images up to 3 times with cache-busting
- **CSV data loading** — events fetched from Google Sheets on page load

### places.html (Recommended Places)
- **Leaflet interactive map** — markers for all places with category-colored pins
- **Category filters** — filter by מסעדות עם ילדים (restaurants), מוזיאונים עם ילדים (museums), גני שעשועים (playgrounds)
- **Search** — text search across place names and descriptions
- **List/Map toggle** — switch between map view and scrollable list
- **Share button** — share the places page URL
- **Dynamic data** — places loaded from Google Sheets CSV (gid=993728456)

### holidays.html (Holidays & Vacations)
- **Three tabs** — official holidays, school vacations by region, important info
- Self-contained tab-switching JS

### about.html (About)
- **2-column grid** with 4 info blocks + disclaimer
- Back navigation to home page

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML/CSS/JS | All inline, no framework |
| [Heebo](https://fonts.google.com/specimen/Heebo) + [Rubik](https://fonts.google.com/specimen/Rubik) | Hebrew-optimized fonts |
| [Leaflet.js](https://leafletjs.com/) 1.9.4 | Interactive map on places page |
| [Google Sheets CSV](https://support.google.com/docs/answer/183965) | Dynamic data source for events and places |
| [Umami](https://umami.is/) | Privacy-friendly analytics |
| PWA (manifest + SW) | Mobile installability |

## Local Development

```bash
# Serve locally on port 8000
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

Push to `main` on GitHub — the site is hosted and served from [fun.israelis.nl](https://fun.israelis.nl).

```bash
git push origin main
```

## Repository

[github.com/alon-lgtm2/fun](https://github.com/alon-lgtm2/fun)

## File Structure

```
fun/
├── index.html          # Home page — weekend events
├── places.html         # Recommended places map
├── holidays.html       # Holidays & vacations
├── about.html          # About page
├── manifest.json       # PWA manifest
├── sw.js               # Service worker
├── images/             # Event images, icons, OG tags
│   ├── Button-Purple.svg
│   ├── az.png          # App icon
│   ├── ogtag.png       # Open Graph image
│   └── ...             # Event images
└── .claude/
    └── launch.json     # Dev server config
```
