# PRD — fun.israelis.nl

## Product Overview
A Hebrew-language web app for Israeli families living in the Netherlands to discover weekend events and activities. Curated, time-bound, local events — not general attractions.

## Target Audience
- Israeli families living in the Netherlands (not limited to children — quality activities for all family members)

## Current State (Live)
- Six HTML pages (`index.html`, `places.html`, `articles.html`, `holidays.html`, `weather.html`, `about.html`) — no build step
- Data fetched from a published Google Sheet on each page load
- Two views: List (calendar-grouped) and Map (Leaflet)
- Weekend selector (upcoming 8 weekends) with auto-advance on scroll
- Category filters with automatic disable for empty categories
- Collapsible filters on mobile (toggle button with active filter badge)
- Like button (localStorage-based)
- Weather display per event (Open-Meteo API)
- WhatsApp sharing with site footer branding
- Contact/feedback modal on all pages via Formspree
- Articles page with detail view, full content support, and category filters
- Holidays page with dynamic upcoming holiday/vacation highlighting
- Hebrew RTL layout, mobile-friendly with fat-finger CTAs
- Desktop-optimized font sizes for readability (min-width: 701px)
- Prominent home navigation ("🎪 אז מה עושים?") on all sub-pages
- Auth redirect to home page when users authenticate from sub-pages
- Map zoom controls hidden on mobile to prevent card overlap
- Hosted on GitHub Pages with custom domain
- Firebase Auth (Google sign-in) with user profiles
- PWA support (manifest.json + service worker)
- Umami analytics

## Data Sources
- Events, places, and articles manually curated in Google Sheets
- Published as CSV, fetched client-side on load
- Add a row = add content (no deploy needed)
- Event images stored in `/images` folder in the repo

## Features

### Views
- **List view** — events grouped by day within selected weekend
- **Map view** — Leaflet map with category-icon pins, full event description in popups, event sidebar

### Filters & Navigation
- Weekend selector (8 upcoming weekends, holiday badges)
- Category filters: outdoor, indoor, music, theater, markets, workshops, sport, free, Museumkaart
- Liked events filter (❤️ אהבתי)
- Unavailable filters automatically grayed out
- Toggle filters off by clicking again
- Auto-advance to next weekend on scroll past events
- Collapsible filter row on mobile with toggle button and active count/label badge
- Filters auto-close when tapping outside

### Event Cards
- Image from Google Sheet or gradient fallback
- Tags: area, type, free, Museumkaart, age range
- Weather (temperature range from Open-Meteo)
- Like button with community counter ("X אהבו")
- Action buttons: like, WhatsApp share, more details, navigation
- Mobile-optimized touch targets

### Articles
- Card grid with image, category badge, title, summary, date
- Category filters auto-generated from article data
- Full article detail view with hero image, formatted content, share buttons
- Content supports markdown: `## headings`, `**bold**`, `*italic*`, `[links](url)`
- Multi-line CSV content parsing for long-form articles
- Articles sorted by date (newest first)
- Articles with `content` column open on-site; articles without link externally
- WhatsApp and copy-link sharing on detail page

### Holidays
- Three tabs: official holidays, school vacations by region, important info
- Dynamic highlighting of next upcoming official holiday with purple "הבא" badge
- Dynamic highlighting of next upcoming school vacation
- Date-based JS logic (no hardcoded highlights)

### Sharing
- WhatsApp share per event with formatted text
- Footer text on all shares: "לפעילויות נוספות בקרו ב'אז מה עושים היום?' https://fun.israelis.nl"

### Community Feedback
- "שתפו את דעתכם" section with two options: add event, feedback
- Modal form with tab switching between event/feedback types
- Contact modal ("💬 צרו קשר") accessible from nav tabs on all pages
- Optional name, email, phone fields
- Submitted via Formspree
- Empty card at end of event list invites submissions

### SEO & Branding
- Open Graph meta tags with `og3.png` image — positioned as quality family activities
- OG description: "פעילויות איכות עם המשפחה בהולנד בסופ״ש"
- Purple button SVG favicon
- Umami analytics tracking

### Navigation
- Sticky nav bar with home logo link on all pages
- Tab pills: אירועים, 📍 מקומות, 📝 מאמרים, 📅 מתי חופש?, 🌤️ תחזית מזג אוויר, 🧡 עלינו, 💬 צרו קשר
- Holidays section branded as "מתי חופש?" (catchy phrasing instead of generic "חגים")

