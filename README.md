# AFX Island Developments: website

One-page site for AFX Island Developments (home renovations and repairs, GTA and surrounding areas). Built by Pila Web Co.

Static site: `index.html` (HTML, CSS and JS inline) plus `img/`. No build step, no framework, no backend.

## Updating the live site

Pages deploys the `main` branch automatically. Edit files, then:

```powershell
git add -A
git commit -m "Describe the change"
git push
```

The live site refreshes in about a minute.

## Editing content

Content lives in data arrays at the top of the script in `index.html`: `SERVICES`, `STEPS`, `PROJECTS`, `CATS`, `FAQ`, `TIMES`, plus the `PHONE` and `EMAIL` constants.

## Rules

Only real information goes on the site: no invented prices, reviews, team members, years in business or warranties.
