# AFX Island Developments: website

Home renovations and repairs across the GTA. Built by Pila Web Co.

Static site: plain HTML pages, one stylesheet and two small scripts. No build step, no framework, no backend, no animation (only short colour changes on hover). No third-party requests: the fonts are self-hosted.

Live preview: https://marcospila.github.io/afx-island-developments/

## Pages

| File | What it is |
|---|---|
| `index.html` | Home: headline, call and estimate buttons, the 8 services |
| `services.html` | The 8 service categories with examples, each linking to the estimate form |
| `work.html` | Interior and exterior project photos with an All / Interior / Exterior filter |
| `about.html` | About Alberto and AFX, plus the 5-step "How it works" |
| `faq.html` | Questions and answers |
| `quote.html` | Single-screen estimate form. It builds a message; the visitor's own text or email app sends it |
| `privacy.html` | Plain-language privacy page |

The header, footer and `<head>` tags are repeated in every page, so a change to the menu means editing all seven files.

## Updating the live site

Pages deploys the `main` branch automatically. Edit files, then:

```powershell
git add -A
git commit -m "Describe the change"
git push
```

The live site refreshes in about a minute.

## Editing content

- **Services and examples:** `services.html` (full cards) and `index.html` (short tiles).
- **Projects and photos:** `work.html`. Each project is one `<article class="proj" data-cat="interior|exterior">`. Photos are in `img/`.
- **FAQ:** `faq.html`. If you change an answer, also update the matching text in the `FAQPage` JSON-LD in that file's `<head>`.
- **Instagram and Facebook links:** open `js/site.js` and paste the full profile addresses into `SOCIAL` at the top (for example `instagram: 'https://www.instagram.com/yourhandle'`). Every icon on every page, including the mobile menu, starts working. Until then the icons do nothing when clicked.
- **Phone and email:** search for `416 435 9967` and `afxdevelopments@gmail.com`, and for `PHONE` / `EMAIL` in `js/quote.js`.
- **Estimate form wording and trades:** `quote.html`; message format in `js/quote.js`.

## Design

One flat look with no motion. Colours come from the logo (`css/site.css`, `:root`): forest `#1c3019`, olive `#5b623d`, copper `#a7612b`, cream `#f4f0e6`. Headings are condensed Archivo in upper case, body is Source Sans 3, the wordmark uses Cinzel. The faint tape-measure ruler along the bottom of the hero and above the footer is pure CSS (`.ruler`, `.footer-ruler`).

**Light and dark:** the site follows the visitor's system setting until they use the switch in the header; the choice is saved in `localStorage` as `afx-theme`. The header, hero and footer stay forest green in both themes, so their text is always the light cream colour (including the logo name on hover). Contrast was checked against WCAG AA in both themes.

## Preview mode (on now)

While the client reviews the site, it is marked as a preview:

- Every page carries `<meta name="robots" content="noindex, nofollow">`, so Google won't list it.
- Every page shows a "Preview" bar at the top (`PREVIEW-BAR:START` to `PREVIEW-BAR:END` in the HTML).
- `robots.txt` still allows crawling, which is needed for the noindex tag to be seen. `sitemap.xml` is ready but not advertised yet.

## Launch checklist

1. In all seven HTML files: delete the `noindex` meta line and the `PREVIEW-BAR` block.
2. In `robots.txt`: uncomment the `Sitemap:` line.
3. If the site gets its own domain, replace `https://marcospila.github.io/afx-island-developments/` everywhere (canonical and `og:` tags in every page, JSON-LD in `index.html`, `robots.txt`, `sitemap.xml`). Also update the "Website hosting" paragraph in `privacy.html` if the host changes.
4. Get Alberto's sign-off on the services examples, process steps, FAQ, About and privacy wording.
5. Replace the three low-resolution project photos (163 px) with full-size ones.
6. Test the "Send by text" and "Send by email" buttons on an iPhone and an Android phone.

## Other files

| Path | What it is |
|---|---|
| `css/site.css` | All styles |
| `js/site.js`, `js/quote.js` | Theme switch, social links, mobile menu, copy buttons and work filter / estimate form |
| `fonts/` | Self-hosted Archivo, Cinzel and Source Sans 3 (latin subsets, SIL OFL licence) |
| `img/` | Logo files, project photos, favicons, and the 1200×630 share image `og-image.png` |

## Rules

Only real information goes on the site: no invented prices, reviews, team members, years in business or warranties.
