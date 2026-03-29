# fun.israelis.nl

אז מה עושים היום? — A Hebrew RTL website for Israeli families in the Netherlands, listing weekend events, recommended places, holidays, articles, and more.

**Live site:** [https://fun.israelis.nl](https://fun.israelis.nl)

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Weekend events with filtering, weekend picker, and hamburger menu navigation |
| Recommended Places | `places.html` | Interactive Leaflet map of family-friendly restaurants, museums, and playgrounds |
| Holidays & Vacations | `holidays.html` | Dutch official holidays (2026-2027), school vacations by region, and important info with dynamic upcoming highlighting |
| Articles | `articles.html` | Articles and tips loaded from Google Sheets, with category filters and full article detail view |
| About | `about.html` | About the site and team |

## Architecture

- **Static site** — all pages are self-contained HTML files with inline CSS and JavaScript (no build step)
- **RTL layout** — full right-to-left Hebrew UI using `dir="rtl"` and flexbox
- **PWA support** — `manifest.json` + `sw.js` service worker for installability
- **Firebase Auth** — Google sign-in with user profiles
- **Analytics** — Umami Cloud (`cloud.umami.is`)
- **Contact modal** — available on all pages via Formspree

## Data Sources

Event, place, and article data is loaded dynamically from Google Sheets, published as CSV:

| Data | Sheet GID | Used in |
|------|-----------|---------|
| Weekend events | `gid=0` | `index.html` → `loadEvents()` |
| Recommended places | `gid=993728456` | `places.html` → `loadPlaces()` |
| Articles | `gid=478633181` | `articles.html` → `loadArticles()` |

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

### Articles sheet columns (gid=478633181)
| Column | Description |
|--------|-------------|
| `title` | Article title (Hebrew) |
| `summary` | Short summary for card display |
| `image` | Image URL for card and detail hero |
| `date` | Publish date (YYYY-MM-DD), sorted newest first |
| `link` | External link (optional, used if no content) |
| `category` | Category tag (e.g. טיפים, חינוך, אירועים, אוכל, טיולים, תרבות) |
| `content` | Full article text (optional). Supports markdown: `## headings`, `**bold**`, `*italic*`, `[links](url)` |

If `content` is provided, clicking the article card opens a detail page on the site. Otherwise, it links externally.

## Key Features

### index.html (Home)
- **Sticky navigation bar** — single compact inline bar with logo, weekend picker, filter pills, and hamburger menu
- **Weekend picker** — dropdown to select and browse upcoming weekends
- **Collapsible filters on mobile** — toggle button with active filter count badge
- **Hamburger menu** — links to Places, Holidays, Articles, About, and Contact
- **Event cards** — clickable images linking to event details, with action icons (share, navigate, info)
- **Image retry** — automatically retries failed background images up to 3 times with cache-busting
- **CSV data loading** — events fetched from Google Sheets on page load

### places.html (Recommended Places)
- **Leaflet interactive map** — markers for all places with category-colored pins
- **Category filters** — filter by restaurants, museums, playgrounds (collapsible on mobile)
- **Search** — text search across place names and descriptions
- **List/Map toggle** — switch between map view and scrollable list
- **Dynamic data** — places loaded from Google Sheets CSV

### holidays.html (Holidays & Vacations)
- **Three tabs** — official holidays, school vacations by region, important info
- **Dynamic highlighting** — automatically highlights the next upcoming holiday and school vacation
- **Contact modal** — direct feedback form

### articles.html (Articles & Tips)
- **Card grid** — responsive grid with image, category badge, title, summary, date
- **Category filters** — auto-generated from article data (collapsible on mobile)
- **Article detail view** — full article with hero image, formatted content, share buttons
- **Content formatting** — supports markdown headings, bold, italic, links
- **WhatsApp & link sharing** — share buttons on article detail page
- **Sorted by date** — newest articles first

### about.html (About)
- **2-column grid** with 4 info blocks + disclaimer
- **Contact modal** — direct feedback form

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML/CSS/JS | All inline, no framework |
| [Heebo](https://fonts.google.com/specimen/Heebo) + [Rubik](https://fonts.google.com/specimen/Rubik) | Hebrew-optimized fonts |
| [Leaflet.js](https://leafletjs.com/) 1.9.4 | Interactive map on places page |
| [Firebase](https://firebase.google.com/) | Authentication (Google sign-in) & Firestore |
| [Google Sheets CSV](https://support.google.com/docs/answer/183965) | Dynamic data source for events, places, and articles |
| [Formspree](https://formspree.io/) | Contact/feedback forms on all pages |
| [Umami](https://umami.is/) | Privacy-friendly analytics |
| PWA (manifest + SW) | Mobile installability |

## Local Development

```bash
# Serve locally on port 8000
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

Push to `stage` on GitHub — the site is hosted and served from [fun.israelis.nl](https://fun.israelis.nl).

```bash
git push origin stage
```

## Repository

[github.com/alon-lgtm2/fun](https://github.com/alon-lgtm2/fun)

## File Structure

```
fun/
├── index.html          # Home page — weekend events
├── places.html         # Recommended places map
├── holidays.html       # Holidays & vacations
├── articles.html       # Articles & tips
├── about.html          # About page
├── auth.js             # Firebase authentication
├── manifest.json       # PWA manifest
├── sw.js               # Service worker
├── CNAME               # Custom domain config
├── images/             # Event images, icons, OG tags
│   ├── Button-Purple.svg
│   ├── az.png          # App icon
│   ├── og2.png         # Open Graph image
│   └── ...             # Event images
├── PRD.md              # Product requirements
├── README.md           # This file
├── DEPLOY-INSTRUCTIONS.md
└── .claude/
    └── launch.json     # Dev server config
```
