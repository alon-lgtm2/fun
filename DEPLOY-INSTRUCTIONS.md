# Deploy Instructions — fun.israelis.nl

## Project
- **Site:** https://fun.israelis.nl
- **Repo:** https://github.com/alon-lgtm2/fun.git
- **Default branch:** `stage` (development/testing)
- **Production branch:** `main` (auto-deploys to GitHub Pages)
- **Hosting:** GitHub Pages (served from `main` branch)
- **Tech stack:** Static HTML/CSS/JS — no build step, no framework

## Branching Workflow

```
feature branch  -->  stage (test)  -->  main (production)
```

1. **All development work** happens on feature branches created off `stage`
2. **Merge feature branches into `stage`** first for testing/review
3. **Only merge `stage` into `main`** when changes are verified and ready for production
4. **NEVER merge feature branches directly into `main`**

### Step-by-step

```bash
# 1. Start new work from stage
git checkout stage
git pull origin stage
git checkout -b feature/my-change

# 2. Work, commit, push
git add .
git commit -m "Description of changes"
git push origin feature/my-change

# 3. Merge into stage for testing
git checkout stage
git merge feature/my-change
git push origin stage

# 4. Deploy to production (only when stage is stable)
git checkout main
git pull origin main
git merge stage
git push origin main
```

## Deploy to Production

1. Ensure all changes are merged into `stage` and tested
2. Switch to `main` and merge `stage`:
   ```bash
   git checkout main
   git pull origin main
   git merge stage
   git push origin main
   ```
3. Site goes live at https://fun.israelis.nl within a few minutes

## Content Updates (No Deploy Needed)
- Add/edit events in the [Google Sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vQCExzP4oP5lNa2JA5SOCRQ49TBxECUYEaAll9BXJ28GE4ojTifUq3jjuL-U9gEdRdz5IUVJnAM0pSX/pub?gid=0&single=true&output=csv)
- Add event images to `/images` folder and push
- The site fetches data from the Sheet on every page load

## DNS
- `fun.israelis.nl` CNAME → `alon-lgtm2.github.io`
- CNAME file in repo root handles GitHub Pages custom domain

## Incident Log

### 2026-03-29 — Bad merge reverted UI changes
A direct merge into `main` from a feature branch (commit `e7bef84`) reverted recent UI improvements. The fix was to restore the affected files from the pre-merge state (commit `58b11f7`). This is why the branching workflow above must be followed — always merge through `stage` first to catch issues before they hit production.
