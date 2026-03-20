# Deploy Instructions — fun.israelis.nl

## Project
- **Site:** https://fun.israelis.nl
- **Repo:** https://github.com/alon-lgtm2/fun.git
- **Staging branch:** `stage`
- **Production branch:** `main`
- **Hosting:** GitHub Pages (served from `main` branch)

## Deploy to Staging
1. Make changes on the `stage` branch
2. Commit and push: `git push origin stage`
3. Preview at the GitHub Pages staging URL

## Deploy to Production
1. Ensure changes are committed and pushed to `stage`
2. Push stage to main: `git push origin stage:main`
3. Site goes live at https://fun.israelis.nl within a few minutes

## Content Updates (No Deploy Needed)
- Add/edit events in the [Google Sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vQCExzP4oP5lNa2JA5SOCRQ49TBxECUYEaAll9BXJ28GE4ojTifUq3jjuL-U9gEdRdz5IUVJnAM0pSX/pub?gid=0&single=true&output=csv)
- Add event images to `/images` folder and push
- The site fetches data from the Sheet on every page load

## DNS
- `fun.israelis.nl` CNAME → `alon-lgtm2.github.io`
- CNAME file in repo root handles GitHub Pages custom domain
