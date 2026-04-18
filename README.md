# fun.israelis.nl

אז מה עושים היום? — A Hebrew RTL website for Israeli families in the Netherlands, listing weekend events, recommended places, articles, holidays, and more.

**Live site:** [https://fun.israelis.nl](https://fun.israelis.nl)

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Weekend events with filtering, weekend picker, and hamburger menu navigation |
| Recommended Places | `places.html` | Interactive Leaflet map of family-friendly restaurants, museums, and playgrounds |
| Articles | `articles.html` | Articles and tips loaded from Google Sheets, with category filters, article detail view, and full content support |
| Holidays & Vacations | `holidays.html` | Dutch official holidays (2026-2027), school vacations by region, with dynamic upcoming highlighting |
| Weather Forecast | `weather.html` | Weekend weather forecast for Dutch cities using Open-Meteo API |
| About | `about.html` | About the site and team |

## Architecture

- **Static site** — all pages are self-contained HTML files with inline CSS and JavaScript (no build step)
- **RTL layout** — full right-to-left Hebrew UI using `dir="rtl"` and flexbox
- **PWA support** — `manifest.json` + `sw.js` service worker for installability
- **Authentication** — Firebase (Google Sign-in) with Firestore for user data
- **Contact modal** — available on all pages via Formspree
- **Analytics** — Umami Cloud (`cloud.umami.is`)

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

### Articles sheet columns (gid=478633181)
| Column | Description |
|--------|-------------|
| `title` | Article title (Hebrew) |
| `summary` | Short summary for card display |
| `image` | Image URL or path (e.g. `/images/imyotzim.jpg`) |
| `date` | Publication date (YYYY-MM-DD), sorted newest first |
| `link` | External URL (optional, used if no content) |
| `category` | Category for filtering (e.g. טיפים, אוכל, טיולים, תרבות, קהילה) |
| `content` | Full article text (optional). Supports markdown: `## headings`, `**bold**`, `*italic*`, `[links](url)` |

If `content` is provided, clicking the article card opens a detail page on the site with hero image, formatted content, and share buttons. Otherwise, it links externally.

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
- **Collapsible filters on mobile** — toggle button with active filter count badge
- **Hamburger menu** — links to Places, Articles, Holidays, About, and Contact
- **Event cards** — clickable images linking to event details, with action icons (share, navigate, info, like)
- **Image retry** — automatically retries failed background images up to 3 times with cache-busting
- **CSV data loading** — events fetched from Google Sheets on page load
- **Desktop readability** — larger font sizes on screens wider than 700px for improved readability
- **Auth redirect** — users who authenticate from sub-pages are redirected to the home page

### places.html (Recommended Places)
- **Leaflet interactive map** — markers for all places with category-colored pins
- **Category filters** — filter by restaurants, museums, playgrounds (collapsible on mobile)
- **Search** — text search across place names and descriptions
- **List/Map toggle** — switch between map view and scrollable list
- **Dynamic data** — places loaded from Google Sheets CSV

### articles.html (Articles & Tips)
- **Card grid** — responsive grid with image, category badge, title, summary, date
- **Category filters** — auto-generated from article data (collapsible on mobile)
- **Article detail view** — full article with hero image, formatted content, share buttons
- **Content formatting** — supports markdown headings, bold, italic, links
- **Multi-line CSV parsing** — handles long-form article content from Google Sheets
- **WhatsApp & link sharing** — share buttons on article detail page
- **Sorted by date** — newest articles first

### holidays.html (מתי חופש? — Holidays & Vacations)
- **Three tabs** — official holidays, school vacations by region, important info
- **Dynamic highlighting** — automatically highlights the next upcoming holiday with purple "הבא" badge
- **School vacation highlighting** — highlights the next upcoming school vacation
- **Contact modal** — direct feedback form
- Navigation label: "📅 מתי חופש?"

### weather.html (Weather Forecast)
- **Weekend weather** — forecasts for Dutch cities using the Open-Meteo API
- Displays temperature ranges per city for upcoming weekends

### about.html (About)
- **2-column grid** with 4 info blocks + disclaimer
- **Contact modal** — direct feedback form
- Prominent home link in sticky nav

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML/CSS/JS | All inline, no framework |
| [Heebo](https://fonts.google.com/specimen/Heebo) + [Rubik](https://fonts.google.com/specimen/Rubik) | Hebrew-optimized fonts |
| [Leaflet.js](https://leafletjs.com/) 1.9.4 | Interactive map on places page |
| [Firebase](https://firebase.google.com/) 10.12.0 | Authentication (Google Sign-in) and Firestore database |
| [Google Sheets CSV](https://support.google.com/docs/answer/183965) | Dynamic data source for events, places, and articles |
| [Open-Meteo API](https://open-meteo.com/) | Weather forecasts (free, no API key required) |
| [Formspree](https://formspree.io/) | Contact/feedback forms on all pages |
| [Umami](https://umami.is/) | Privacy-friendly analytics |
| PWA (manifest + SW) | Mobile installability |

## Branching Workflow

| Branch | Purpose |
|--------|---------|
| `stage` | Default/development branch. All new work starts here. |
| `main` | Production branch. Auto-deploys to GitHub Pages at [fun.israelis.nl](https://fun.israelis.nl). |

### Development flow

1. Create a feature branch off `stage`
2. Do your work, commit, and push the feature branch
3. Merge the feature branch into `stage` for testing
4. When `stage` is stable and ready, merge `stage` into `main` to deploy

**Important:** NEVER merge feature branches directly into `main`. Always go through `stage` first.

```bash
# Start new work
git checkout stage
git pull origin stage
git checkout -b feature/my-change

# After work is done, merge into stage
git checkout stage
git merge feature/my-change
git push origin stage

# When ready for production
git checkout main
git merge stage
git push origin main
```

## Local Development

```bash
# Serve locally (via npx serve or Python)
npx serve .
# or
python -m http.server 8000
```

Then open [http://localhost:3000](http://localhost:3000) (serve) or [http://localhost:8000](http://localhost:8000) (Python).

## Deployment

The site is hosted on **GitHub Pages** and auto-deploys from the `main` branch. There is no build step -- pushing to `main` publishes the site directly.

See [DEPLOY-INSTRUCTIONS.md](DEPLOY-INSTRUCTIONS.md) for the full deployment workflow.

## Repository

[github.com/alon-lgtm2/fun](https://github.com/alon-lgtm2/fun)

## File Structure

```
fun/
├── index.html          # Home page — weekend events
├── places.html         # Recommended places map
├── articles.html       # Articles and tips (מאמרים)
├── holidays.html       # Holidays & vacations (מתי חופש?)
├── weather.html        # Weather forecast page
├── about.html          # About page
├── auth.js             # Firebase authentication & profile management
├── likes-backend.gs    # Google Apps Script backend for likes
├── manifest.json       # PWA manifest
├── sw.js               # Service worker
├── CNAME               # Custom domain config
├── images/             # Event & article images
│   ├── Button-Purple.svg
│   ├── az.png          # App icon
│   ├── og3.png         # Open Graph image
│   ├── imyotzim.jpg    # Article image
│   └── ...             # Event images
└── .claude/
    └── launch.json     # Dev server config
```
