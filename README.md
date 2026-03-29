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
| Articles | `articles.html` | Hebrew articles and tips about life in the Netherlands |
| Weather Forecast | `weather.html` | Weekend weather forecast for Dutch cities using Open-Meteo API |
| About | `about.html` | About the site and team |

## Architecture

- **Static site** — all pages are self-contained HTML files with inline CSS and JavaScript (no build step)
- **RTL layout** — full right-to-left Hebrew UI using `dir="rtl"` and flexbox
- **PWA support** — `manifest.json` + `sw.js` service worker for installability
- **Authentication** — Firebase (Google Sign-in) with Firestore for user data
- **Analytics** — Umami Cloud (`cloud.umami.is`)

## Data Sources

Event and place data is loaded dynamically from Google Sheets, published as CSV:

| Data | Sheet GID | Used in |
|------|-----------|---------|
| Weekend events | `gid=0` | `index.html` → `loadEvents()` |
| Recommended places | `gid=993728456` | `places.html` → `loadPlaces()` |
| Articles | `gid=478633181` | `articles.html` → `loadArticles()` |

**Spreadsheet:** [Google Sheets](https://docs.google.com/spreadsheets/d/1Gyd7c8hWg3CFKUXCnEKa1WRlfnAXpjWGuPvhvviTSBc/edit)

### Events sheet columns (gid=0)
Events are parsed via `parseCSV()` in `index.html`. Each row represents a weekend event with fields such as title, date, location, image URL, details link, etc.

### Articles sheet columns (gid=478633181)
| Column | Description |
|--------|-------------|
| `title` | Article title (Hebrew) |
| `summary` | Short description/summary |
| `image` | Image URL or path |
| `date` | Publication date (YYYY-MM-DD) |
| `link` | URL to full article |
| `category` | Category for filtering (e.g. טיפים, אוכל, טיולים, תרבות) |

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
- **Sticky navigation bar** — single compact inline bar with logo (links home), weekend picker, filter pills, and hamburger menu
- **Weekend picker** — dropdown to select and browse upcoming weekends
- **Hamburger menu** — links to Places, Holidays, About, and Contact
- **Event cards** — clickable images linking to event details, with action icons (share, navigate, info, like)
- **Image retry** — automatically retries failed background images up to 3 times with cache-busting
- **CSV data loading** — events fetched from Google Sheets on page load
- **Desktop readability** — larger font sizes on screens wider than 700px for improved readability
- **Auth redirect** — users who authenticate from sub-pages are redirected to the home page

### places.html (Recommended Places)
- **Leaflet interactive map** — markers for all places with category-colored pins
- **Category filters** — filter by מסעדות עם ילדים (restaurants), מוזיאונים עם ילדים (museums), גני שעשועים (playgrounds)
- **Search** — text search across place names and descriptions
- **List/Map toggle** — switch between map view and scrollable list
- **Share button** — share the places page URL
- **Dynamic data** — places loaded from Google Sheets CSV (gid=993728456)

### articles.html (Articles)
- **Article cards** — grid layout with lazy-loaded images, category tags, and date
- **Category filtering** — dynamic filter pills generated from article data
- **CSV data loading** — articles fetched from Google Sheets (gid=478633181)
- **Date sorting** — articles sorted newest first

### holidays.html (מתי חופש? — Holidays & Vacations)
- **Three tabs** — official holidays, school vacations by region, important info
- Self-contained tab-switching JS
- Navigation label: "📅 מתי חופש?"

### weather.html (Weather Forecast)
- **Weekend weather** — forecasts for Dutch cities using the Open-Meteo API
- Displays temperature ranges per city for upcoming weekends

### about.html (About)
- **2-column grid** with 4 info blocks + disclaimer
- Prominent home link in sticky nav

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML/CSS/JS | All inline, no framework |
| [Heebo](https://fonts.google.com/specimen/Heebo) + [Rubik](https://fonts.google.com/specimen/Rubik) | Hebrew-optimized fonts |
| [Leaflet.js](https://leafletjs.com/) 1.9.4 | Interactive map on places page |
| [Google Sheets CSV](https://support.google.com/docs/answer/183965) | Dynamic data source for events and places |
| [Firebase](https://firebase.google.com/) 10.12.0 | Authentication (Google Sign-in) and Firestore database |
| [Open-Meteo API](https://open-meteo.com/) | Weather forecasts (free, no API key required) |
| [Formspree](https://formspree.io/) | Community feedback and event submission forms |
| [Umami](https://umami.is/) | Privacy-friendly analytics |
| PWA (manifest + SW) | Mobile installability |

## Local Development

```bash
# Serve locally (via npx serve or Python)
npx serve .
# or
python -m http.server 8000
```

Then open [http://localhost:3000](http://localhost:3000) (serve) or [http://localhost:8000](http://localhost:8000) (Python).

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
├── articles.html       # Articles and tips
├── holidays.html       # Holidays & vacations
├── weather.html        # Weather forecast page
├── about.html          # About page
├── auth.js             # Firebase authentication & profile management
├── likes-backend.gs    # Google Apps Script backend for likes
├── manifest.json       # PWA manifest
├── sw.js               # Service worker
├── CNAME               # Custom domain config
├── images/             # Event images, icons, OG tags
│   ├── Button-Purple.svg
│   ├── az.png          # App icon
│   ├── og3.png         # Open Graph image (current)
│   └── ...             # Event images
└── .claude/
    └── launch.json     # Dev server config
```
