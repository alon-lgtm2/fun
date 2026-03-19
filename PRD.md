# PRD — fun.israelis.nl

## Product Overview
A Hebrew-language web app for Israeli families living in the Netherlands to discover weekend events and activities for kids. Not general attractions — specific, time-bound, local events.

## Target Audience
- Israeli parents with kids, living in the Netherlands

## Current State (v3 prototype)
- Single HTML file with hardcoded event data (12 sample events)
- 3 views: List, Calendar, Map (Leaflet)
- Weekend selector (upcoming 8 weekends)
- Category filters: outdoor, indoor, music, theater, markets, workshops, sport, free
- WhatsApp sharing per event
- Hebrew RTL layout, mobile-friendly
- Hosted on GitHub Pages (stage branch)

## Data Source
- Events are manually curated (AI-assisted research + manual editing)
- Currently published as Facebook posts
- Need a simple submission workflow to get the same data into the website
- No automated scraping for now
- Only admin (you) submits events — no public submissions needed for now
- **Backend: Google Sheet** — published as a data source, site fetches on load
  - Add a row = add an event
  - No deploy needed for content changes

## V1 Features

### Core (from prototype)
- List view with event cards
- Calendar view (grouped by day)
- Map view (Leaflet, interactive pins)
- Weekend selector (upcoming weekends)
- Category filters (outdoor, indoor, music, theater, markets, workshops, sport, free)
- Mobile-first, responsive design
- Hebrew RTL

### New for v1
- **Enhanced map experience**:
  - Category icons on map pins (outdoor, theater, music, etc.) — already in prototype
  - Clicking a pin shows event details with action buttons
  - Map as primary discovery tool for spatial orientation
  - _(Future: city/zip code input for distance sorting)_
- **Facebook sharing**: Add share-to-Facebook button alongside WhatsApp
- **Navigation link**: Each event card has a "navigate" button (Google Maps / Waze link)
- **Original event link**: Each card links to the source website for more info
- **Formspree contact form**: Replace the alert with a real form for event suggestions
- **Google Sheet data source**: Fetch events from a published Google Sheet instead of hardcoded JS
- **Umami analytics**: Track page views and interactions
- **Image hosting**: Event images in `/images` folder in the repo

### Not in v1 (maybe later)
- Search / text filter
- Save / favorite events
- Push notifications
- Multi-language support
- Public event submissions with approval flow
- City/zip code based distance sorting

## Architecture

### Tech Stack
- **Frontend**: Vanilla HTML/CSS/JS (no framework, no build step)
- **Maps**: Leaflet.js with CARTO tiles
- **Data**: Google Sheets (published as CSV/JSON) → fetched client-side
- **Images**: Stored in `/images` in the repo, referenced by filename in the Sheet
- **Forms**: Formspree (event suggestions from community)
- **Analytics**: Umami
- **Hosting**: GitHub Pages (stage branch for staging, main for production)
- **Domain**: fun.israelis.nl (custom subdomain → GitHub Pages)

### Google Sheet Schema
| Column | Field | Example |
|--------|-------|---------|
| A | title | פסטיבל האור — Glow Eindhoven |
| B | desc | מיצבי אור ענקיים ברחבי מרכז העיר... |
| C | type | outdoor / indoor / music / theater / market / workshop / sport |
| D | area | אמסטרדם |
| E | ages | כל הגילאים / 3-7 / 5+ |
| F | price | חינם / €12.50 |
| G | free | TRUE / FALSE |
| H | date | 2026-03-21 |
| I | endDate | 2026-03-22 (optional) |
| J | time | 18:00-23:00 |
| K | image | glow-eindhoven.jpg |
| L | link | https://gloweindhoven.nl |
| M | location | מרכז איינדהובן |
| N | lat | 51.4416 |
| O | lng | 5.4697 |

### File Structure
```
fun/
├── index.html          # Main app (renamed from fun-israelis-nl-v3.html)
├── images/             # Event images
├── PRD.md              # This file
├── DEPLOY-INSTRUCTIONS.md
└── src/                # Original prototype
    └── fun-israelis-nl-v3.html
```

## Implementation Phases

### Phase 1 — Go Live (this week)
1. Set up Google Sheet with the schema above
2. Update the HTML to fetch data from the published Sheet
3. Replace hardcoded events with Sheet data
4. Add navigation links (Google Maps) to event cards
5. Add Facebook share button
6. Wire up Formspree for the "suggest event" form
7. Add Umami tracking script
8. Move file to `index.html` at root
9. Set up fun.israelis.nl DNS → GitHub Pages
10. Deploy to production

### Phase 2 — Polish
- Improve map UX (clustering for nearby events, better popups)
- Add city/zip code proximity sorting
- SEO meta tags and Open Graph for social sharing previews
- Offline/PWA support
- Performance optimization (lazy load images)

### Phase 3 — Growth
- Search / text filter
- Save / favorite events (localStorage)
- Push notifications for new events
- Multi-editor support for the Google Sheet
- Public event submission with approval workflow

## Decisions Log
1. Data source: Manual curation with a submission flow (not CMS, not scraping)
2. Submission: Admin-only (single user) — no public submissions for v1
3. Data backend: Google Sheet (published as CSV/JSON, fetched by the frontend)
4. Domain: **fun.israelis.nl** (custom subdomain, pointed to GitHub Pages)
5. Language: Hebrew only
6. Community suggestions: **Formspree** form — users can submit event recommendations via an embedded form
7. Images: Uploaded to `/images` folder in the GitHub repo, referenced by filename in the Google Sheet
8. Analytics: **Umami** (privacy-friendly)
9. Tech stack: **Vanilla HTML/CSS/JS** — no framework, no build step, Leaflet for maps
10. Proximity: Map-based orientation for v1. City/zip distance sorting deferred to v2
11. Timeline: **ASAP — launch this week**

## Service Credentials
- **Umami**: `<script defer src="https://cloud.umami.is/script.js" data-website-id="fe4e09f5-6b61-4820-8704-716ef86776b6"></script>`
- **Formspree**: `https://formspree.io/f/mnjgwgzn`
