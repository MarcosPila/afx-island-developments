# AFX Island Developments: website

One-page site for AFX Island Developments (home renovations and repairs, GTA and surrounding areas). Built by Pila Web Co.

Static site: `index.html` (HTML, CSS and JS inline), `privacy.html`, `fonts/` and `img/`. No build step, no framework, no backend. No third-party requests: the fonts are self-hosted.

Live preview: https://marcospila.github.io/afx-island-developments/

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

## Preview mode (on now)

While the client reviews the site, it is marked as a preview:

- Both pages carry `<meta name="robots" content="noindex, nofollow">`, so Google won't list them.
- Both pages show a "Preview" bar at the top (`PREVIEW-BAR:START` to `PREVIEW-BAR:END` in the HTML).
- `robots.txt` still allows crawling, which is needed for the noindex tag to be seen. `sitemap.xml` is ready but not advertised yet.

## Launch checklist

1. In `index.html` and `privacy.html`: delete the `noindex` meta line and the `PREVIEW-BAR` block.
2. In `robots.txt`: uncomment the `Sitemap:` line.
3. If the site gets its own domain, replace `https://marcospila.github.io/afx-island-developments/` everywhere (canonical, `og:url`, `og:image`, JSON-LD in `index.html`; `canonical` in `privacy.html`; `robots.txt`; `sitemap.xml`). Also update the "Website hosting" paragraph in `privacy.html` if the host changes.
4. Get Alberto's sign-off on the process steps, FAQ, About and privacy wording.
5. Test the `sms:` and `mailto:` buttons on an iPhone and an Android phone.

## Files

| Path | What it is |
|---|---|
| `fonts/` | Self-hosted Archivo, Cinzel, JetBrains Mono and Source Sans 3 (latin subsets, SIL OFL licence) |
| `img/og-image.png` | 1200×630 share preview shown when the link is posted in chat or social apps |
| `img/favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | Tab, home-screen and large icons (dark green square with the AFX mark) |
| `privacy.html` | Plain-language privacy page. It describes what the site actually does (no cookies, no analytics, no data sent anywhere), so update it if that changes |

## Rules

Only real information goes on the site: no invented prices, reviews, team members, years in business or warranties.
