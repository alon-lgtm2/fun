# PRD — fun.israelis.nl

## Product Overview
A Hebrew-language web app for Israeli families living in the Netherlands to discover weekend events and activities. Curated, time-bound, local events — not general attractions.

## Target Audience
- Israeli parents with kids, living in the Netherlands

## Current State (Live)
- Single HTML file (`index.html`) — no build step
- Data fetched from a published Google Sheet on each page load
- Two views: List (calendar-grouped) and Map (Leaflet)
- Weekend selector (upcoming 8 weekends) with auto-advance on scroll
- Category filters with automatic disable for empty categories
- Like button with community counter (localStorage-based)
- Weather display per event (Open-Meteo API)
- WhatsApp sharing with site footer branding
- Feedback form with tabs (add event / feedback) via Formspree
- Empty "add event" card at end of event list
- Hebrew RTL layout, mobile-friendly with fat-finger CTAs
- Hosted on GitHub Pages with custom domain
- Umami analytics

## Data Source
- Events manually curated in a Google Sheet
- Published as CSV, fetched client-side on load
- Add a row = add an event (no deploy needed)
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

### Event Cards
- Image from Google Sheet or gradient fallback
- Tags: area, type, free, Museumkaart, age range
- Weather (temperature range from Open-Meteo)
- Like button with community counter ("X אהבו")
- Action buttons: like, WhatsApp share, more details, navigation
- Mobile-optimized touch targets

### Sharing
- WhatsApp share per event with formatted text
- Footer text on all shares: "לפעילויות נוספות בקרו ב'אז מה עושים היום?' https://fun.israelis.nl"

### Community Feedback
- "שתפו את דעתכם" section with two options: add event, feedback
- Modal form with tab switching between event/feedback types
- Optional name, email, phone fields
- Submitted via Formspree
- Empty card at end of event list invites submissions

### SEO & Branding
- Open Graph meta tags with cover image
- Purple button SVG favicon
- Umami analytics tracking

## Architecture

### Tech Stack
- **Frontend**: Vanilla HTML/CSS/JS (no framework, no build step)
- **Maps**: Leaflet.js with CARTO tiles
- **Weather**: Open-Meteo API (free, no key needed)
- **Data**: Google Sheets (published as CSV) → fetched client-side
- **Images**: Stored in `/images` in the repo, referenced by path in the Sheet
- **Forms**: Formspree
- **Analytics**: Umami
- **Hosting**: GitHub Pages (`stage` for staging, `main` for production)
- **Domain**: fun.israelis.nl (CNAME → alon-lgtm2.github.io)

### Google Sheet Schema
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

### File Structure
```
fun/
├── index.html              # Main app (single file)
├── CNAME                   # Custom domain config
├── images/                 # Event images
│   ├── Button-Purple.svg   # Favicon
│   └── og-cover.png        # OG image
├── PRD.md                  # This file
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
- **Umami**: `<script defer src="https://cloud.umami.is/script.js" data-website-id="fe4e09f5-6b61-4820-8704-716ef86776b6"></script>`
- **Formspree**: `https://formspree.io/f/mnjgwgzn`
- **Google Sheet CSV**: `https://docs.google.com/spreadsheets/d/e/2PACX-1vQCExzP4oP5lNa2JA5SOCRQ49TBxECUYEaAll9BXJ28GE4ojTifUq3jjuL-U9gEdRdz5IUVJnAM0pSX/pub?gid=0&single=true&output=csv`