## Architecture

### Tech Stack
- **Frontend**: Vanilla HTML/CSS/JS (no framework, no build step)
- **Maps**: Leaflet.js with CARTO tiles
- **Weather**: Open-Meteo API (free, no key needed)
- **Data**: Google Sheets (published as CSV) → fetched client-side
- **Images**: Stored in `/images` in the repo, referenced by path in the Sheet
- **Forms**: Formspree (contact modal on all pages)
- **Auth**: Firebase (Google sign-in) with Firestore
- **Analytics**: Umami
- **Hosting**: GitHub Pages (`main` for production)
- **Domain**: fun.israelis.nl (CNAME → alon-lgtm2.github.io)

### Google Sheet Schemas

#### Events (gid=0)
| Column | Field | Example |
|--------|-------|---------|
| A | title | פסטיבל האור - Glow Eindhoven |
| B | desc | מיצבי אור ענקיים ברחבי מרכז העיר |
| C | type | outdoor / indoor / music / theater / market / workshop / sport |
| D | area | אמסטרדם |
| E | ages | כל הגילאים / 3-7 / 5+ |
| F | price | חינם / €12.50 |
| G | free | TRUE / FALSE |
| H | date | 2026-03-21 |
| I | endDate | 2026-03-22 (optional) |
| J | time | 18:00-23:00 |
| K | image | /images/glow.png |
| L | link | https://gloweindhoven.nl |
| M | location | מרכז איינדהובן |
| N | lat | 51.4416 |
| O | lng | 5.4697 |
| P | Museumkaart | TRUE / FALSE |

#### Places (gid=993728456)
| Column | Field | Example |
|--------|-------|---------|
| name | Place name | מסעדת שקשוקה |
| desc | Short description | מסעדה ישראלית באמסטרדם |
| cat | Category | restaurant / museum / playground |
| lat | Latitude | 52.3676 |
| lng | Longitude | 4.9041 |

#### Articles (gid=478633181)
| Column | Field | Example |
|--------|-------|---------|
| title | Article title | 10 טיפים לחיסכון בהולנד |
| summary | Short summary | איך לחסוך כסף על קניות, ביטוחים ומיסים |
| image | Image URL or path | /images/imyotzim.jpg |
| date | Publish date | 2026-03-25 |
| link | External link (optional) | https://example.com |
| category | Category tag | טיפים / חינוך / אירועים / אוכל / טיולים / תרבות / קהילה |
| content | Full article text (optional) | Supports markdown: `## headings`, `**bold**`, `*italic*`, `[links](url)` |

Articles are sorted by date (newest first). If `content` is provided, clicking the card opens a full article detail page on the site with hero image, formatted content, and share buttons. If not, it links externally.

### File Structure
```
fun/
├── index.html              # Home page — weekend events
├── places.html             # Recommended places map
├── articles.html           # Articles and tips (מאמרים)
├── holidays.html           # Holidays & vacations (מתי חופש?)
├── weather.html            # Weather forecast page
├── about.html              # About page
├── auth.js                 # Firebase authentication & profile management
├── likes-backend.gs        # Google Apps Script backend for likes
├── CNAME                   # Custom domain config
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── images/                 # Event & article images
│   ├── Button-Purple.svg   # Favicon
│   ├── og3.png             # OG image (current)
│   ├── imyotzim.jpg        # Article image
│   └── ...                 # Event images
├── PRD.md                  # This file
├── README.md               # Project readme
└── DEPLOY-INSTRUCTIONS.md  # Deploy guide
```

## Future Ideas
- Search / text filter
- Push notifications for new events
- City/zip code proximity sorting
- Map marker clustering
- Offline/PWA support
- Lazy load images
- Public event submission with approval workflow
- Multi-language support

## Service Credentials
- **Umami**: `data-website-id="9ac642c3-4ea0-48e5-869b-2e0a39d6a03e"`
- **Formspree**: `https://formspree.io/f/mnjgwgzn`
- **Google Sheet (published CSV base)**: `https://docs.google.com/spreadsheets/d/e/2PACX-1vQCExzP4oP5lNa2JA5SOCRQ49TBxECUYEaAll9BXJ28GE4ojTifUq3jjuL-U9gEdRdz5IUVJnAM0pSX/pub?single=true&output=csv`
  - Events: `&gid=0`
  - Places: `&gid=993728456`
  - Articles: `&gid=478633181`
